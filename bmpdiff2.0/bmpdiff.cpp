#include <iostream>
#include <fstream>
#include <stdio.h>
#include <string>

#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>

using namespace std;
using namespace cv;

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

unsigned char* lireBmp (const char* nomFichier) {

    FILE* image = fopen(nomFichier, "r");
    FILE* imageSortie = fopen("3.bmp", "w");

    unsigned char header[BMP_HEADER_LENGTH];
    fread(header, sizeof(unsigned char), BMP_HEADER_LENGTH, image);

    if (!estBonneTaille(header)) {
        cerr << "Image de mauvaise taille, 640x480 demande\n";
        exit(1);
    }

    unsigned char* data = new unsigned char[ARRAY_SIZE];
    fread(data, sizeof(unsigned char), ARRAY_SIZE, image);

    fclose(image);
    
    return data;
}

void creerEtat(const char* argv[], const int argc, Etat& etat){   
    std::ifstream infile1(argv[argc-3]);
    std::ifstream infile2(argv[argc-2]); 
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

    Mat image1 = imread(etat.image_o, CV_LOAD_IMAGE_COLOR);
    Mat image2 = imread(etat.image_m, CV_LOAD_IMAGE_COLOR);
    
    Mat image3 = image1 xor image2;

    namedWindow( "Display window", WINDOW_AUTOSIZE );// Create a window for display.
    imshow( "Display window", image3 );                   // Show our image inside it.                                        

    return 0;
}