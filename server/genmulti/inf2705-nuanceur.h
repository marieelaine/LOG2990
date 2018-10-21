#ifndef INF2705_NUANCEUR_H
#define INF2705_NUANCEUR_H

////////////////////////////////////////////////////////////////////////////
//
// Classe pour charger les nuanceurs
//						(INF2705, Benoît Ozell)
////////////////////////////////////////////////////////////////////////////

#include <GL/glew.h>
#include <iostream>
#include <string.h>
#include <errno.h>
#include <fstream>
#include <sstream>

class ProgNuanceur
{
public:
   ProgNuanceur( ) : prog_(0), etiquette_("vide") { }
   ~ProgNuanceur( ) { /* glDeleteShader(); */ glDeleteProgram( prog_ ); }
   operator GLuint() const { return prog_; }
   ProgNuanceur& operator=( GLuint prog ) { prog_ = prog; return *this; }

   // Demander à OpenGL de créer un programme de nuanceur
   void creer( const std::string etiquette = "" )
   {
      if ( prog_ ) glDeleteProgram( prog_ );
      prog_ = glCreateProgram();
      etiquette_ = etiquette;
      if ( etiquette_ == "" ) { std::ostringstream oss; oss << prog_; etiquette_ += oss.str(); }
   }

   // Charger en mémoire le contenu du fichier
   static const GLchar *lireNuanceur( const GLchar *fich )
   {
      // Ouvrir le fichier
      std::ifstream fichier( fich );
      if ( fichier.fail() )
      {
         std::cerr << "!!! " << fich << ": " << strerror(errno) << std::endl;
         return NULL;
      }

      // Lire le fichier
      std::stringstream contenuFichier;
      contenuFichier << fichier.rdbuf();
      fichier.close();

      // Obtenir le contenu du fichier
      std::string contenu = contenuFichier.str();
      const int taille = contenu.size();

      // Retourner une chaîne pour le nuanceur
      char *source = new char[taille+1];
      strcpy( source, contenu.c_str() );
      return source;
   }

   // Afficher le log de la compilation
   static bool afficherLogCompile( GLuint nuanceurObj )
   {
      // afficher le message d'erreur, le cas échéant
      int infologLength = 0;
      glGetShaderiv( nuanceurObj, GL_INFO_LOG_LENGTH, &infologLength );
      if ( infologLength > 1 )
      {
         char* infoLog = new char[infologLength+1];
         int charsWritten = 0;
         glGetShaderInfoLog( nuanceurObj, infologLength, &charsWritten, infoLog );
         std::cout << std::endl << infoLog << std::endl;
         delete[] infoLog;
         return( false );
      }
      return( true );
   }

   // Compiler et attacher le nuanceur
   bool attacher( GLuint type, GLsizei nbChaine, const GLchar **chaines, const GLint *longueur = NULL )
   {
      GLuint nuanceurObj = glCreateShader( type );
      glShaderSource( nuanceurObj, nbChaine, chaines, longueur );
      glCompileShader( nuanceurObj );
      glAttachShader( prog_, nuanceurObj );
      return ( afficherLogCompile(nuanceurObj) );
   }
   bool attacher( GLuint type, const GLchar *fich )
   {
      bool rc = false;
      const GLchar *fichChaine = lireNuanceur( fich );
      if ( fichChaine != NULL )
      {
         rc = attacher( type, 1, &fichChaine, NULL );
         delete [] fichChaine;
      }
      return( rc );
   }
   bool attacher( GLuint type, const GLchar *preambule, const GLchar *fich )
   {
      bool rc = false;
      if ( fich == NULL ) // le nuanceur complet est dans le préambule
         rc = attacher( type, 1, &preambule, NULL );
      else
      {
         const GLchar *chaines[2] = { preambule, lireNuanceur( fich ) };
         if ( chaines[1] != NULL )
         {
            rc = attacher( type, 2, chaines, NULL );
            delete [] chaines[1];
         }
      }
      return( rc );
   }
   bool attacher( GLuint type, const std::string preambule, const GLchar *fich )
   { return attacher( type, preambule.c_str(), fich ); }

   // Afficher le log de l'édition des liens
   static bool afficherLogLink( GLuint progObj )
   {
      // afficher le message d'erreur, le cas échéant
      int infologLength = 0;
      glGetProgramiv( progObj, GL_INFO_LOG_LENGTH, &infologLength );
      if ( infologLength > 1 )
      {
         char* infoLog = new char[infologLength+1];
         int charsWritten = 0;
         glGetProgramInfoLog( progObj, infologLength, &charsWritten, infoLog );
         std::cout << "progObj" << std::endl << infoLog << std::endl;
         delete[] infoLog;
         return( false );
      }
      return( true );
   }

   // Faire l'édition des liens du programme
   bool lier( )
   {
      glLinkProgram( prog_ );
      return( afficherLogLink(prog_) );
   }

   // le nuanceur de sommets minimal
   static const GLchar *chainesSommetsMinimal;
   // le nuanceur de fragments minimal
   static const GLchar *chainesFragmentsMinimal;

private:
   GLuint prog_; // LE programme
   std::string etiquette_; // une étiquette pour identifier le programme
};

// le nuanceur de sommets minimal
const GLchar *ProgNuanceur::chainesSommetsMinimal =
{
   "#version 410\n"
   "uniform mat4 matrModel;\n"
   "uniform mat4 matrVisu;\n"
   "uniform mat4 matrProj;\n"
   "layout(location=0) in vec4 Vertex;\n"
   "layout(location=3) in vec4 Color;\n"
   "out vec4 couleur;\n"
   "void main( void )\n"
   "{\n"
   "   // transformation standard du sommet\n"
   "   gl_Position = matrProj * matrVisu * matrModel * Vertex;\n"
   "   // couleur du sommet\n"
   "   couleur = Color;\n"
   "}\n"
};
// le nuanceur de fragments minimal
const GLchar *ProgNuanceur::chainesFragmentsMinimal =
{
   "#version 410\n"
   "in vec4 couleur;\n"
   "out vec4 FragColor;\n"
   "void main( void )\n"
   "{\n"
   "   // la couleur du fragment est la couleur interpolée\n"
   "   FragColor = couleur;\n"
   "}\n"
};

#endif

