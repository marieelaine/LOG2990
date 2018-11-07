#include <GL/glut.h>
#include <glm/glm.hpp>
#define GLM_ENABLE_EXPERIMENTAL 
#include <glm/gtx/component_wise.hpp>
#include <vector>
#include <iostream>
#include <fstream>
#include <sstream>
#include <math.h>
#include "FreeImage.h"

using namespace std;

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

int callRandomAngle(int start)
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

// based on:
// https://stackoverflow.com/questions/14887012/object-loader-in-opengl
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

int btn;
glm::ivec2 startMouse;
glm::ivec2 startRot, curRot;
glm::ivec2 startTrans, curTrans;
void mouse(int button, int state, int x, int y )
{
    if( button == GLUT_LEFT_BUTTON && state == GLUT_DOWN )
    {
        btn = button;
        startMouse = glm::ivec2( x, glutGet( GLUT_WINDOW_HEIGHT ) - y );
        startRot = curRot;
    }
    if( button == GLUT_RIGHT_BUTTON && state == GLUT_DOWN )
    {
        btn = button;
        startMouse = glm::ivec2( x, glutGet( GLUT_WINDOW_HEIGHT ) - y );
        startTrans = curTrans;
    }
}

void motion( int x, int y )
{
    glm::ivec2 curMouse( x, glutGet( GLUT_WINDOW_HEIGHT ) - y );
    if( btn == GLUT_LEFT_BUTTON )
    {
        curRot = startRot + ( curMouse - startMouse );
    }
    else if( btn == GLUT_RIGHT_BUTTON )
    {
        curTrans = startTrans + ( curMouse - startMouse );
    }
    glutPostRedisplay();
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

vector< Vertex > sand;
vector< Vertex > chest;
vector < themeObject > globalVec;
void display()
{
    glClearColor( 0.2f, 0.2f, 0.2f, 1.0f );
    glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

    glMatrixMode( GL_PROJECTION );
    glLoadIdentity();
    double w = 640;
    double h = 480;
    double ar = w / h;
    glTranslatef( curTrans.x / w * 2, curTrans.y / h * 2, 0 );
    gluPerspective( 60, ar, 4, 100 );

    glMatrixMode( GL_MODELVIEW );
    glLoadIdentity();
    glTranslatef( 0, -2, -20 );

    for(vector<themeObject>::iterator vec = globalVec.begin(); vec != globalVec.end(); ++vec){
        glPushMatrix();
        {
            glRotatef( curRot.x % 360, 0, 1, 0 );
            glRotatef( -curRot.y % 360, 1, 0, 0 );

            bindModel(*vec);
        }
        glPopMatrix();
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
            callRandomAngle(320), callRandom(), 0, 0,
            callRandomPosition(-3,3), 5, callRandomPosition(-3,3),
            size
        };
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
    }
    else if (type == "chest") { 
        object = {
            type,
            model,
            71, 55, 10,
            0, 0, 0, 0,
            -7, -1.05, callRandomPosition(-7,7),
            size
        };
    }
    else if (type == "coral") { 
        object = {
            type,
            model,
            callRandomColor(), callRandomColor(), callRandomColor(),
            0, 0, 0, 0,
            -1, 0.1, callRandomPosition(-7,7),
            size
        };
    }
    else if (type == "coral2") { 
        object = {
            type,
            model,
            callRandomColor(), callRandomColor(), callRandomColor(),
            callRandomAngle(270), callRandom(), 0, 0,
            -1, 0.1, callRandomPosition(-7,7),
            size
        };
    }
    else if (type == "crab") { 
        object = {
            type,
            model,
            226, 57, 31,
            callRandomAngle(270), callRandom(), 0, 0,
            callRandomPosition(-7,7), 2, callRandomPosition(-7,7),
            size
        };
    }
    else if (type == "bluewhale") { 
        object = {
            type,
            model,
            52, 118, 163,
            callRandomAngle(300), callRandom(), callRandom(), callRandom(),
            callRandomPosition(-7,7), 5, callRandomPosition(-7,7), 
            size
        };
    }
    else if (type == "starfish") { 
        object = {
            type,
            model,
            209, 156, 33, //or
            callRandomAngle(270), callRandom(), callRandom(), callRandom(),
            callRandomPosition(-7,7), callRandomPosition(2,7), callRandomPosition(-7,7),
            size
        };
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
    }
    else if (type == "squid") { 
        object = {
            type,
            model,
            67, 27, 91,
            callRandomAngle(30), callRandom(), callRandom(), callRandom(),
            callRandomPosition(-7,7), callRandomPosition(2,7), callRandomPosition(-7,7),
            size
        };
    }
    else if (type == "fish") { 
        object = {
            type,
            model,
            232, 127, 16,
            callRandomAngle(270), callRandom(), 0, 0,
            callRandomPosition(-7,7), callRandomPosition(2,7), callRandomPosition(-7,7),
            size
        };
    }
    else if (type == "goldfish") { 
        object = {
            type,
            model,
            0, 127, 16,
            callRandomAngle(270), callRandom(), 0, 0,
            callRandomPosition(-7,7), callRandomPosition(2,7), callRandomPosition(-7,7),
            size
        };
    }
    else if (type == "submarine") { 
        object = {
            type,
            model,
            46, 45, 56,
            callRandomAngle(90), callRandom(), 0, 0,
            callRandomPosition(-7,7), 8, callRandomPosition(-7,7),
            size
        };
    }
    else if (type == "urchin") { 
        object = {
            type,
            model,
            25, 23, 40,
            0, 0, 0, 0,
            callRandomPosition(-7,7), 0, callRandomPosition(-7,7),
            size
        };
    }
    else if (type == "seadiver") { 
        object = {
            type,
            model,
            46, 45, 56,
            270, 1, 0, 0,
            -6, -0.1, callRandomPosition(-7, 7),
            size
        };
    }
    globalVec.push_back(object);
}

void importObject(string file, string type, int size){
    ifstream filestream( file );
    vector<Vertex> model = LoadOBJ( filestream );
    CenterAndScale( &model[0].position, sizeof( Vertex ), model.size(), size );
    createThemeObject(type, model, size);
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
                glutInitWindowSize( 640, 480 );
                glutCreateWindow( "LOG2990 - AQUALAND" );

                importObject("data/obj/island.obj", "island", 20);
                importObject("data/obj/chest.obj", "chest", 2);
                importObject("data/obj/shark.obj", "shark", 3);
                importObject("data/obj/coral.obj", "coral", 1);
                importObject("data/obj/coral2.obj", "coral2", 1);
                importObject("data/obj/starfish.obj", "starfish", 1);
                importObject("data/obj/bluewhale.obj", "bluewhale", 4);
                importObject("data/obj/crab.obj", "crab", 1);
                importObject("data/obj/fish.obj", "fish", 1);
                importObject("data/obj/rocks.obj", "rocks", 4);
                importObject("data/obj/squid.obj", "squid", 2);
                importObject("data/obj/submarine.obj", "submarine", 5);
                importObject("data/obj/urchin.obj", "urchin", 1);
                importObject("data/obj/seashell.obj", "seashell", 1);
                importObject("data/obj/seadiver.obj", "seadiver", 3);
                importObject("data/obj/goldfish.obj", "goldfish", 2);

                glutDisplayFunc( display );
                glutMouseFunc( mouse );
                glutMotionFunc( motion );

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