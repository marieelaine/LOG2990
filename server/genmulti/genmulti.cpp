#include <iostream>
#include <fstream>
#include <sstream>
#include <math.h>
#include "include/inf2705-matrice.h"
#include "include/inf2705-nuanceur.h"
#include "include/inf2705-fenetre.h"
#include "include/inf2705-forme.h"
#include "include/FreeImage.h"
#include "include/bitmap_image.hpp"
#include "include/scene.h"
#include <vector>
#include <string>
#include <bits/stdc++.h> 
#include <sys/wait.h>
  
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


// window size
const GLint windowWidth = 640;
const GLint windowHeight = 480;

struct Vertex
{
    glm::vec3 position;
    glm::vec2 texcoord;
    glm::vec3 normal;
};

struct VertRef
{
    VertRef( int v, int vt, int vn ) : v(v), vt(vt), vn(vn) { }
    int v, vt, vn;
};

struct themeObject
{
    string type;
    vector<Vertex> model;
    int colorR; int colorG; int colorB;
    int angle; double rotX; double rotY; double rotZ;
    double transX; double transY; double transZ;
    double size;
};

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
} geo = { 2.5, 50 };

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
   int min = -etat.dimBoite*2;
   int max = etat.dimBoite*2;
   return rand()%((max - min) + 1) + min;
}

double callRandomTranslateZ()
{
   int min = -0.75*etat.dimBoite;
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

int callRandomColor()
{
   int min = 0;
   int max = 255;
   return rand()%((max - min) + 1) + min;
}

int callRandomAngleBounded(int start)
{
   int vMin = max(0, start - 45);
   int vMax = min(360, start + 45);
   return rand()%((vMax - vMin) + 1) + vMin;
}

double callRandomPosition(int minPos, int maxPos)
{
   return rand()%((maxPos - minPos) + 1) + minPos;
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
vector < themeObject > vecIsland;
vector < themeObject > vecFish;
vector < themeObject > vecBluewhale;
vector < themeObject > vecSeashell;
vector < themeObject > vecSeadiver;
vector < themeObject > vecSubmarine;
vector < themeObject > vecRocks;
vector < themeObject > vecSquid;
vector < themeObject > vecShark;
vector < themeObject > vecStarfish;
vector < themeObject > vecCoral;
vector < themeObject > vecCoral2;
vector < themeObject > vecUrchin;
vector < themeObject > vecGoldfish;
vector < themeObject > vecCrab;
vector < themeObject > vecChest;

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
        StructSphere sphere = { callRandomSize(1.5*geo.tailleReference), callRandomSize(1.5*geo.tailleReference), callRandomSize(1.5*geo.tailleReference),
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
    // cout << nombreSpheres << endl;
    // cout << nombreCubes << endl;
    // cout << nombrePyramides << endl;
    // cout << nombreCones << endl;
    // cout << nombre << endl;
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

void creerModificationsSceneGeo()
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

void capturerScene(string filepath, bool theme, int x, int y)
{
    // Make the BYTE array, factor of 3 because it's RBG.
    bitmap_image screenshot(windowWidth, windowHeight);
    unsigned char image[windowHeight*windowWidth*3];
    glReadPixels(x, y, windowWidth, windowHeight, GL_RGB, GL_UNSIGNED_BYTE, &image);
    int compteur = 0;
    if (theme) {
        for (unsigned int x = 0; x < windowWidth; ++x)
        {
            for (unsigned int y = 0; y < windowHeight; ++y)
            {
                int dim = ((windowHeight - y -1)  * 640 * 3) + (x * 3);
                compteur += 3;
                screenshot.set_pixel(x, y, image[dim], image[dim+1], image[dim+2]);
            }
        }
    }
    else {
        for (unsigned int x = 0; x < windowWidth; ++x)
        {
            for (unsigned int y = 0; y < windowHeight; ++y)
            {
                int dim = (y  * 640 * 3) + (x * 3);
                compteur += 3;
                screenshot.set_pixel(x, y, image[dim], image[dim+1], image[dim+2]);
            }
        }
    }

    screenshot.save_image(filepath);
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
        capturerScene(etat.capture1, false, 110, 80);
    else capturerScene(etat.capture2, false, 110, 80);   
   }

   else if (!index){
    if (camera.modeLookAt){
        capturerScene(etat.capture3, false, 110, 80);
    }
    else capturerScene(etat.capture4, false, 110, 80);   
   }
}

vector<vector<themeObject>> createGlobalVec(){
    vector <vector<themeObject>> globalVec;

    globalVec.push_back(vecIsland);
    globalVec.push_back(vecCoral);
    globalVec.push_back(vecCoral2);
    globalVec.push_back(vecGoldfish);
    globalVec.push_back(vecUrchin);
    globalVec.push_back(vecStarfish);
    globalVec.push_back(vecCrab);
    globalVec.push_back(vecFish);
    globalVec.push_back(vecSquid);
    globalVec.push_back(vecShark);
    globalVec.push_back(vecBluewhale);
    globalVec.push_back(vecSubmarine);
    globalVec.push_back(vecChest);
    globalVec.push_back(vecSeadiver);
    globalVec.push_back(vecRocks);
    globalVec.push_back(vecSeashell);

    return globalVec;
}

void deleteGlobalVec(){
    vecIsland.clear();
    vecCoral.clear();
    vecCoral2.clear();
    vecGoldfish.clear();
    vecUrchin.clear();
    vecStarfish.clear();
    vecCrab.clear();
    vecFish.clear();
    vecSquid.clear();
    vecShark.clear();
    vecBluewhale.clear();
    vecSubmarine.clear();
    vecChest.clear();
    vecSeadiver.clear();
    vecRocks.clear();
    vecSeashell.clear();
}

vector< Vertex > LoadOBJ( istream& in )
{
    vector< Vertex > verts;

    vector< glm::vec4 > positions( 1, glm::vec4( 0, 0, 0, 0 ) );
    vector< glm::vec3 > texcoords( 1, glm::vec3( 0, 0, 0 ) );
    vector< glm::vec3 > normals( 1, glm::vec3( 0, 0, 0 ) );
    string lineStr;
    while( getline( in, lineStr ) )
    {
        istringstream lineSS( lineStr );
        string lineType;
        lineSS >> lineType;

        // vertex
        if( lineType == "v" )
        {
            float x = 0, y = 0, z = 0, w = 1;
            lineSS >> x >> y >> z >> w;
            positions.push_back( glm::vec4( x, y, z, w ) );
        }

        // texture
        if( lineType == "vt" )
        {
            float u = 0, v = 0, w = 0;
            lineSS >> u >> v >> w;
            texcoords.push_back( glm::vec3( u, v, w ) );
        }

        // normal
        if( lineType == "vn" )
        {
            float i = 0, j = 0, k = 0;
            lineSS >> i >> j >> k;
            normals.push_back( glm::normalize( glm::vec3( i, j, k ) ) );
        }

        // polygon
        if( lineType == "f" )
        {
            vector< VertRef > refs;
            string refStr;
            while( lineSS >> refStr )
            {
                istringstream ref( refStr );
                string vStr, vtStr, vnStr;
                getline( ref, vStr, '/' );
                getline( ref, vtStr, '/' );
                getline( ref, vnStr, '/' );
                int v = atoi( vStr.c_str() );
                int vt = atoi( vtStr.c_str() );
                int vn = atoi( vnStr.c_str() );
                v  = (  v >= 0 ?  v : positions.size() +  v );
                vt = ( vt >= 0 ? vt : texcoords.size() + vt );
                vn = ( vn >= 0 ? vn : normals.size()   + vn );
                refs.push_back( VertRef( v, vt, vn ) );
            }

            // triangulate, assuming n>3-gons are convex and coplanar
            for( size_t i = 1; i+1 < refs.size(); ++i )
            {
                const VertRef* p[3] = { &refs[0], &refs[i], &refs[i+1] };

                glm::vec3 U( positions[ p[1]->v ] - positions[ p[0]->v ] );
                glm::vec3 V( positions[ p[2]->v ] - positions[ p[0]->v ] );
                glm::vec3 faceNormal = glm::normalize( glm::cross( U, V ) );

                for( size_t j = 0; j < 3; ++j )
                {
                    Vertex vert;
                    vert.position = glm::vec3( positions[ p[j]->v ] );
                    vert.texcoord = glm::vec2( texcoords[ p[j]->vt ] );
                    vert.normal = ( p[j]->vn != 0 ? normals[ p[j]->vn ] : faceNormal );
                    verts.push_back( vert );
                }
            }
        }
    }

    return verts;
}

void bindModel(themeObject objet) {
    glTranslatef( objet.transX, objet.transY, objet.transZ );
    glRotatef( objet.angle, objet.rotX, objet.rotY, objet.rotZ );
    glColor3ub( objet.colorR, objet.colorG, objet.colorB );
    glEnableClientState( GL_VERTEX_ARRAY );
    glEnableClientState( GL_TEXTURE_COORD_ARRAY );
    glEnableClientState( GL_NORMAL_ARRAY );
    glVertexPointer( 3, GL_FLOAT, sizeof(Vertex), &objet.model[0].position );
    glTexCoordPointer( 2, GL_FLOAT, sizeof(Vertex), &objet.model[0].texcoord );
    glNormalPointer( GL_FLOAT, sizeof(Vertex), &objet.model[0].normal );
    glDrawArrays( GL_TRIANGLES, 0, objet.model.size() );
    glDisableClientState( GL_VERTEX_ARRAY );
    glDisableClientState( GL_TEXTURE_COORD_ARRAY );
    glDisableClientState( GL_NORMAL_ARRAY );
}

void display()
{
    glClearColor( 0.051f, 0.21f, 0.32f, 1.0f );
    glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

    glMatrixMode( GL_PROJECTION );
    glLoadIdentity();
    double w = windowHeight;
    double h = windowHeight;
    double ar = w / h;
    gluPerspective( 60, ar, 4, 100 );

    glMatrixMode( GL_MODELVIEW );
    glLoadIdentity();
    glTranslatef( 0, -2.0, -22 );
    glRotatef( 30, 1, 0, 0);

    vector<vector<themeObject>> globalVec = createGlobalVec();

    for(vector<vector<themeObject>>::iterator vec = globalVec.begin(); vec < globalVec.end(); ++vec){
        for(vector<themeObject>::iterator object = vec->begin(); object < vec->end(); ++object){
            glPushMatrix();
            { 
                bindModel(*object);
            }
            glPopMatrix();
        }
    }

    glutSwapBuffers();
}

void displayPOV2()
{
    //glClearColor( 0.76f, 0.70f, 0.95f, 1.0f );
    glClearColor( 0.89f, 0.82f, 0.59f, 1.0f );
    glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

    glMatrixMode( GL_PROJECTION );
    glLoadIdentity();
    double w = windowWidth;
    double h = windowHeight;
    double ar = w / h;
    gluPerspective( 60, ar, 4, 100 );

    glMatrixMode( GL_MODELVIEW );
    glLoadIdentity();
    glTranslatef( 0, 0, -17 );

    glRotatef( 90, 1, 0, 0 );
    vector<vector<themeObject>> globalVec = createGlobalVec();

    for(vector<vector<themeObject>>::iterator vec = globalVec.begin(); vec != globalVec.end(); ++vec){
        for(vector<themeObject>::iterator object = vec->begin(); object != vec->end(); ++object){
            glPushMatrix();
            { 
                bindModel(*object);
            }
            glPopMatrix();
        }
    }

    glutSwapBuffers();
}

// return the min/max points of pts
template< typename Vec >
pair< Vec, Vec > GetExtents( const Vec* pts, size_t stride, size_t count )
{
    unsigned char* base = (unsigned char*)pts;
    Vec pmin( *(Vec*)base );
    Vec pmax( *(Vec*)base );
    for( size_t i = 0; i < count; ++i, base += stride )
    {
        const Vec& pt = *(Vec*)base;
        pmin = glm::min( pmin, pt );
        pmax = glm::max( pmax, pt );
    }

    return make_pair( pmin, pmax );
}

// centers geometry around the origin
// and scales it to fit in a size^3 box
template< typename Vec > 
void CenterAndScale( Vec* pts, size_t stride, size_t count, const typename Vec::value_type& size )
{
    typedef typename Vec::value_type Scalar;

    // get min/max extents
    pair< Vec, Vec > exts = GetExtents( pts, stride, count );

    // center and scale 
    const Vec center = ( exts.first * Scalar( 0.5 ) ) + ( exts.second * Scalar( 0.5f ) );

    const Scalar factor = size / glm::compMax( exts.second - exts.first );
    unsigned char* base = (unsigned char*)pts;
    for( size_t i = 0; i < count; ++i, base += stride )
    {
        Vec& pt = *(Vec*)base;
        pt = ( ( pt - center ) * factor );
    }    
}
void createThemeObject(string type, vector <Vertex> model, double size) {
    themeObject object = {};
    if (type == "shark") { 
        object = {
            type,
            model,
            0, 226, 242,
            callRandomAngleBounded(320), callRandom(), 0, 0,
            callRandomPosition(-4,3), callRandomPosition(3,6), callRandomPosition(-3,4),
            size
        };
        vecShark.push_back(object);
    }
    else if (type == "island") { 
        object = {
            type,
            model,
            194, 178, 128,
            0, 0, 0, 0,
            0, 0, 0,
            size
        };
        vecIsland.push_back(object);
    }
    else if (type == "chest") { 
        object = {
            type,
            model,
            71, 55, 10,
            0, 0, 0, 0,
            -7, -0.2, callRandomPosition(-6,6),
            size
        };
        vecChest.push_back(object);
    }
    else if (type == "coral") { 
        object = {
            type,
            model,
            callRandomColor(), callRandomColor(), callRandomColor(),
            0, 0, 0, 0,
            callRandomPosition(-5, -1), 0.5, callRandomPosition(-6,6),
            size
        };
        vecCoral.push_back(object);
    }
    else if (type == "coral2") { 
        object = {
            type,
            model,
            callRandomColor(), callRandomColor(), callRandomColor(),
            callRandomAngleBounded(270), callRandom(), 0, 0,
            callRandomPosition(-5, -1), 0.1, callRandomPosition(-6,6),
            size
        };
        vecCoral2.push_back(object);
    }
    else if (type == "crab") { 
        object = {
            type,
            model,
            226, 57, 31,
            callRandomAngleBounded(270), callRandom(), 0, 0,
            callRandomPosition(-7,7), 2, callRandomPosition(-6,6),
            size
        };
        vecCrab.push_back(object);
    }
    else if (type == "bluewhale") { 
        object = {
            type,
            model,
            163, 118, 52,
            callRandomAngleBounded(300), callRandom(), callRandom(), callRandom(),
            callRandomPosition(-7,7), 3, callRandomPosition(-5,5), 
            size
        };
        vecBluewhale.push_back(object);
    }
    else if (type == "starfish") { 
        object = {
            type,
            model,
            209, 156, 33,
            callRandomAngleBounded(270), callRandom(), callRandom(), callRandom(),
            callRandomPosition(-7,7), callRandomPosition(2,6), callRandomPosition(-6,6),
            size
        };
        vecStarfish.push_back(object);
    }
    else if (type == "seashell") { 
        object = {
            type,
            model,
            callRandomColor(), callRandomColor(), callRandomColor(),
            0, 0, 0, 0,
            callRandomPosition(6, 7), -0.5, callRandomPosition(-7,-6),
            size
        };
        vecSeashell.push_back(object);
    }
    else if (type == "rocks") { 
        object = {
            type,
            model,
            144, 144, 144,
            0, 0, 0, 0,
            callRandomPosition(-7,7), -0.25, 5.5,
            size
        };
        vecRocks.push_back(object);
    }
    else if (type == "squid") { 
        object = {
            type,
            model,
            67, 27, 91,
            callRandomAngleBounded(30), callRandom(), callRandom(), callRandom(),
            callRandomPosition(-7,7), callRandomPosition(2,6), callRandomPosition(-6,6),
            size
        };
        vecSquid.push_back(object);
    }
    else if (type == "fish") { 
        object = {
            type,
            model,
            232, 127, 16,
            callRandomAngleBounded(270), callRandom(), 0, 0,
            callRandomPosition(-7,7), callRandomPosition(2,6), callRandomPosition(-6,6),
            size
        };
        vecFish.push_back(object);
    }
    else if (type == "goldfish") { 
        object = {
            type,
            model,
            16, 127, 0,
            callRandomAngleBounded(270), callRandom(), 0, 0,
            callRandomPosition(-7,7), callRandomPosition(2,6), callRandomPosition(-6,6),
            size
        };
        vecGoldfish.push_back(object);
    }
    else if (type == "submarine") { 
        object = {
            type,
            model,
            46, 45, 56,
            callRandomAngleBounded(90), callRandom(), 0, 0,
            callRandomPosition(-7,7), callRandomPosition(5, 6.0), callRandomPosition(-5.5, 5.5),
            size
        };
        vecSubmarine.push_back(object);
    }
    else if (type == "urchin") { 
        object = {
            type,
            model,
            25, 23, 40,
            0, 0, 0, 0,
            callRandomPosition(-7,0), 0, callRandomPosition(-6,6),
            size
        };
        vecUrchin.push_back(object);
    }
    else if (type == "seadiver") { 
        object = {
            type,
            model,
            46, 45, 56,
            270, 1, 0, 0,
            -6, -0.1, callRandomPosition(-6, 6),
            size
        };
        vecSeadiver.push_back(object);
    }
}

void importObject(string file, string type, int size, int number){
    ifstream filestream( file );
    vector<Vertex> model = LoadOBJ( filestream );
    CenterAndScale( &model[0].position, sizeof( Vertex ), model.size(), size );
    for(int i = 0; i < number; i++)
        createThemeObject(type, model, size);
}

void makeSceneThematique(){
    importObject("./genmulti/data/obj/island.obj", "island", 20, 1);

    int nombre = etat.nombreFormes;
    int temp = callRandomPosition(0, nombre/4);
    importObject("./genmulti/data/obj/goldfish.obj", "goldfish", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/4);
    importObject("./genmulti/data/obj/squid.obj", "squid", 2, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/4);
    importObject("./genmulti/data/obj/submarine.obj", "submarine", 3, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/4);
    importObject("./genmulti/data/obj/urchin.obj", "urchin", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/4);
    importObject("./genmulti/data/obj/starfish.obj", "starfish", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/3);
    importObject("./genmulti/data/obj/crab.obj", "crab", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/3);
    importObject("./genmulti/data/obj/fish.obj", "fish", 1, temp);
    nombre = nombre - temp;
    
    temp = callRandomPosition(0, nombre/2);
    importObject("./genmulti/data/obj/coral.obj", "coral", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/2);
    importObject("./genmulti/data/obj/shark.obj", "shark", 2, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/2);
    importObject("./genmulti/data/obj/bluewhale.obj", "bluewhale", 2, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/2);
    importObject("./genmulti/data/obj/coral2.obj", "coral2", 1, temp);
    nombre = nombre - temp;
    
    temp = callRandomPosition(0, nombre);
    importObject("./genmulti/data/obj/chest.obj", "chest", 2, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre);
    importObject("./genmulti/data/obj/seashell.obj", "seashell", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre);
    importObject("./genmulti/data/obj/seadiver.obj", "seadiver", 3, temp);
    nombre = nombre - temp;
    
    importObject("./genmulti/data/obj/rocks.obj", "rocks", 4, nombre);
}

void addThemeObjet(int position){
    switch (position){
        case 0 :
            importObject("./genmulti/data/obj/goldfish.obj", "goldfish", 2, 1);
            break;
        case 1 : 
            importObject("./genmulti/data/obj/squid.obj", "squid", 2, 1);
            break;
        case 2 : 
            importObject("./genmulti/data/obj/submarine.obj", "submarine", 5, 1);
            break;
        case 3 : 
            importObject("./genmulti/data/obj/urchin.obj", "urchin", 1, 1);
            break;
        case 4 : 
            importObject("./genmulti/data/obj/starfish.obj", "starfish", 1, 1);
            break;
        case 5 : 
            importObject("./genmulti/data/obj/crab.obj", "crab", 1, 1);
            break;
        case 6 : 
            importObject("./genmulti/data/obj/fish.obj", "fish", 1, 1);
            break;
        case 7 : 
            importObject("./genmulti/data/obj/coral.obj", "coral", 1, 1);
            break;
        case 8 : 
            importObject("./genmulti/data/obj/shark.obj", "shark", 3, 1);
            break;
        case 9 : 
            importObject("./genmulti/data/obj/bluewhale.obj", "bluewhale", 4, 1);
            break;
        case 10 : 
            importObject("./genmulti/data/obj/coral2.obj", "coral2", 1, 1);
            break;
        case 11 : 
            importObject("./genmulti/data/obj/chest.obj", "chest", 2, 1);
            break;
        case 12 : 
            importObject("./genmulti/data/obj/seadiver.obj", "seadiver", 3, 1);
            break;
        case 13 : 
            importObject("./genmulti/data/obj/rocks.obj", "rocks", 5, 1);
            break;
        case 14 : 
            importObject("./genmulti/data/obj/seashell.obj", "seashell", 1, 1);
            break;
    }
}

void changeColor(vector<themeObject>& vector){
    themeObject object = vector.front();
    swap(vector.front(), vector.back());
    vector.pop_back();
    object.colorR = callRandomColor(); object.colorG = callRandomColor(); object.colorB = callRandomColor();
    vector.push_back(object);
} 

void deleteObject(vector<themeObject>& vec){
    swap(vec.front(), vec.back());
    vec.pop_back();
} 

void creerModificationsThematique()
{
    int compteur = 0;
    while (compteur < 7){
        int randomIndex = callRandomPosition(0, etat.modifications.length() - 1);
        char modif = etat.modifications[randomIndex];

        if (modif == 'a') {
            addThemeObjet(callRandomPosition(0, 14));
            
        }
        else if (modif == 's') {
            bool notChanged = true;
            while (notChanged) {
                int random = callRandomPosition(0, 14);
                if (random == 0 && !vecGoldfish.empty()){
                    deleteObject(vecGoldfish);
                    notChanged = false;
                }
                else if (random == 1 && !vecSquid.empty()){
                    deleteObject(vecSquid);
                    notChanged = false;
                }
                else if (random == 2 && !vecSubmarine.empty()){
                    deleteObject(vecSubmarine);
                    notChanged = false;
                }
                else if (random == 3 && !vecUrchin.empty()){
                    deleteObject(vecUrchin);
                    notChanged = false;
                }
                else if (random == 4 && !vecStarfish.empty()){
                    deleteObject(vecStarfish);
                    notChanged = false;
                }
                else if (random == 5 && !vecCrab.empty()){
                    deleteObject(vecCrab);
                    notChanged = false;
                }
                else if (random == 6 && !vecFish.empty()){
                    deleteObject(vecFish);
                    notChanged = false;
                }    
                else if (random == 7 && !vecCoral.empty()){
                    deleteObject(vecCoral);;
                    notChanged = false;
                }    
                else if (random == 8 && !vecShark.empty()){
                    deleteObject(vecShark);
                    notChanged = false;
                }    
                else if (random == 9 && !vecBluewhale.empty()){
                    deleteObject(vecBluewhale);
                    notChanged = false;
                }    
                else if (random == 10 && !vecCoral2.empty()){
                    deleteObject(vecCoral2);
                    notChanged = false;
                }    
                else if (random == 11 && !vecChest.empty()){
                   deleteObject(vecChest);
                    notChanged = false;
                }    
                else if (random == 12 && !vecSeadiver.empty()){
                    deleteObject(vecSeadiver);
                    notChanged = false;
                }    
                else if (random == 13 && !vecRocks.empty()){
                    deleteObject(vecRocks);
                    notChanged = false;
                }    
                else if (random == 14 && !vecSeashell.empty()){
                    deleteObject(vecSeashell);
                    notChanged = false;
                }
            }
        }
        else if (modif == 'c') {
            bool notChanged = true;
            while (notChanged) {
                int random = callRandomPosition(0, 14);
                if (random == 0 && !vecGoldfish.empty()){
                    changeColor(vecGoldfish);
                    notChanged = false;
                }
                if (random == 1 && !vecSquid.empty()){
                    changeColor(vecSquid);
                    notChanged = false;
                }
                if (random == 2 && !vecSubmarine.empty()){
                    changeColor(vecSubmarine);
                    notChanged = false;
                }
                if (random == 3 && !vecUrchin.empty()){
                    changeColor(vecUrchin);
                    notChanged = false;
                }
                if (random == 4 && !vecStarfish.empty()){
                    changeColor(vecStarfish);
                    notChanged = false;
                } 
                if (random == 5 && !vecCrab.empty()){
                    changeColor(vecCrab);
                    notChanged = false;
                }
                if (random == 6 && !vecFish.empty()){
                    changeColor(vecFish);
                    notChanged = false;
                }
                if (random == 7 && !vecCoral.empty()){
                    changeColor(vecCoral);
                    notChanged = false;
                }
                if (random == 8 && !vecShark.empty()){
                    changeColor(vecShark);
                    notChanged = false;
                }
                if (random == 9 && !vecBluewhale.empty()){
                    changeColor(vecBluewhale);
                    notChanged = false;
                }
                if (random == 10 && !vecCoral2.empty()){
                    changeColor(vecCoral2);
                    notChanged = false;
                }
                if (random == 11 && !vecChest.empty()){
                    changeColor(vecChest);
                    notChanged = false;
                }
                if (random == 12 && !vecSeadiver.empty()){
                    changeColor(vecSeadiver);
                    notChanged = false;
                }
                if (random == 13 && !vecRocks.empty()){
                    changeColor(vecRocks);
                    notChanged = false;
                }
                if (random == 14 && !vecSeashell.empty()){
                    changeColor(vecSeashell);
                    notChanged = false;
                }
            }
        }
        compteur++;
    }
}

void Timer(int value)
{
   if (value == 0) // passed in in main
   {
      glutDisplayFunc(display);
      glutIdleFunc(display);
      capturerScene(etat.capture1, true, 0 ,0);
      // Change to a new display function in 2 seconds
      glutTimerFunc(500, Timer, 1);
   }
   else if(value==1)
   {
     glutDisplayFunc(displayPOV2);
     glutIdleFunc(displayPOV2);
     glutTimerFunc(500, Timer, 2);
   }
   else if(value==2)
   {
     capturerScene(etat.capture2, true, 0, 0);
     creerModificationsThematique();
     glutDisplayFunc(display);
     glutIdleFunc(display);
     glutTimerFunc(500, Timer, 3);
   }
   else if(value==3)
   {
     capturerScene(etat.capture3, true, 0, 0);
     glutDisplayFunc(displayPOV2);
     glutIdleFunc(displayPOV2);
     glutTimerFunc(500, Timer, 4);
   }
   else if(value==4)
   {
    capturerScene(etat.capture4, true, 0, 0);
    glutTimerFunc(500, Timer, 5);
   }
   else if(value==5)
   {
    glutLeaveMainLoop();
    deleteGlobalVec();
   }

}

void initSceneThematique(void)
{
    // turn on depth test
    glEnable(GL_DEPTH_TEST);
    glDepthFunc(GL_LESS);
    glClearColor(0.1f, 0.1f, 0.1f, 1.0f);
}

void creerEtat(char* argv[], Etat& etat){
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

void genScene(int argc, char* argv[]){

     if(etat.nombreFormes >= 10 && etat.nombreFormes <= 200){
        if(etat.theme == "geo"){
            int index = 1;

            FenetreTP fenetre( "INF2990" );
            fenetre.initialiser();

            makeFormesGeometriques();

            fenetre.afficherScene(index);

            camera.modeLookAt = !camera.modeLookAt;
            fenetre.afficherScene(index);
            index = 0;
            creerModificationsSceneGeo();

            camera.modeLookAt = !camera.modeLookAt;
            fenetre.afficherScene(index);
            
            camera.modeLookAt = !camera.modeLookAt;
            fenetre.afficherScene(index);

            fenetre.conclure();
        }
        else if (etat.theme == "theme"){
            glutInit( &argc, argv );
            glutInitDisplayMode( GLUT_RGBA | GLUT_DEPTH | GLUT_DOUBLE );
            glutSetOption( GLUT_ACTION_ON_WINDOW_CLOSE, GLUT_ACTION_GLUTMAINLOOP_RETURNS );
            glutInitWindowSize( windowWidth, windowHeight );
            glutCreateWindow( "LOG2990 - AQUALAND" );

            initSceneThematique();
            makeSceneThematique();

            glutDisplayFunc( display );
            glutIdleFunc( display );
            glutTimerFunc(500, Timer, 0);
            glEnable( GL_DEPTH_TEST );

            // // set up "headlamp"-like light
            glShadeModel( GL_SMOOTH );
            glEnable( GL_COLOR_MATERIAL );
            glColorMaterial( GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE ) ;
            glEnable( GL_LIGHTING );
            glEnable( GL_LIGHT0 );
            glMatrixMode( GL_MODELVIEW );
            glLoadIdentity();
            GLfloat position[] = { 0, 0, 1, 0 };
            glLightfv( GL_LIGHT0, GL_POSITION, position );
            glPolygonMode( GL_FRONT, GL_FILL );
            glPolygonMode( GL_BACK, GL_LINE );
            glutMainLoop();
        }
    }
    else {
            cerr << "Erreur: Il faut choisir entre 10 et 200 formes geometriques.\n";
            exit(1);
    }

}

int main( int argc, char* argv[] ) {
    if (argc != 5 )
    {
        cerr << "Erreur: Nombre invalide de parametres!\n";
        cerr << "Template: main.exe geo 15 as nomFicher\n";
        exit(1);
    }
    creerEtat(argv, etat);
    srand(time(NULL));

    for (int i = 0; i < 4; i++){
        genScene(argc, argv);
        
        string paramA = "./bmpdiff/bmpdiff " + etat.capture1 + " " + etat.capture3 + " " + etat.filename + "_a_diff.bmp ";
        string paramB = "./bmpdiff/bmpdiff " + etat.capture2 + " " + etat.capture4 + " " + etat.filename + "_b_diff.bmp ";
        cout << paramA << endl;
        cout << paramB << endl;
        int outputA = system(paramA.c_str());
        int outputB = system(paramB.c_str());

        if (outputA == 0 && outputB == 0){
            cout << "Succes\n";
            exit(0);
        }
    }
    cerr << "Erreur\n";
    exit(1);
}
