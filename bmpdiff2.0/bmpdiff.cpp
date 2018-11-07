#include <iostream>
#include <fstream>
#include <stdio.h>
#include <string>
#include <fstream>      // std::ifstream

//
//#include "./opencv2/core/core.hpp"
//#include "./opencv2/highgui/highgui.hpp"

using namespace std;

// diverses variables d'état
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

bool estBonneTaille(unsigned char* header) {
    return *(int*)&header[18] == BMP_REQ_WIDTH && *(int*)&header[22] == BMP_REQ_HEIGHT;
}

void comparerImages(unsigned char* image1, unsigned char* image2, unsigned char* image3) {
    FILE* fichierSortie = fopen(etat.fichierTxt, "w");
    
    for (int i = 0 ; i < ARRAY_SIZE ; i++){
        image3[i] = image1[i] xor image2[i];
    }


}

void creerEtat(const char* argv[], const int argc, Etat& etat){   
    ifstream infile1(argv[argc-3]);
    ifstream infile2(argv[argc-2]);
    string arg1;
    switch(argc){
        case 5:
            arg1 = argv[1];
            if(arg1 != "-partiel") {
                cerr << "Premier argument invalide, [-partiel] demande";
                exit(1);
            }
        case 4:
            if(!infile1.good() || !infile1.good()) cerr << "Erreur: les images entrees n'existent pas";
            break;
        default:
            break;
    }
    
    if(argc == 5) etat.partiel = true;
    etat.image_o = argv[argc-3];
    etat.image_m = argv[argc-2];
    etat.image_s = argv[argc-1];
}

void lireImage(uint8_t* r, uint8_t* g, uint8_t* b, ifstream stream) {
    char header[54];
    stream.read(header, 54);
    char tmp[3];
    for (int i = 0; i < 480*640; i++){
        stream.read(tmp, 3);
        b[i] = tmp[0];
        g[i] = tmp[1];
        r[i] = tmp[2];
    }
}


int main(int argc, const char* argv[]) {
    if ( argc < 4 || argc > 5 )
        {
            cerr << "Erreur: Nombre invalide de parametres!\n";
            cerr << "Usage: ./bmpdiff [- partiel] image_originale.bmp image_modifiee.bmp image_sortie.bmp\n";
            return 1;
	    }
    else {
        creerEtat(argv, argc, etat);
    }

    ifstream stream1;
    ifstream stream2;

    stream1.open(etat.image_o);
    stream2.open(etat.image_m);

    char r1[480*640];
    char g1[480*640];
    char b1[480*640];
    char r2[480*640];
    char g2[480*640];
    char b2[480*640];


}