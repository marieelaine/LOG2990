#ifndef INF2705_MATRICE_H
#define INF2705_MATRICE_H

////////////////////////////////////////////////////////////////////////////
//
// Classe pour les matrices du pipeline
//						(INF2705, Benoît Ozell)
////////////////////////////////////////////////////////////////////////////

#include <GL/glew.h>
#include <iostream>

#include "glm/detail/setup.hpp"
// Avant glm 9.9, il faut définir cette constante pour indiquer que les paramètres des fonctions sont donnés en radians
#if GLM_VERSION_MINOR < 9
# define GLM_FORCE_RADIANS 1
#endif
// Selon la version de glm, on inodique qu'on veut avoir accès aux fonctions swizzle
#if GLM_VERSION_MINOR < 8
# define GLM_SWIZZLE
#else
# define GLM_FORCE_SWIZZLE
#endif
// À partir de glm 9.9, il faut définir cette constante pour utiliser les extensions « expérimentales »
#if GLM_VERSION_MINOR >= 9
# define GLM_ENABLE_EXPERIMENTAL 1
#endif

#include <glm/glm.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtx/string_cast.hpp>
#include <stack>

class MatricePipeline
{
public:
   MatricePipeline()
   { matr_.push( glm::mat4(1.0) ); }

   operator glm::mat4() const { return matr_.top(); }
   operator const GLfloat*() const { return glm::value_ptr(matr_.top()); }

   void LoadIdentity()
   { matr_.top() = glm::mat4(1.0); }
   // Note: la librairie glm s’occupe de convertir les glm::vec3 en glm::vec4 pour la multiplication par glm::mat4 matr_.
   void Scale( GLfloat sx, GLfloat sy, GLfloat sz )
   { matr_.top() = glm::scale( matr_.top(), glm::vec3(sx,sy,sz) ); }
   void Translate( GLfloat tx, GLfloat ty, GLfloat tz )
   { matr_.top() = glm::translate( matr_.top(), glm::vec3(tx,ty,tz) ); }
   void Rotate( GLfloat angle, GLfloat x, GLfloat y, GLfloat z )
   { matr_.top() = glm::rotate( matr_.top(), (GLfloat)glm::radians(angle), glm::vec3(x,y,z) ); }

   void LookAt( GLdouble obsX, GLdouble obsY, GLdouble obsZ, GLdouble versX, GLdouble versY, GLdouble versZ, GLdouble upX, GLdouble upY, GLdouble upZ )
   { matr_.top() = glm::lookAt( glm::vec3( obsX, obsY, obsZ ), glm::vec3( versX, versY, versZ ), glm::vec3( upX, upY, upZ ) ); }
   void Frustum( GLdouble gauche, GLdouble droite, GLdouble bas, GLdouble haut, GLdouble planAvant, GLdouble planArriere )
   { matr_.top() = glm::frustum( gauche, droite, bas, haut, planAvant, planArriere ); }
   void Perspective( GLdouble fovy, GLdouble aspect, GLdouble planAvant, GLdouble planArriere )
   { matr_.top() = glm::perspective( glm::radians(fovy), aspect, planAvant, planArriere );}
   void Ortho( GLdouble gauche, GLdouble droite, GLdouble bas, GLdouble haut, GLdouble planAvant, GLdouble planArriere )
   { matr_.top() = glm::ortho( gauche, droite, bas, haut, planAvant, planArriere ); }
   void Ortho2D( GLdouble gauche, GLdouble droite, GLdouble bas, GLdouble haut )
   { matr_.top() = glm::ortho( gauche, droite, bas, haut ); }

   void PushMatrix()
   { matr_.push( matr_.top() ); }
   void PopMatrix()
   { matr_.pop(); }

   glm::mat4 getMatr()
   { return matr_.top(); }
   glm::mat4 setMatr( glm::mat4 m )
   { return( matr_.top() = m ); }

   friend std::ostream& operator<<( std::ostream& o, const MatricePipeline& mp )
   {
      //return o << glm::to_string(mp.matr_.top());
      glm::mat4 m = mp.matr_.top(); //o.precision(3); o.width(6);
      return o << std::endl
               << "   " << m[0][0] << " " << m[1][0] << " " << m[2][0] << " " << m[3][0] << std::endl
               << "   " << m[0][1] << " " << m[1][1] << " " << m[2][1] << " " << m[3][1] << std::endl
               << "   " << m[0][2] << " " << m[1][2] << " " << m[2][2] << " " << m[3][2] << std::endl
               << "   " << m[0][3] << " " << m[1][3] << " " << m[2][3] << " " << m[3][3] << std::endl;
   }

private:
   std::stack<glm::mat4> matr_;
};

#endif

