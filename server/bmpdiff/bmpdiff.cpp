#include <iostream>
#include <fstream>
#include <stdio.h>
#include <string>
#include <fstream>
#include <stdlib.h>
#include <vector>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>
#include <unistd.h>



using namespace std;

struct Etat
{
	bool partiel;
	string image_o;
	string image_m;
	string image_s;
	char* fichierTxt;
	bool* visited;
	ofstream outFile;
	char header[54];
	uint8_t* imageDiff;
} etat = {};

const int BMP_HEADER_LENGTH = 54;
const int BMP_HEADER_IMAGE_WIDTH = 18;
const int BMP_HEADER_IMAGE_HEIGHT = 22;
const int BMP_REQ_WIDTH = 640;
const int BMP_REQ_HEIGHT = 480;
const int ARRAY_SIZE = 3 * BMP_REQ_WIDTH * BMP_REQ_HEIGHT;

bool estBonneTaille(char* header) {
	return header[18] == BMP_REQ_WIDTH && header[22] == BMP_REQ_HEIGHT;
}

void creerEtat(const char* argv[], const int argc, Etat& etat) {
	ifstream infile1(argv[argc - 3]);
	ifstream infile2(argv[argc - 2]);
	string arg1;
	switch (argc) {
	case 5:
		arg1 = argv[1];
		if (arg1 != "-partiel") {
			cerr << "Premier argument invalide, [-partiel] demande";
			exit(1);
		}
	case 4:
		if (!infile1.good() || !infile1.good()) cerr << "Erreur: les images entrees n'existent pas";
		break;
	default:
		break;
	}

	if (argc == 5) etat.partiel = true;
	etat.image_o = argv[argc - 3];
	etat.image_m = argv[argc - 2];
	etat.image_s = argv[argc - 1];
}

void lireImage(uint8_t* r, uint8_t* g, uint8_t* b, string file) {
	ifstream bmpIn(file, ios::in | ios::binary);

	etat.header[54];
	bmpIn.read(etat.header, 54);
	if (estBonneTaille(etat.header)) cerr << "Erreur, image de taille 640x480 demandees." << endl;
	int offset = *(int*)&etat.header[10];
	bmpIn.seekg(offset);

	char tmp[3];
	for (int i = 0; i < 480 * 640; i++) {
		bmpIn.read(tmp, 3);
		b[i] = (uint8_t)tmp[0];
		g[i] = (uint8_t)tmp[1];
		r[i] = (uint8_t)tmp[2];
	}

	bmpIn.close();
}

void ecrireImageDiff(uint8_t* r1, uint8_t* r2, uint8_t* g1, uint8_t* g2, uint8_t* b1, uint8_t* b2) {
    ofstream image;
    image.open(etat.image_s, ofstream::out);
    for (int i = 0; i < 54; i++){
        image << etat.header[i];
    }
    char noir = 0x00;
    char blanc = 0xff;
    for (int i = 0; i < 480 * 640; i++){
        if (etat.imageDiff[i] == 1){
            image.write(&noir, 1);
            image.write(&noir, 1);
            image.write(&noir, 1);
        } else{
            image.write(&blanc, 1);
            image.write(&blanc, 1);
            image.write(&blanc, 1);
        }
    }
    image.close();
}

void genImageDiff(uint8_t* r1, uint8_t* r2, uint8_t* g1, uint8_t* g2, uint8_t* b1, uint8_t* b2) {
	for (int i = 0; i < 480 * 640; i++) {
		etat.imageDiff[i] = 0;
		etat.visited[i] = false;
	}

	int diffCounter = 0;

	for (int y = 0; y < 480; y++) {
		for (int x = 0; x < 640; x++)
			if ((r1[x + 640 * y] != r2[x + 640 * y] || g1[x + 640 * y] != g2[x + 640 * y] || b1[x + 640 * y] != b2[x + 640 * y]) && etat.visited[x + 640 * y] == false) {
				diffCounter += 1;
				etat.visited[x + 640 * y] = true;
                etat.imageDiff[x + 640 * y] = 1;
                etat.outFile << to_string(x) << "," << to_string(480 - y) << endl;
				vector<int> stackX;
				vector<int> stackY;
				stackX.push_back(x);
				stackY.push_back(y);
				etat.outFile << "DIFFERENCE" << endl;
				while (!stackX.empty()) {
					int currX = stackX.back();
					int currY = stackY.back();
					stackX.pop_back();
					stackY.pop_back();
					if (!etat.partiel) {
						//enlarge pixel

						for (int j = -3; j < 4; j++) {
							for (int k = -3; k < 4; k++) {
								if (!((abs(k) > 1 && abs(j) == 3) || (abs(j) > 1 && abs(k) == 3)))
									if (currX + j < 640 && currX + j >= 0 && currY + k < 480 && currY + k >= 0 && etat.visited[currX + j + 640 * (currY + k)] == false) {
										if ((r1[currX + j + 640 * (currY + k)] != r2[currX + j + 640 * (currY + k)] || g1[currX + j + 640 * (currY + k)] != g2[currX + j + 640 * (currY + k)] || b1[currX + j + 640 * (currY + k)] != b2[currX + j + 640 * (currY + k)]) && etat.visited[currX + j + 640 * (currY + k)] == false) {
                                            stackX.push_back(currX + j);
                                            stackY.push_back(currY + k);
                                        }
                                        etat.imageDiff[currX + j + 640 * (currY + k)] = 1;
                                        etat.outFile << to_string(currX + j) << "," << to_string(480 - (currY + k)) << endl;
                                        etat.visited[currX + j + 640 * (currY + k)] = true;
									}
							}
						}
					}
					else {
						//add adjacent au stacks
						 etat.imageDiff[currX + 640 * currY] = 1;
						if ((r1[currX + 1 + 640 * currY] != r2[currX + 1 + 640 * currY] || g1[currX + 1 + 640 * currY] != g2[currX + 1 + 640 * currY] || b1[currX + 1 + 640 * currY] != b2[currX + 1 + 640 * currY]) && etat.visited[currX + 1 + 640 * currY] == false) {
							stackX.push_back(currX + 1);
							stackY.push_back(currY);
							etat.visited[currX + 1 + 640 * currY] = true;
						}
						if ((r1[currX - 1 + 640 * currY] != r2[currX - 1 + 640 * currY] || g1[currX - 1 + 640 * currY] != g2[currX - 1 + 640 * currY] || b1[currX - 1 + 640 * currY] != b2[currX - 1 + 640 * currY]) && etat.visited[currX - 1 + 640 * currY] == false) {
							stackX.push_back(currX - 1);
							stackY.push_back(currY);
							etat.visited[currX - 1 + 640 * currY] = true;
						}
						if ((r1[currX + 640 * (currY+1)] != r2[currX + 640 * (currY + 1)] || g1[currX + 640 * (currY + 1)] != g2[currX + 640 * (currY + 1)] || b1[currX + 640 * (currY + 1)] != b2[currX + 640 * (currY + 1)]) && etat.visited[currX + 640 * (currY + 1)] == false) {
							stackX.push_back(currX);
							stackY.push_back((currY + 1));
							etat.visited[currX + 640 * (currY + 1)] = true;
						}
						if ((r1[currX + 640 * (currY - 1)] != r2[currX + 640 * (currY - 1)] || g1[currX + 640 * (currY - 1)] != g2[currX + 640 * (currY - 1)] || b1[currX + 640 * (currY - 1)] != b2[currX + 640 * (currY - 1)]) && etat.visited[currX + 640 * (currY - 1)] == false) {
							stackX.push_back(currX);
							stackY.push_back((currY - 1));
							etat.visited[currX + 640 * (currY - 1)] = true;

						}
							
					}
				}
			}
	}
	ecrireImageDiff(r1, r2, g1, g2, b1, b2);

	if(diffCounter != 7){
		cout << etat.image_o << endl;
		cerr << "Erreur: Il faut exactement 7 differences entre les deux images" << endl;
		exit(1);
	}
}



int main(int argc, const char* argv[]) {


	if (argc < 4 || argc > 5)
	{
		cerr << "Erreur: Nombre invalide de parametres!\n";
		cerr << "Usage: ./bmpdiff [- partiel] image_originale.bmp image_modifiee.bmp image_sortie.bmp\n";
		exit(1);
	}
	else {
		creerEtat(argv, argc, etat);
	}

	etat.outFile.open(etat.image_s+".txt", ofstream::out);

	uint8_t* r1 = new uint8_t[480 * 640];
	uint8_t* g1 = new uint8_t[480 * 640];
	uint8_t* b1 = new uint8_t[480 * 640];
	uint8_t* r2 = new uint8_t[480 * 640];
	uint8_t* g2 = new uint8_t[480 * 640];
	uint8_t* b2 = new uint8_t[480 * 640];

	lireImage(r1, g1, b1, etat.image_o);
	lireImage(r2, g2, b2, etat.image_m);

	etat.imageDiff = new uint8_t[480 * 640];
	etat.visited = new bool[480 * 640]; 

    genImageDiff(r1, r2, g1, g2, b1, b2);
	etat.outFile << "END" << endl;
	cout << "Image de differences generee avec succes!" << endl;
	etat.outFile.close();
	
	return 0;
}