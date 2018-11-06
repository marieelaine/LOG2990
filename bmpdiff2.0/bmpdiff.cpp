#include <iostream>
#include <fstream>
#include <string.h>
#include <stdio.h>

#include <fstream>
#include <iostream>
#include <string>
#include <array>
#include <vector>
#include <iterator>

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

std::vector<char> readBMP(const std::string &file){
    static constexpr size_t HEADER_SIZE = 54;

    std::ifstream bmp(file, std::ios::binary);

    std::array<char, HEADER_SIZE> header;
    bmp.read(header.data(), header.size());

    auto fileSize = *reinterpret_cast<uint32_t *>(&header[2]);
    auto dataOffset = *reinterpret_cast<uint32_t *>(&header[10]);
    auto width = *reinterpret_cast<uint32_t *>(&header[18]);
    auto height = *reinterpret_cast<uint32_t *>(&header[22]);
    auto depth = *reinterpret_cast<uint16_t *>(&header[28]);

    std::cout << "fileSize: " << fileSize << std::endl;
    std::cout << "dataOffset: " << dataOffset << std::endl;
    std::cout << "width: " << width << std::endl;
    std::cout << "height: " << height << std::endl;
    std::cout << "depth: " << depth << "-bit" << std::endl;

    std::vector<char> img(dataOffset - HEADER_SIZE);
    bmp.read(img.data(), img.size());

    auto dataSize = ((width * 3 + 3) & (~3)) * height;
    img.resize(dataSize);
    bmp.read(img.data(), img.size());

    char temp = 0;

    // for(auto i = dataSize - 4; i >= 0; i -= 3){
    //     temp = img[i];
    //     img[i] = img[i+2];
    //     img[i+2] = temp;

    //     //std::cout << "R: " << int(img[i] & 0xff) << " G: " << int(img[i+1] & 0xff) << " B: " << int(img[i+2] & 0xff) << std::endl;
    // }

    return img;
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

    std::vector<char> image1 = readBMP(etat.image_o.c_str());
    std::vector<char> image2 = readBMP(etat.image_m.c_str());
    int* B = new int[ARRAY_SIZE/3];
    int* G = new int[ARRAY_SIZE/3];
    int* R = new int[ARRAY_SIZE/3];
    int r,g,b;
    // etat.fichierTxt += etat.image_s;
    // etat.fichierTxt += ".txt";
    //*image3 = *image1 xor *image2;
    for(auto image1.iterator; i < sizeof(image1) ; i++){
        
        bool f = image1[i] == image2[i];
        // cout << "Image1[" << i << "] :" << &image1[i] <<endl;
        if(!f)
            cout << i << ":" << f << endl;
    }
    
    // for(int i = 0 ; i < BMP_REQ_WIDTH ; i++){
    //     for(int j = 0 ; j < BMP_REQ_HEIGHT ; j++){
    //         b = 4 * (i * BMP_REQ_WIDTH + j);
    //         g = 4 * (i * BMP_REQ_WIDTH + j) + 1;
    //         r = 4 * (i * BMP_REQ_WIDTH + j) + 2;
    //         image1[b] == image2[b] ? B[(i+1)*j] = 0 : B[(i+1)*j] = 1;
    //         image1[g] == image2[g] ? G[(i+1)*j] = 0 : G[(i+1)*j] = 1;
    //         image1[r] == image2[r] ? R[(i+1)*j] = 0 : R[(i+1)*j] = 1;
    //     }
    // }
    // for(int i = 0 ; i < ARRAY_SIZE/3 ; i++){
    //     if(B[i] == 1 || G[i] == 1 || R[i] == 1)
    //         cout << "{" << R[i] << "," << G[i] << "," << B[i] << "}";
    // }
    //comparerImages(image1, image2, image3);

    return 0;
}