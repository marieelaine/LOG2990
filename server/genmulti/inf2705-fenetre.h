#ifndef INF2705_FENETRE_H
#define INF2705_FENETRE_H

////////////////////////////////////////////////////////////////////////////
//
// Classe pour créer une fenêtre
//						(INF2705, Benoît Ozell)
////////////////////////////////////////////////////////////////////////////

#include <GL/glew.h>
#include <iostream>
#include <fstream>
#include <sstream>

#if defined(FENETRE_glfw3)
# include <GLFW/glfw3.h>
#else
# include <SDL.h>
#endif
#include <string.h>
#include <stdlib.h>

typedef enum {
#if defined(FENETRE_glfw3)

   TP_ECHAP         = GLFW_KEY_ESCAPE,
   TP_BAS           = GLFW_KEY_UP,
   TP_HAUT          = GLFW_KEY_DOWN,
   TP_PAGEPREC      = GLFW_KEY_PAGE_UP,
   TP_PAGESUIV      = GLFW_KEY_PAGE_DOWN,
   TP_DEBUT         = GLFW_KEY_HOME,
   TP_FIN           = GLFW_KEY_END,
   TP_EGAL          = '=', // GLFW_KEY_EQUALS,
   TP_SUPERIEUR     = '>', // GLFW_KEY_GREATER,
   TP_INFERIEUR     = '<', // GLFW_KEY_LESS,
   TP_DROITE        = GLFW_KEY_RIGHT,
   TP_GAUCHE        = GLFW_KEY_LEFT,
   TP_PLUS          = '+', // GLFW_KEY_PLUS,
   TP_MOINS         = GLFW_KEY_MINUS,
   TP_CROCHETDROIT  = GLFW_KEY_RIGHT_BRACKET,
   TP_CROCHETGAUCHE = GLFW_KEY_LEFT_BRACKET,
   TP_POINT         = GLFW_KEY_PERIOD,
   TP_VIRGULE       = GLFW_KEY_COMMA,
   TP_POINTVIRGULE  = GLFW_KEY_SEMICOLON,
   TP_BARREOBLIQUE  = GLFW_KEY_SLASH,
   TP_ESPACE        = GLFW_KEY_SPACE,
   TP_SOULIGNE      = '_', // GLFW_KEY_UNDERSCORE,

   TP_0 = GLFW_KEY_0,
   TP_1 = GLFW_KEY_1,
   TP_2 = GLFW_KEY_2,
   TP_3 = GLFW_KEY_3,
   TP_4 = GLFW_KEY_4,
   TP_5 = GLFW_KEY_5,
   TP_6 = GLFW_KEY_6,
   TP_7 = GLFW_KEY_7,
   TP_8 = GLFW_KEY_8,
   TP_9 = GLFW_KEY_9,

   TP_a = GLFW_KEY_A,
   TP_b = GLFW_KEY_B,
   TP_c = GLFW_KEY_C,
   TP_d = GLFW_KEY_D,
   TP_e = GLFW_KEY_E,
   TP_f = GLFW_KEY_F,
   TP_g = GLFW_KEY_G,
   TP_h = GLFW_KEY_H,
   TP_i = GLFW_KEY_I,
   TP_j = GLFW_KEY_J,
   TP_k = GLFW_KEY_K,
   TP_l = GLFW_KEY_L,
   TP_m = GLFW_KEY_M,
   TP_n = GLFW_KEY_N,
   TP_o = GLFW_KEY_O,
   TP_p = GLFW_KEY_P,
   TP_q = GLFW_KEY_Q,
   TP_r = GLFW_KEY_R,
   TP_s = GLFW_KEY_S,
   TP_t = GLFW_KEY_T,
   TP_u = GLFW_KEY_U,
   TP_v = GLFW_KEY_V,
   TP_w = GLFW_KEY_W,
   TP_x = GLFW_KEY_X,
   TP_y = GLFW_KEY_Y,
   TP_z = GLFW_KEY_Z,

#else

   TP_ECHAP         = SDLK_ESCAPE,
   TP_BAS           = SDLK_UP,
   TP_HAUT          = SDLK_DOWN,
   TP_PAGEPREC      = SDLK_PAGEUP,
   TP_PAGESUIV      = SDLK_PAGEDOWN,
   TP_DEBUT         = SDLK_HOME,
   TP_FIN           = SDLK_END,
   TP_EGAL          = SDLK_EQUALS,
   TP_SUPERIEUR     = SDLK_GREATER,
   TP_INFERIEUR     = SDLK_LESS,
   TP_DROITE        = SDLK_RIGHT,
   TP_GAUCHE        = SDLK_LEFT,
   TP_PLUS          = SDLK_PLUS,
   TP_MOINS         = SDLK_MINUS,
   TP_CROCHETDROIT  = SDLK_RIGHTBRACKET,
   TP_CROCHETGAUCHE = SDLK_LEFTBRACKET,
   TP_POINT         = SDLK_PERIOD,
   TP_VIRGULE       = SDLK_COMMA,
   TP_POINTVIRGULE  = SDLK_SEMICOLON,
   TP_BARREOBLIQUE  = SDLK_SLASH,
   TP_ESPACE        = SDLK_SPACE,
   TP_SOULIGNE      = SDLK_UNDERSCORE,

   TP_0 = SDLK_0,
   TP_1 = SDLK_1,
   TP_2 = SDLK_2,
   TP_3 = SDLK_3,
   TP_4 = SDLK_4,
   TP_5 = SDLK_5,
   TP_6 = SDLK_6,
   TP_7 = SDLK_7,
   TP_8 = SDLK_8,
   TP_9 = SDLK_9,

   TP_a = SDLK_a,
   TP_b = SDLK_b,
   TP_c = SDLK_c,
   TP_d = SDLK_d,
   TP_e = SDLK_e,
   TP_f = SDLK_f,
   TP_g = SDLK_g,
   TP_h = SDLK_h,
   TP_i = SDLK_i,
   TP_j = SDLK_j,
   TP_k = SDLK_k,
   TP_l = SDLK_l,
   TP_m = SDLK_m,
   TP_n = SDLK_n,
   TP_o = SDLK_o,
   TP_p = SDLK_p,
   TP_q = SDLK_q,
   TP_r = SDLK_r,
   TP_s = SDLK_s,
   TP_t = SDLK_t,
   TP_u = SDLK_u,
   TP_v = SDLK_v,
   TP_w = SDLK_w,
   TP_x = SDLK_x,
   TP_y = SDLK_y,
   TP_z = SDLK_z,

#endif
} TP_touche;

typedef enum {
#if defined(FENETRE_glfw3)
   TP_BOUTON_GAUCHE = GLFW_MOUSE_BUTTON_1,
   TP_BOUTON_MILIEU = GLFW_MOUSE_BUTTON_3,
   TP_BOUTON_DROIT  = GLFW_MOUSE_BUTTON_2,
   TP_RELACHE       = GLFW_RELEASE,
   TP_PRESSE        = GLFW_PRESS,
#else
   TP_BOUTON_GAUCHE = SDL_BUTTON_LEFT,
   TP_BOUTON_MILIEU = SDL_BUTTON_MIDDLE,
   TP_BOUTON_DROIT  = SDL_BUTTON_RIGHT,
   TP_RELACHE       = SDL_RELEASED,
   TP_PRESSE        = SDL_PRESSED,
#endif
} TP_bouton;


// la fenêtre graphique
class FenetreTP
{
#if defined(FENETRE_glfw3)
   static void key_callback( GLFWwindow* window, int key, int scancode, int action, int mods )
   {
      FenetreTP *fen = (FenetreTP*) glfwGetWindowUserPointer( window );
      if ( action == GLFW_PRESS )
         fen->clavier( (TP_touche) key );
   }
   static void mouse_button_callback( GLFWwindow* window, int button, int action, int mods )
   {
      FenetreTP *fen = (FenetreTP*) glfwGetWindowUserPointer( window );
      double xpos, ypos; glfwGetCursorPos( window, &xpos, &ypos );
      fen->sourisClic( button, action, xpos, ypos );
   }
   static void cursor_position_callback( GLFWwindow* window, double xpos, double ypos )
   {
      FenetreTP *fen = (FenetreTP*) glfwGetWindowUserPointer( window );
      fen->sourisMouvement( xpos, ypos );
   }
   static void scroll_callback( GLFWwindow* window, double xoffset, double yoffset )
   {
      FenetreTP *fen = (FenetreTP*) glfwGetWindowUserPointer( window );
      fen->sourisMolette( xoffset, yoffset );
   }
   static void window_refresh_callback( GLFWwindow* window )
   {
      FenetreTP *fen = (FenetreTP*) glfwGetWindowUserPointer( window );
      // int left, top, right, bottom;
      // glfwGetWindowFrameSize( window, &left, &top, &right, &bottom );
      // fen->redimensionner( right-left, top-bottom );
      int width, height;
      glfwGetWindowSize( window, &width, &height );
      fen->redimensionner( width, height );
      fen->afficherScene();
      fen->swap();
   }
   static void window_size_callback( GLFWwindow* window, int width, int height )
   {
      FenetreTP *fen = (FenetreTP*) glfwGetWindowUserPointer( window );
      fen->redimensionner( width, height );
      fen->afficherScene();
      fen->swap();
   }
#else
   // vérifier les erreurs
   static void verifierErreurSDL( int line = -1 )
   {
      const char *sdlerror = SDL_GetError();
      if ( *sdlerror != '\0' )
      {
         std::cout << "SDL Error: " << sdlerror << std::endl;
         if ( line != -1 )
            std::cout << "line: " << line;
         std::cout << std::endl;
         SDL_ClearError();
      }
   }
#endif

public:
   FenetreTP( std::string nom = "INF2705 TP",
              int largeur = 900, int hauteur = 600,
              int xpos = 100, int ypos = 100 )
      : fenetre_(NULL),
#if defined(FENETRE_glfw3)
#else
        contexte_(NULL),
#endif
        largeur_(largeur), hauteur_(hauteur)
   {
#if defined(FENETRE_glfw3)
      // initialiser GLFW
      if ( !glfwInit() )
      {
         mourir( "ERREUR: Incapable d'initialiser GLFW3\n");
      }

      // demander certaines caractéristiques:
      glfwWindowHint( GLFW_RED_BITS, 8 );
      glfwWindowHint( GLFW_GREEN_BITS, 8 );
      glfwWindowHint( GLFW_BLUE_BITS, 8 );
      glfwWindowHint( GLFW_ALPHA_BITS, 8 );
      //glfwWindowHint( GLFW_DOUBLEBUFFER, GL_TRUE );
      glfwWindowHint( GLFW_DEPTH_BITS, 24 );
      glfwWindowHint( GLFW_STENCIL_BITS, 8 );
#if defined( __APPLE__ )
      glfwWindowHint( GLFW_CONTEXT_VERSION_MAJOR, 4 );
      glfwWindowHint( GLFW_CONTEXT_VERSION_MINOR, 1 );
      glfwWindowHint( GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE );
      glfwWindowHint( GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE );
#endif

      // créer la fenêtre
      fenetre_ = glfwCreateWindow( largeur, hauteur, nom.c_str(), NULL, NULL );
      if ( !fenetre_ )
      {
         mourir( "ERROR: Incapable de créer la fenêtre GLFW3\n");
      }
      glfwMakeContextCurrent( fenetre_ );
      glfwSwapInterval( 1 );

      glfwSetWindowUserPointer( fenetre_, this );
      glfwSetKeyCallback( fenetre_, key_callback );
      glfwSetMouseButtonCallback( fenetre_, mouse_button_callback );
      glfwSetCursorPosCallback( fenetre_, cursor_position_callback );
      glfwSetScrollCallback( fenetre_, scroll_callback );
      glfwSetWindowRefreshCallback( fenetre_, window_refresh_callback );
      glfwSetWindowSizeCallback( fenetre_, window_size_callback );
#else
      // initialiser SDL
      const Uint32 flags = SDL_INIT_VIDEO | SDL_INIT_EVENTS;
      if ( SDL_WasInit( flags ) == 0 )
      {
         if ( SDL_Init( flags ) < 0 ) mourir( "ERREUR: Incapable d'initialiser SDL" );
         atexit( SDL_Quit );
      }

      // demander certaines caractéristiques: https://wiki.libsdl.org/SDL_GL_SetAttribute
      SDL_GL_SetAttribute( SDL_GL_RED_SIZE, 8 );
      SDL_GL_SetAttribute( SDL_GL_GREEN_SIZE, 8 );
      SDL_GL_SetAttribute( SDL_GL_BLUE_SIZE, 8 );
      SDL_GL_SetAttribute( SDL_GL_ALPHA_SIZE, 8 );
      //SDL_GL_SetAttribute( SDL_GL_DOUBLEBUFFER, 1 );
      SDL_GL_SetAttribute( SDL_GL_DEPTH_SIZE, 24 );
      SDL_GL_SetAttribute( SDL_GL_STENCIL_SIZE, 8 );
      SDL_GL_SetAttribute( SDL_GL_MULTISAMPLEBUFFERS, 1 );
      SDL_GL_SetAttribute( SDL_GL_MULTISAMPLESAMPLES, 4 );
      //SDL_GL_SetAttribute( SDL_GL_ACCELERATED_VISUAL, 1 );
#if 1
      SDL_GL_SetAttribute( SDL_GL_CONTEXT_PROFILE_MASK, SDL_GL_CONTEXT_PROFILE_CORE );
      //SDL_GL_SetAttribute( SDL_GL_CONTEXT_PROFILE_MASK, SDL_GL_CONTEXT_PROFILE_COMPATIBILITY );
      SDL_GL_SetAttribute( SDL_GL_CONTEXT_MAJOR_VERSION, 4 );
      SDL_GL_SetAttribute( SDL_GL_CONTEXT_MINOR_VERSION, 1 );
#endif
      //SDL_SetHint( "SDL_RENDERER_PRESENTVSYNC", "1" );
      //SDL_GL_SetSwapInterval( 1 );

      // créer la fenêtre
      fenetre_ = SDL_CreateWindow( nom.c_str(), xpos, ypos, largeur, hauteur,
                                   SDL_WINDOW_OPENGL | SDL_WINDOW_RESIZABLE );
      if ( !fenetre_ ) mourir( "ERREUR: Incapable de créer la fenêtre SDL" );
      verifierErreurSDL(__LINE__);

      // créer le contexte OpenGL
      contexte_ = SDL_GL_CreateContext( fenetre_ );
      verifierErreurSDL(__LINE__);

      // s'assurer que les réaffichage seront synchronisés avec le rafraîchissement de l'écran
      SDL_GL_SetSwapInterval( 1 );
      verifierErreurSDL(__LINE__);
#endif

      // initiliaser GLEW
      initialiserGLEW( );

      // imprimer un peu d'information OpenGL
      imprimerInfosGL( );
   }

   void quit( )
   {
#if defined(FENETRE_glfw3)
      glfwDestroyWindow( fenetre_ );
      glfwTerminate();
      exit(0);
#else
      SDL_Event sdlevent; sdlevent.type = SDL_QUIT;
      SDL_PushEvent( &sdlevent );
#endif
   }

   ~FenetreTP( )
   {
#if defined(FENETRE_glfw3)
      quit();
#else
      SDL_GL_DeleteContext( contexte_ ); contexte_ = NULL;
      SDL_DestroyWindow( fenetre_ ); fenetre_ = NULL;
#endif
   }

   // mettre à jour la fenêtre OpenGL: le tampon arrière devient le tampon avant et vice-versa
   void swap( )
   {
#if defined(FENETRE_glfw3)
      glfwSwapBuffers( fenetre_ );
#else
      SDL_GL_SwapWindow( fenetre_ );
#endif
   }

   // fonction pour allouer les ressources
   void initialiser( );
   // fonction pour détruire les ressources OpenGL allouées
   void conclure( );
   // fonction appelée pour tracer la scène
   void afficherScene( int index);
   // fonction appelée lors d'un événement de redimensionnement
   void redimensionner( GLsizei w, GLsizei h );
   // fonction appelée lors d'un événement de clavier
   void clavier( TP_touche touche );
   // fonctions appelées lors d'un événement de souris
   void sourisClic( int button, int state, int x, int y );
   void sourisMolette( int x, int y );
   void sourisMouvement( int x, int y );

   // fonction de gestion de la boucle des événements
   bool gererEvenement( )
   {
#if defined(FENETRE_glfw3)
      glfwPollEvents();
      return( !glfwWindowShouldClose( fenetre_ ) );
#else
      SDL_Event e;
      while ( SDL_PollEvent( &e ) )
      {
         switch ( e.type )
         {
         case SDL_QUIT: // c'est la fin
            return( false );
            break;
         case SDL_WINDOWEVENT:
            if ( e.window.event == SDL_WINDOWEVENT_SIZE_CHANGED ) // redimensionnement
            {
               largeur_ = e.window.data1;
               hauteur_ = e.window.data2;
               redimensionner( largeur_, hauteur_ );
            }
            else if ( e.window.event == SDL_WINDOWEVENT_SHOWN ) // affichage
            {
               SDL_GetWindowSize( fenetre_, &largeur_, &hauteur_ );
               redimensionner( largeur_, hauteur_ );
            }
            //else
            //   std::cout << "//@FenetreTP,WINDOWEVENT;" << " e.window.event=" << e.window.event << std::endl;
            break;
         case SDL_KEYDOWN: // une touche est pressée
            clavier( (TP_touche) e.key.keysym.sym );
            break;
            
         case SDL_KEYUP: // une touche est relâchée

         default:
            //std::cerr << "//@FenetreTP," << __LINE__ << ";" << " e.type=" << e.type << std::endl;
            break;
         }
      }
      return( true );
#endif
   }

   //
   // Quelques fonctions utilitaires
   //

   // Obtenir le temps depuis l'initialisation (en millisecondes)
   static int obtenirTemps( )
   {
      int temps = 0;
#if defined(FENETRE_glfw3)
      temps = 1000 * glfwGetTime();
#else
      temps = SDL_GetTicks();
#endif
      return temps;
   }


   // Charger en mémoire le contenu du fichier
   static void imprimerTouches( )
   {
      // Ouvrir le fichier
      std::ifstream fichier( "touches.txt" );
      if ( fichier.fail() ) return;

      // Lire le fichier
      std::stringstream contenuFichier;
      contenuFichier << fichier.rdbuf();
      fichier.close();

      // Ecrire le contenu du fichier
      std::cout << " touches possibles :" << std::endl
                << contenuFichier.str() << std::endl;
   }

   // afficher les versions des éléments du pipeline OpenGL
   static void imprimerInfosGL( const int verbose = 1 )
   {
#define PBYTE(CHAINE) ( (CHAINE) != NULL ? (CHAINE) : (const GLubyte *) "????" )
#define PCHAR(CHAINE) ( (CHAINE) != NULL ? (CHAINE) : (const char *) "????" )

      if ( verbose >= 1 )
      {
#if defined(FENETRE_glfw3)
         int major, minor, rev; glfwGetVersion( &major, &minor, &rev );
         std::cout << "// GLFW   " << major << "." << minor << "." << rev << std::endl;
#else
         SDL_version linked; SDL_GetVersion( &linked );
         std::cout << "// SDL    " << (int) linked.major << "." << (int) linked.minor << "." << (int) linked.patch << std::endl;
#endif

         const GLubyte *glVersion  = glGetString( GL_VERSION );
         const GLubyte *glVendor   = glGetString( GL_VENDOR );
         const GLubyte *glRenderer = glGetString( GL_RENDERER );
         const GLubyte *glslVersion = glGetString( GL_SHADING_LANGUAGE_VERSION );
         std::cout << "// OpenGL " << PBYTE(glVersion) << PBYTE(glVendor) << std::endl;
         std::cout << "// GPU    " << PBYTE(glRenderer) << std::endl;
         std::cout << "// GLSL   " << PBYTE(glslVersion) << std::endl;

         if ( verbose >= 2 )
         {
            const GLubyte *glExtensions  = glGetString( GL_EXTENSIONS );
            std::cout << "// extensions = " << PBYTE(glExtensions) << std::endl;
         }
      }
#undef PBYTE
#undef PCHAR
      return;
   }

   // donner une message et mourir...
   static void mourir( const char *msg )
   {
#if defined(FENETRE_glfw3)
      std::cout << "Je meurs ... : " << msg << " " << std::endl;
      //glfwTerminate();
#else
      const char *sdlerror = SDL_GetError();
      std::cout << "Je meurs ... : " << msg << " " << sdlerror << std::endl;
      SDL_Quit();
#endif
      exit(1);
   }

   // La fonction glGetError() permet de savoir si une erreur est survenue depuis le dernier appel à cette fonction.
   static int VerifierErreurGL( const std::string message )
   {
      int rc = 0;
      GLenum err;
      while ( ( err = glGetError() ) != GL_NO_ERROR )
      {
         std::cerr << "Erreur OpenGL, " << message << " " << std::endl;
         switch ( err )
         {
         case GL_INVALID_ENUM:
            std::cerr << "GL_INVALID_ENUM: Valeur d'une énumération hors limite.";
            break;
         case GL_INVALID_VALUE:
            std::cerr << "GL_INVALID_VALUE: Valeur numérique hors limite.";
            break;
         case GL_INVALID_OPERATION:
            std::cerr << "GL_INVALID_OPERATION: Opération non permise dans l'état courant.";
            break;
         case GL_INVALID_FRAMEBUFFER_OPERATION:
            std::cerr << "GL_INVALID_FRAMEBUFFER_OPERATION: L'objet est incomplet.";
            break;
         case GL_OUT_OF_MEMORY:
            std::cerr << "GL_OUT_OF_MEMORY: Pas assez de mémoire pour exécuter la commande.";
            break;
         case GL_STACK_UNDERFLOW:
            std::cerr << "GL_STACK_UNDERFLOW: Une opération entraînerait un débordement de pile interne.";
            break;
         case GL_STACK_OVERFLOW:
            std::cerr << "GL_STACK_OVERFLOW: Une opération entraînerait un débordement de pile interne.";
            break;
         default:
            std::cerr << "err = " << err << ": Erreur inconnue!";
            break;
         }
         std::cerr << std::endl;
         ++rc;
      }
      return( rc );
   }

   // La fonction afficherAxes affiche des axes qui représentent l'orientation courante du repère
   // Les axes sont colorés ainsi: X = Rouge, Y = Vert, Z = Bleu
   static void afficherAxes( const GLfloat longueurAxe = 1.0, const GLfloat largeurLigne = 2.0 )
   {
#if !defined( __APPLE__ )
      GLfloat largeurPrec=1.; glGetFloatv( GL_LINE_WIDTH, &largeurPrec );
      glLineWidth( largeurLigne );
#endif
      const GLfloat coo[] = { 0., 0., 0., longueurAxe, 0., 0.,
                              0., 0., 0., 0., longueurAxe, 0.,
                              0., 0., 0., 0., 0., longueurAxe };
      const GLfloat couleur[] = { 1., 0., 0., 1., 0., 0.,
                                  0., 1., 0., 0., 1., 0.,
                                  0., 0., 1., 0., 0., 1. };

      static GLuint vao = 0;
      static GLuint vbo[2];
      if ( vao == 0 )
      {
         glGenVertexArrays( 1, &vao );
         glGenBuffers( 2, vbo );
      }

      glBindVertexArray( vao );

      const GLint locVertex = 0;
      glBindBuffer( GL_ARRAY_BUFFER, vbo[0] );
      glBufferData( GL_ARRAY_BUFFER, sizeof(coo), coo, GL_STATIC_DRAW );
      glVertexAttribPointer( locVertex, 3, GL_FLOAT, GL_FALSE, 0, 0 );
      glEnableVertexAttribArray(locVertex);

      const GLint locColor = 3;
      glBindBuffer( GL_ARRAY_BUFFER, vbo[1] );
      glBufferData( GL_ARRAY_BUFFER, sizeof(couleur), couleur, GL_STATIC_DRAW );
      glVertexAttribPointer( locColor, 3, GL_FLOAT, GL_FALSE, 0, 0 );
      glEnableVertexAttribArray(locColor);

      glDrawArrays( GL_LINES, 0, 6 );

      glBindVertexArray( 0 );
#if !defined( __APPLE__ )
      glLineWidth( largeurPrec );
#endif
      return;
   }

private:
   void initialiserGLEW( )
   {
      //#if defined(_GLEW_H__)
      glewExperimental = GL_TRUE;
      GLenum rev = glewInit();
      if ( rev != GLEW_OK )
      {
         std::cout << "Error: " << glewGetErrorString(rev) << std::endl;
         exit( 1 );
      }
      glGetError(); // Afin d'ignorer l'erreur générée par GLEW. Voir https://www.opengl.org/wiki/OpenGL_Loading_Library#GLEW_.28OpenGL_Extension_Wrangler.29
      //#endif
   }

#if defined(FENETRE_glfw3)
   GLFWwindow *fenetre_;
#else
   SDL_Window *fenetre_;
   SDL_GLContext contexte_;
#endif
   GLsizei largeur_; // la largeur de la fenêtre
   GLsizei hauteur_; // la hauteur de la fenêtre
};

#endif

