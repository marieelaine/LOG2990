#include <iostream>
#include <math.h>
#include "inf2705-matrice.h"
#include "inf2705-nuanceur.h"
#include "inf2705-fenetre.h"
#include "inf2705-forme.h"
#include "FreeImage.h"
#include <thread>
#include <chrono>
#include <vector>
#include <string>
#include <bits/stdc++.h> 
  
using namespace std; 

// variables pour l'utilisation des nuanceurs
GLuint progBase;  // le programme de nuanceurs de base
GLint locVertex = -1;
GLint locColor = -1;
GLint locmatrModel = -1;
GLint locmatrVisu = -1;
GLint locmatrProj = -1;

// matrices du pipeline graphique
MatricePipeline matrModel, matrVisu, matrProj;

// les formes
FormeCube *cube = NULL;
FormeSphere *sphere = NULL;
FormeCylindre *cylindre = NULL;
FormeCylindre *cone = NULL;
FormePyramideBaseCarree *pyramide = NULL;

// diverses variables d'état
struct Etat
{
   double dimBoite;
   string theme;
   int nombreFormes;
   string modifications;
   string filename;
   string capture1;
   string capture2;
   string capture3;
   string capture4;
} etat = {};

// diverses variables de creation
struct Geometrie
{
   GLfloat tailleReference;           
   GLfloat angleReference;       
} geo = { 3.0, 50 };

GLfloat callRandomSize(GLfloat taille)
{
   int min = 0.5*taille;
   int max = 1.5*taille;
   return rand()%((max - min) + 1) + min; 
}

double callRandomTranslateY()
{
   int min = -etat.dimBoite;
   int max = etat.dimBoite;
   return rand()%((max - min) + 1) + min;
}

double callRandomTranslateX()
{
   int min = -etat.dimBoite;
   int max = etat.dimBoite;
   return rand()%((max - min) + 1) + min;
}

double callRandomTranslateZ()
{
   int min = -etat.dimBoite/2;
   int max = 1.5*etat.dimBoite;
   return rand()%((max - min) + 1) + min;
}

double callRandom()
{
   return (double)rand()/(RAND_MAX);
}

double callRandomAngle()
{
   int min = -1;
   int max = 1;
   return rand()%((max - min) + 1) + min;
}

double callRandomNumber(int number)
{
   int min = 0;
   int max = number;
   return rand()%((max - min) + 1) + min;
}

struct StructCone
{
    double rayon; double height;
    double angleX; double angleY; double angleZ;
    double translateX; double translateY; double translateZ;
    double colorR; double colorG; double colorB;
};

struct StructCylindre
{
    double rayon; double height;
    double angleX; double angleY; double angleZ;
    double translateX; double translateY; double translateZ;
    double colorR; double colorG; double colorB;
};

struct StructSphere
{
    double tailleX; double tailleY; double tailleZ;
    double angleX; double angleY; double angleZ;
    double translateX; double translateY; double translateZ;
    double colorR; double colorG; double colorB;
};

struct StructCube
{
    double arrete;
    double angleX; double angleY; double angleZ;
    double translateX; double translateY; double translateZ;
    double colorR; double colorG; double colorB;
};

struct StructPyramide
{
    double arrete;
    double angleX; double angleY; double angleZ;
    double translateX; double translateY; double translateZ;
    double colorR; double colorG; double colorB;
};

vector<StructSphere> vecSphere;
vector<StructCube> vecCube;
vector<StructCylindre> vecCylindre;
vector<StructCone> vecCone;
vector<StructPyramide> vecPyramide;

void makeCones(int nombreFormes){
    for(int i = 0; i < nombreFormes; i++){
        StructCone cone = { callRandomSize(geo.tailleReference), callRandomSize(geo.tailleReference),
                                callRandomAngle(), callRandomAngle(), callRandomAngle(),
                                callRandomTranslateX(), callRandomTranslateY(), callRandomTranslateZ(),
                                callRandom(), callRandom(), callRandom()
                                };
        vecCone.push_back(cone);
    }
}

void makeCylindres(int nombreFormes){
    for(int i = 0; i < nombreFormes; i++){
        StructCylindre cylindre = { callRandomSize(geo.tailleReference), callRandomSize(geo.tailleReference),
                                callRandomAngle(), callRandomAngle(), callRandomAngle(),
                                callRandomTranslateX(), callRandomTranslateY(), callRandomTranslateZ(),
                                callRandom(), callRandom(), callRandom()
                                };
        vecCylindre.push_back(cylindre);
    }
}

void makeSpheres(int nombreFormes){
    for(int i = 0; i < nombreFormes; i++){
        StructSphere sphere = { callRandomSize(geo.tailleReference), callRandomSize(geo.tailleReference), callRandomSize(geo.tailleReference),
                                callRandomAngle(), callRandomAngle(), callRandomAngle(),
                                callRandomTranslateX(), callRandomTranslateY(), callRandomTranslateZ(),
                                callRandom(), callRandom(), callRandom()
                                };
        vecSphere.push_back(sphere);
    }
}

void makeCubes(int nombreFormes){
    for(int i = 0; i < nombreFormes; i++){
        StructCube cube = { callRandomSize(geo.tailleReference),
                                callRandomAngle(), callRandomAngle(), callRandomAngle(),
                                callRandomTranslateX(), callRandomTranslateY(), callRandomTranslateZ(),
                                callRandom(), callRandom(), callRandom()
                                };
        vecCube.push_back(cube);
    }
}

void makePyramides(int nombreFormes){
    for(int i = 0; i < nombreFormes; i++){
        StructPyramide pyramide = { callRandomSize(geo.tailleReference),
                                callRandomAngle(), callRandomAngle(), callRandomAngle(),
                                callRandomTranslateX(), callRandomTranslateY(), callRandomTranslateZ(),
                                callRandom(), callRandom(), callRandom()
                                };
        vecPyramide.push_back(pyramide);
    }
}

// variables pour définir le point de vue
const GLdouble thetaInit = 28.0, phiInit = 75.0, distInit = 65.;
class Camera
{
public:
   void definir()
   {
    if ( modeLookAt )
        {
            matrVisu.LookAt( dist*cos(glm::radians(theta))*sin(glm::radians(phi)),
                            dist*sin(glm::radians(theta))*sin(glm::radians(phi)),
                            dist*cos(glm::radians(phi))+5,
                            1., 0., 5.,
                            0., 0., 1. );
        }
        else
        {   
            const GLdouble theta2Init = 28., phi2Init = 75., dist2Init = -65.;
            matrVisu.LoadIdentity( );
            matrVisu.LookAt( dist2Init*cos(glm::radians(theta2Init))*sin(glm::radians(phi2Init)),
                    dist2Init*sin(glm::radians(theta2Init))*sin(glm::radians(phi2Init)),
                    dist2Init*cos(glm::radians(phi2Init)),
                    1., 0., 5.,
                    0., 0., 1. );
        }
    }
   double theta;         // angle de rotation de la caméra (coord. sphériques)
   double phi;           // angle de rotation de la caméra (coord. sphériques)
   double dist;          // distance (coord. sphériques)
   bool modeLookAt; 
} camera = { thetaInit, phiInit, distInit, true}; 


void chargerNuanceurs()
{
   // charger le nuanceur de base
   {
      // créer le programme
      progBase = glCreateProgram();

      // attacher le nuanceur de sommets
      {
         GLuint nuanceurObj = glCreateShader( GL_VERTEX_SHADER );
         glShaderSource( nuanceurObj, 1, &ProgNuanceur::chainesSommetsMinimal, NULL );
         glCompileShader( nuanceurObj );
         glAttachShader( progBase, nuanceurObj );
         ProgNuanceur::afficherLogCompile( nuanceurObj );
      }
      // attacher le nuanceur de fragments
      {
         GLuint nuanceurObj = glCreateShader( GL_FRAGMENT_SHADER );
         glShaderSource( nuanceurObj, 1, &ProgNuanceur::chainesFragmentsMinimal, NULL );
         glCompileShader( nuanceurObj );
         glAttachShader( progBase, nuanceurObj );
         ProgNuanceur::afficherLogCompile( nuanceurObj );
      }

      // faire l'édition des liens du programme
      glLinkProgram( progBase );
      ProgNuanceur::afficherLogLink( progBase );

      // demander la "Location" des variables
      if ( ( locVertex = glGetAttribLocation( progBase, "Vertex" ) ) == -1 ) cerr << "!!! pas trouvé la \"Location\" de Vertex" << endl;
      if ( ( locColor = glGetAttribLocation( progBase, "Color" ) ) == -1 ) cerr << "!!! pas trouvé la \"Location\" de Color" << endl;
      if ( ( locmatrModel = glGetUniformLocation( progBase, "matrModel" ) ) == -1 ) cerr << "!!! pas trouvé la \"Location\" de matrModel" << endl;
      if ( ( locmatrVisu = glGetUniformLocation( progBase, "matrVisu" ) ) == -1 ) cerr << "!!! pas trouvé la \"Location\" de matrVisu" << endl;
      if ( ( locmatrProj = glGetUniformLocation( progBase, "matrProj" ) ) == -1 ) cerr << "!!! pas trouvé la \"Location\" de matrProj" << endl;
   }
}

void FenetreTP::initialiser()
{
   // donner la couleur de fond
   glClearColor( 0,0,0,0 );

   // activer les etats openGL
   glEnable( GL_DEPTH_TEST );

   // charger les nuanceurs
   chargerNuanceurs();

   glUseProgram( progBase );
   cube = new FormeCube( 1.0, true );
   sphere = new FormeSphere( 0.25, 8, 8, true );
   cylindre = new FormeCylindre( 1.0, 1.0, 1.0, 16, 1, true );
   cone = new FormeCylindre( 1.0, 0.0, 1.0, 16, 1, true );
   pyramide = new FormePyramideBaseCarree(1.0, true);
}

void FenetreTP::conclure()
{
   vecSphere.clear();
   vecCube.clear();
   vecCylindre.clear();
   vecCone.clear();
   vecPyramide.clear();
   delete cube;
   delete sphere;
   delete cylindre;
   delete cone;
   delete pyramide;
}

// affiche la position courante du repère (pour débogage)
void afficherRepereCourant( int num = 0 )
{
   glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
   FenetreTP::afficherAxes( 1.5, 3.0 );
}

void afficherCylindre( )
{
   cylindre->afficher();
}

void afficherCone( )
{
   cone->afficher();
}

void afficherSphere( )
{
   sphere->afficher();
}

void afficherCube( )
{
   cube->afficher();
}

void afficherPyramide( )
{
   pyramide->afficher();
}

void genererCylindres()
{
   for(vector<StructCylindre>::iterator vec = vecCylindre.begin(); vec != vecCylindre.end(); ++vec){
      matrModel.PushMatrix();
      {
         int height = vec->height;
         int rayon = vec->rayon;
         matrModel.Translate( vec->translateX, vec->translateY, vec->translateZ);
         matrModel.Rotate(geo.angleReference, vec->angleX, vec->angleY, vec->angleZ);
         matrModel.Scale(rayon, rayon, height);
         glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
         glVertexAttrib3f( locColor, vec->colorR, vec->colorG, vec->colorB);
         afficherCylindre();
      }
      matrModel.PopMatrix(); glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
   }
}

void genererCones()
{
    for(vector<StructCone>::iterator vec = vecCone.begin(); vec != vecCone.end(); ++vec){
      matrModel.PushMatrix();
      {
         int height = vec->height;
         int rayon = vec->rayon;
         matrModel.Translate( vec->translateX, vec->translateY, vec->translateZ);
         matrModel.Rotate(geo.angleReference, vec->angleX, vec->angleY, vec->angleZ);
         matrModel.Scale(rayon, rayon, height);
         glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
         glVertexAttrib3f( locColor, vec->colorR, vec->colorG, vec->colorB);
         afficherCone();
      }
      matrModel.PopMatrix(); glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
   }
}

void genererSpheres()
{
   for(vector<StructSphere>::iterator vec = vecSphere.begin(); vec != vecSphere.end(); ++vec){
      matrModel.PushMatrix();
      {
         matrModel.Translate( vec->translateX, vec->translateY, vec->translateZ);
         matrModel.Rotate(geo.angleReference, vec->angleX, vec->angleY, vec->angleZ);
         matrModel.Scale(vec->tailleX, vec->tailleY, vec->tailleZ);
         glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
         glVertexAttrib3f( locColor, vec->colorR, vec->colorG, vec->colorB);
         afficherSphere();
      }
      matrModel.PopMatrix(); glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
   }
}

void genererCubes()
{
   for(vector<StructCube>::iterator vec = vecCube.begin(); vec != vecCube.end(); ++vec){
      matrModel.PushMatrix();
      {
         int arreteCube = vec->arrete;
         matrModel.Translate( vec->translateX, vec->translateY, vec->translateZ);
         matrModel.Rotate(geo.angleReference, vec->angleX, vec->angleY, vec->angleZ);
         matrModel.Scale(arreteCube, arreteCube, arreteCube);
         glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
         glVertexAttrib3f( locColor, vec->colorR, vec->colorG, vec->colorB);
         afficherCube();
      }
      matrModel.PopMatrix(); glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
   }
}

void genererPyramides()
{
   for(vector<StructPyramide>::iterator vec = vecPyramide.begin(); vec != vecPyramide.end(); ++vec){
      matrModel.PushMatrix();
      {
         int arretePyramide = vec->arrete;
         matrModel.Translate( vec->translateX, vec->translateY, vec->translateZ);
         matrModel.Rotate(geo.angleReference, vec->angleX, vec->angleY, vec->angleZ);
         matrModel.Scale(arretePyramide, arretePyramide, arretePyramide);
         glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
         glVertexAttrib3f( locColor, vec->colorR, vec->colorG, vec->colorB);
         afficherPyramide();
      }
      matrModel.PopMatrix(); glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
   }
}


void makeFormesGeometriques()
{
    int nombre = etat.nombreFormes;

    int nombreSpheres = callRandomNumber(nombre);
    makeSpheres(nombreSpheres);
    nombre = nombre - nombreSpheres;

    int nombreCubes = callRandomNumber(nombre);
    makeCubes(nombreCubes);
    nombre = nombre - nombreCubes;

    int nombrePyramides = callRandomNumber(nombre);
    makePyramides(nombrePyramides);
    nombre = nombre - nombrePyramides;

    int nombreCones = callRandomNumber(nombre);
    makeCones(nombreCones);
    nombre = nombre - nombreCones;

    makeCylindres(nombre);
    cout << nombreSpheres << endl;
    cout << nombreCubes << endl;
    cout << nombrePyramides << endl;
    cout << nombreCones << endl;
    cout << nombre << endl;
}

void afficherFormesGeometriques()
{
   matrModel.PushMatrix();{ // sauvegarder la tranformation courante

      genererSpheres();
      genererCubes();
      genererCylindres();
      genererCones();
      genererPyramides();

   }matrModel.PopMatrix(); glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
   glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
}

void addForm(int index){
    switch (index){
        case 0 :
            makeSpheres(1);
            break;
        case 1 : 
            makeCubes(1);
            break;
        case 2 : 
            makeCones(1);
            break;
        case 3 : 
            makeCylindres(1);
            break;
        case 4 : 
            makePyramides(1);
            break;
    }
}

void creerModifications()
{
    int compteur = 0;
    while (compteur < 7){
        int randomIndex = callRandomNumber(etat.modifications.length() - 1);
        char modif = etat.modifications[randomIndex];

        if (modif == 'a') {
            addForm(callRandomNumber(4));
            
        }
        else if (modif == 's') {
            bool notChanged = true;
            while (notChanged) {
                int random = callRandomNumber(4);
                if (random == 0 && !vecSphere.empty()){
                    swap(vecSphere.front(), vecSphere.back());
                    vecSphere.pop_back();
                    notChanged = false;
                }
                else if (random == 1 && !vecCube.empty()){
                    swap(vecCube.front(), vecCube.back());
                    vecCube.pop_back();
                    notChanged = false;
                }
                else if (random == 2 && !vecCone.empty()){
                    swap(vecCone.front(), vecCone.back());
                    vecCone.pop_back();
                    notChanged = false;
                }
                else if (random == 3 &&!vecCylindre.empty()){
                    swap(vecCylindre.front(), vecCylindre.back());
                    vecCylindre.pop_back();
                    notChanged = false;
                }
                else if (random == 4 &&!vecPyramide.empty()){
                    swap(vecPyramide.front(), vecPyramide.back());
                    vecPyramide.pop_back();
                    notChanged = false;
                }    
            }

        }
        else if (modif == 'c') {
            bool notChanged = true;
            while (notChanged) {
                int random = callRandomNumber(4);
                if (random == 0 && !vecSphere.empty()){
                    StructSphere form = vecSphere.front();
                    swap(vecSphere.front(), vecSphere.back());
                    vecSphere.pop_back();
                    form.colorR = callRandom(); form.colorG = callRandom(); form.colorB = callRandom();
                    vecSphere.push_back(form);
                    notChanged = false;
                }
                if (random == 1 && !vecCube.empty()){
                    StructCube form = vecCube.front();
                    swap(vecCube.front(), vecCube.back());
                    vecCube.pop_back();
                    form.colorR = callRandom(); form.colorG = callRandom(); form.colorB = callRandom();
                    vecCube.push_back(form);
                    notChanged = false;
                }
                if (random == 2 && !vecCone.empty()){
                    StructCone form = vecCone.front();
                    swap(vecCone.front(), vecCone.back());
                    vecCone.pop_back();
                    form.colorR = callRandom(); form.colorG = callRandom(); form.colorB = callRandom();
                    vecCone.push_back(form);
                    notChanged = false;
                }
                if (random == 3 && !vecCylindre.empty()){
                    StructCylindre form = vecCylindre.front();
                    swap(vecCylindre.front(), vecCylindre.back());
                    vecCylindre.pop_back();
                    form.colorR = callRandom(); form.colorG = callRandom(); form.colorB = callRandom();
                    vecCylindre.push_back(form);
                    notChanged = false;
                }
                if (random == 4 && !vecPyramide.empty()){
                    StructPyramide form = vecPyramide.front();
                    swap(vecPyramide.front(), vecPyramide.back());
                    vecPyramide.pop_back();
                    form.colorR = callRandom(); form.colorG = callRandom(); form.colorB = callRandom();
                    vecPyramide.push_back(form);
                    notChanged = false;
                }    
            }

        }
        glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel );
        compteur++;
    }
}

void capturerScene(string filepath)
{
    // Make the BYTE array, factor of 3 because it's RBG.
    int width = 640;
    int height = 480; 
    char charArray[100];  
    strcpy(charArray, filepath.c_str());  

    BYTE* pixels = new BYTE[3 * width * height];

    glReadPixels(110, 80, width, height, GL_RGB, GL_UNSIGNED_BYTE, pixels);

    // Convert to FreeImage format & save to file
    FIBITMAP* image = FreeImage_ConvertFromRawBits(pixels, width, height, 3 * width, 24, 0x0000FF, 0xFF0000, 0x00FF00, false);
    FreeImage_Save(FIF_BMP, image, charArray, 0);

    // Free resources
    FreeImage_Unload(image);
    delete [] pixels;
}

void FenetreTP::afficherScene(int index)
{
   // effacer l'ecran et le tampon de profondeur
   glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

   glUseProgram( progBase );

   // définir le pipeline graphique
   matrProj.Perspective( 45.0, (GLdouble) largeur_ / (GLdouble) hauteur_, 1, 100.0 );
   glUniformMatrix4fv( locmatrProj, 1, GL_FALSE, matrProj ); // informer la carte graphique des changements faits à la matrice

   camera.definir();
   glUniformMatrix4fv( locmatrVisu, 1, GL_FALSE, matrVisu ); // informer la carte graphique des changements faits à la matrice

   matrModel.LoadIdentity();
   glUniformMatrix4fv( locmatrModel, 1, GL_FALSE, matrModel ); // informer la carte graphique des changements faits à la matrice

   afficherFormesGeometriques();
   
   if (index){
    if (camera.modeLookAt)
        capturerScene(etat.capture1);
    else capturerScene(etat.capture2);   
   }

   else if (!index){
    if (camera.modeLookAt){
        capturerScene(etat.capture3);
    }
    else capturerScene(etat.capture4);   
   }
}

void creerEtat(const char* argv[], Etat& etat){
    etat.dimBoite = 15.0;
    etat.theme =  argv[1];
    etat.nombreFormes = atoi(argv[2]);
    etat.modifications = argv[3];
    etat.filename = argv[4];

    string capture1 = string(etat.filename + string("_a_ori.bmp"));
    string capture2 = string(etat.filename + string("_b_ori.bmp"));
    string capture3 = string(etat.filename + string("_a_mod.bmp"));
    string capture4 = string(etat.filename + string("_b_mod.bmp"));

    etat.capture1 = capture1;
    etat.capture2 = capture2;
    etat.capture3 = capture3;
    etat.capture4 = capture4;
}

void genScene(int argc, const char* argv[]){

    if (etat.theme == "geo"){
        if(etat.nombreFormes >= 10 && etat.nombreFormes <= 200){
            srand(time(NULL));
            int index = 1;

            FenetreTP fenetre( "INF2990" );
            fenetre.initialiser();

            makeFormesGeometriques();

            fenetre.afficherScene(index);
            fenetre.swap();

            //this_thread::sleep_for(chrono::seconds(1));
            camera.modeLookAt = !camera.modeLookAt;
            fenetre.afficherScene(index);
            fenetre.swap();
            index = 0;
            creerModifications();

            //this_thread::sleep_for(chrono::seconds(1));
            camera.modeLookAt = !camera.modeLookAt;
            fenetre.afficherScene(index);
            fenetre.swap();

            //this_thread::sleep_for(chrono::seconds(1));
            camera.modeLookAt = !camera.modeLookAt;
            fenetre.afficherScene(index);
            fenetre.swap();

            //this_thread::sleep_for(chrono::seconds(1));
            fenetre.conclure();
        }
        else {
            cerr << "Erreur: Il faut choisir entre 10 et 200 formes geometriques.\n";
            exit(1);
        }
    }
    else if (etat.theme == "theme"){
        cerr << "Erreur: L'executable ne peut creer de themes pour l'instant! Essayez plutot geo.\n";
        exit(1);
    }

}

int main( int argc, const char* argv[] ) {
    if (argc != 5 )
    {
        cerr << "Erreur: Nombre invalide de parametres!\n";
        cerr << "Template: main.exe geo 15 as nomFicher\n";
        exit(1);
    }
    creerEtat(argv, etat);

    for (int i = 0; i < 1; i++){
        genScene(argc, argv);
        
        string paramA = "../bmpdiff/bmpdiff " + etat.capture1 + " " + etat.capture3 + " " + etat.filename + "_a_diff.bmp ";
        string paramB = "../bmpdiff/bmpdiff " + etat.capture2 + " " + etat.capture4 + " " + etat.filename + "_b_diff.bmp ";

        int outputA = system(paramA.c_str());
        int outputB = system(paramB.c_str());

        if (outputA == 0 && outputB == 0){
            cout << "Succes\n";
            exit(0);
        } else{
            // cerr << "Essaie numero " << i+1 << " Erreur!";
        }
    }
    cerr << "Erreur\n";
    exit(1);
}
