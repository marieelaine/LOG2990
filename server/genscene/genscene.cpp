#include <vector>
#include <iostream>
#include <fstream>
#include <sstream>
#include <math.h>
#include <thread>
#include <chrono>
#include "include/bitmap_image.hpp"
#include "include/scene.h"

using namespace std;

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
   string theme;
   int nombreFormes;
   string modifications;
   string filename;
   string capture1;
   string capture2;
   string capture3;
   string capture4;
} etat = {};

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

double callRandom()
{
   return (double)rand()/(RAND_MAX);
}

double callRandomPosition(int minPos, int maxPos)
{
   return rand()%((maxPos - minPos) + 1) + minPos;
}

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
    glClearColor( 0.2f, 0.2f, 0.2f, 1.0f );
    glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

    glMatrixMode( GL_PROJECTION );
    glLoadIdentity();
    double w = windowHeight;
    double h = windowHeight;
    double ar = w / h;
    gluPerspective( 60, ar, 4, 100 );

    glMatrixMode( GL_MODELVIEW );
    glLoadIdentity();
    glTranslatef( 0, -2, -20 );

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

void displayPOV2()
{
    glClearColor( 0.2f, 0.2f, 0.2f, 1.0f );
    glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

    glMatrixMode( GL_PROJECTION );
    glLoadIdentity();
    double w = windowWidth;
    double h = windowHeight;
    double ar = w / h;
    gluPerspective( 60, ar, 4, 100 );

    glMatrixMode( GL_MODELVIEW );
    glLoadIdentity();
    glTranslatef( 0, -2, -20 );

    glRotatef( 180, 0, 1, 0 );
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
            242, 226, 0,
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
            128, 178, 194,
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
            10, 55, 71,
            0, 0, 0, 0,
            -7, -1.05, callRandomPosition(-7,7),
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
            callRandomPosition(-3, -1), 0.1, callRandomPosition(-7,7),
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
            callRandomPosition(-3, -1), 0.1, callRandomPosition(-7,7),
            size
        };
        vecCoral2.push_back(object);
    }
    else if (type == "crab") { 
        object = {
            type,
            model,
            31, 57, 226,
            callRandomAngleBounded(270), callRandom(), 0, 0,
            callRandomPosition(-7,7), 2, callRandomPosition(-7,7),
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
            callRandomPosition(-7,7), 5, callRandomPosition(-7,7), 
            size
        };
        vecBluewhale.push_back(object);
    }
    else if (type == "starfish") { 
        object = {
            type,
            model,
            33, 156, 209,
            callRandomAngleBounded(270), callRandom(), callRandom(), callRandom(),
            callRandomPosition(-7,7), callRandomPosition(2,7), callRandomPosition(-7,7),
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
            6, -0.5, callRandomPosition(-7,-6),
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
            91, 27, 67,
            callRandomAngleBounded(30), callRandom(), callRandom(), callRandom(),
            callRandomPosition(-7,7), callRandomPosition(2,7), callRandomPosition(-7,7),
            size
        };
        vecSquid.push_back(object);
    }
    else if (type == "fish") { 
        object = {
            type,
            model,
            16, 127, 232,
            callRandomAngleBounded(270), callRandom(), 0, 0,
            callRandomPosition(-7,7), callRandomPosition(2,7), callRandomPosition(-7,7),
            size
        };
        vecFish.push_back(object);
    }
    else if (type == "goldfish") { 
        object = {
            type,
            model,
            0, 127, 16,
            callRandomAngleBounded(270), callRandom(), 0, 0,
            callRandomPosition(-7,7), callRandomPosition(2,7), callRandomPosition(-7,7),
            size
        };
        vecGoldfish.push_back(object);
    }
    else if (type == "submarine") { 
        object = {
            type,
            model,
            56, 45, 46,
            callRandomAngleBounded(90), callRandom(), 0, 0,
            callRandomPosition(-7,7), callRandomPosition(5,7.5), callRandomPosition(-7,7),
            size
        };
        vecSubmarine.push_back(object);
    }
    else if (type == "urchin") { 
        object = {
            type,
            model,
            40, 23, 25,
            0, 0, 0, 0,
            callRandomPosition(-7,0), 0, callRandomPosition(-7,7),
            size
        };
        vecUrchin.push_back(object);
    }
    else if (type == "seadiver") { 
        object = {
            type,
            model,
            56, 45, 46,
            270, 1, 0, 0,
            -6, -0.1, callRandomPosition(-7, 7),
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

void makeScene(){
    importObject("data/obj/island.obj", "island", 20, 1);

    int nombre = etat.nombreFormes;
    int temp = callRandomPosition(0, nombre/4);
    importObject("data/obj/goldfish.obj", "goldfish", 2, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/4);
    importObject("data/obj/squid.obj", "squid", 2, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/4);
    importObject("data/obj/submarine.obj", "submarine", 5, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/4);
    importObject("data/obj/urchin.obj", "urchin", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/4);
    importObject("data/obj/starfish.obj", "starfish", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/3);
    importObject("data/obj/crab.obj", "crab", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/3);
    importObject("data/obj/fish.obj", "fish", 1, temp);
    nombre = nombre - temp;
    
    temp = callRandomPosition(0, nombre/2);
    importObject("data/obj/coral.obj", "coral", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/2);
    importObject("data/obj/shark.obj", "shark", 3, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/2);
    importObject("data/obj/bluewhale.obj", "bluewhale", 4, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre/2);
    importObject("data/obj/coral2.obj", "coral2", 1, temp);
    nombre = nombre - temp;
    
    temp = callRandomPosition(0, nombre);
    importObject("data/obj/chest.obj", "chest", 2, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre);
    importObject("data/obj/seashell.obj", "seashell", 1, temp);
    nombre = nombre - temp;

    temp = callRandomPosition(0, nombre);
    importObject("data/obj/seadiver.obj", "seadiver", 3, temp);
    nombre = nombre - temp;
    
    importObject("data/obj/rocks.obj", "rocks", 4, nombre);
}

void addThemeObjet(int position){
    switch (position){
        case 0 :
            importObject("data/obj/goldfish.obj", "goldfish", 2, 1);
            break;
        case 1 : 
            importObject("data/obj/squid.obj", "squid", 2, 1);
            break;
        case 2 : 
            importObject("data/obj/submarine.obj", "submarine", 5, 1);
            break;
        case 3 : 
            importObject("data/obj/urchin.obj", "urchin", 1, 1);
            break;
        case 4 : 
            importObject("data/obj/starfish.obj", "starfish", 1, 1);
            break;
        case 5 : 
            importObject("data/obj/crab.obj", "crab", 1, 1);
            break;
        case 6 : 
            importObject("data/obj/fish.obj", "fish", 1, 1);
            break;
        case 7 : 
            importObject("data/obj/coral.obj", "coral", 1, 1);
            break;
        case 8 : 
            importObject("data/obj/shark.obj", "shark", 3, 1);
            break;
        case 9 : 
            importObject("data/obj/bluewhale.obj", "bluewhale", 4, 1);
            break;
        case 10 : 
            importObject("data/obj/coral2.obj", "coral2", 1, 1);
            break;
        case 11 : 
            importObject("data/obj/chest.obj", "chest", 2, 1);
            break;
        case 12 : 
            importObject("data/obj/seadiver.obj", "seadiver", 3, 1);
            break;
        case 13 : 
            importObject("data/obj/rocks.obj", "rocks", 5, 1);
            break;
        case 14 : 
            importObject("data/obj/seashell.obj", "seashell", 1, 1);
            break;
    }
}

void creerEtat(char* argv[], Etat& etat){

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

void creerModifications()
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

void capturerScene(string filepath, int x, int y)
{
    // Make the BYTE array, factor of 3 because it's RBG.
    bitmap_image screenshot(windowWidth, windowHeight);
    unsigned char image[windowHeight*windowWidth*3];
    glReadPixels(x, y, windowWidth, windowHeight, GL_RGB, GL_UNSIGNED_BYTE, &image);
    int compteur = 0;
    for (unsigned int x = 0; x < windowWidth; ++x)
    {
      for (unsigned int y = 0; y < windowHeight; ++y)
      {
        int dim = ((windowHeight - y - 1) * 640 * 3) + (x * 3);
        compteur += 3;
        screenshot.set_pixel(x, y, image[dim], image[dim+1], image[dim+2]);
      }
    }

    screenshot.save_image(filepath);
}

void Timer(int value)
{
   if (value == 0) // passed in in main
   {
      glutDisplayFunc(display);
      glutIdleFunc(display);
      capturerScene(etat.capture1,0 ,0);
      // Change to a new display function in 2 seconds
      glutTimerFunc(100, Timer, 1);
   }
   else if(value==1)
   {
     glutDisplayFunc(displayPOV2);
     glutIdleFunc(displayPOV2);
     glutTimerFunc(100, Timer, 2);
   }
   else if(value==2)
   {
     capturerScene(etat.capture2, 0, 0);
     creerModifications();
     glutDisplayFunc(display);
     glutIdleFunc(display);
     glutTimerFunc(100, Timer, 3);
   }
   else if(value==3)
   {
     capturerScene(etat.capture3, 0, 0);
     glutDisplayFunc(displayPOV2);
     glutIdleFunc(displayPOV2);
     glutTimerFunc(100, Timer, 4);
   }
   else if(value==4)
   {
    capturerScene(etat.capture4, 0, 0);
    glutTimerFunc(100, Timer, 5);
   }
   else if(value==5)
   {
    glutDestroyWindow(glutGetWindow());
    deleteGlobalVec();
   }

}

void init(void)
{
    // turn on depth test
    glEnable(GL_DEPTH_TEST);
    glDepthFunc(GL_LESS);

    glClearColor(0.1f, 0.1f, 0.1f, 1.0f);
}

int main( int argc, char *argv[] )
{   
    if (argc != 5 )
        {
            cerr << "Erreur: Nombre invalid de parametres!\n";
            cerr << "Template: main.exe theme 15 as nomFicher\n";
            return 1;
	    }
    else {
        creerEtat(argv, etat);
        if (etat.theme == "theme"){
            if(etat.nombreFormes >= 10 && etat.nombreFormes <= 200){
                srand(time(NULL));
                glutInit( &argc, argv );
                glutInitDisplayMode( GLUT_RGBA | GLUT_DEPTH | GLUT_DOUBLE );
                glutInitWindowSize( windowWidth, windowHeight );
                glutCreateWindow( "LOG2990 - AQUALAND" );

                init();
                makeScene();
                

                glutDisplayFunc( display );
                glutIdleFunc( display );
                glutTimerFunc(500, Timer, 0);
                glEnable( GL_DEPTH_TEST );

                // set up "headlamp"-like light
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
            else {
                cerr << "Erreur: Il faut choisir entre 10 et 200 formes thematiques.\n";
                return 1;
            }
        }
    }
    return 0;
}