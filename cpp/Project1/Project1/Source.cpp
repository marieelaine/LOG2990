#include <iostream>
#include <fstream>
#include <stdio.h>
#include <string>
#include <fstream>
#include <stdlib.h>     /* abs */


using namespace std;

struct Etat
{
	bool partiel;
	string image_o;
	string image_m;
	string image_s;
	char* fichierTxt;
} etat = {};

const int BMP_HEADER_LENGTH = 54;
const int BMP_HEADER_IMAGE_WIDTH = 18;
const int BMP_HEADER_IMAGE_HEIGHT = 22;
const int BMP_REQ_WIDTH = 640;
const int BMP_REQ_HEIGHT = 480;
const int ARRAY_SIZE = 3 * BMP_REQ_WIDTH * BMP_REQ_HEIGHT;
/*
bool estBonneTaille(unsigned char* header) {
	return *(int*)&header[18] == BMP_REQ_WIDTH && *(int*)&header[22] == BMP_REQ_HEIGHT;
}

void comparerImages(unsigned char* image1, unsigned char* image2, unsigned char* image3) {
	FILE* fichierSortie = fopen(etat.fichierTxt, "w");

	for (int i = 0; i < ARRAY_SIZE; i++) {
		image3[i] = image1[i] xor image2[i];
	}


}
*/
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

	char info[54];
	bmpIn.read(info, 54);
	int offset = *(int*)&info[10];
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

void genImageDiff(uint8_t* r1, uint8_t* r2, uint8_t* g1, uint8_t* g2, uint8_t* b1, uint8_t* b2, uint8_t* diff) {
	for (int i = 0; i < 480 * 640; i++)
		diff[i] = 0;


	for (int y = 0; y < 480; y++) {
		for (int x = 0; x < 640; x++)
			if (r1[x + 640 * y] == r2[x + 640 * y] && g1[x + 640 * y] == g2[x + 640 * y] && b1[x + 640 * y] == b2[x + 640 * y])
				if (etat.partiel)
					for (int j = -3; j < 4; j++)
						for (int k = -3; k < 4; k++)
							if (!((abs(k) > 1 && abs(j) == 3) || (abs(j) > 1 && abs(k) == 3)))
								if (x + j < 480 && x + j >= 0 && y + k < 640 && y + k >= 0)
									diff[x + j + 640 * (y + k)] = 1;
				else
					diff[x+640*y] = 1;

	}
}


int main(int argc, const char* argv[]) {


	//if (argc < 4 || argc > 5)
	//{
	//	cerr << "Erreur: Nombre invalide de parametres!\n";
	//	cerr << "Usage: ./bmpdiff [- partiel] image_originale.bmp image_modifiee.bmp image_sortie.bmp\n";
	//}
	//else {
	//	creerEtat(argv, argc, etat);
	//}

	etat.image_o = "2.bmp";
	etat.image_m = "1.bmp";
	etat.image_s = "3.bmp";

	uint8_t* r1 = new uint8_t[480 * 640];
	uint8_t* g1 = new uint8_t[480 * 640];
	uint8_t* b1 = new uint8_t[480 * 640];
	uint8_t* r2 = new uint8_t[480 * 640];
	uint8_t* g2 = new uint8_t[480 * 640];
	uint8_t* b2 = new uint8_t[480 * 640];

	lireImage(r1, g1, b1, etat.image_o);
	lireImage(r2, g2, b2, etat.image_m);

	uint8_t* diff = new uint8_t[480 * 640];

	genImageDiff(r1, r2, g1, g2, b1, b2, diff);

	cout << r1[1];

}