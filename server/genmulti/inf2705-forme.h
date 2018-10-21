#ifndef INF2705_FORME_H
#define INF2705_FORME_H

////////////////////////////////////////////////////////////////////////////
//
// Fonctions variées pour afficher des formes connues
//						(INF2705, Benoît Ozell)
////////////////////////////////////////////////////////////////////////////

#include <GL/glew.h>
#include <iostream>

#if !defined( __APPLE__ )

/* Copyright (c) Mark J. Kilgard, 1994, 1997. */

/**
   (c) Copyright 1993, Silicon Graphics, Inc.

   ALL RIGHTS RESERVED

   Permission to use, copy, modify, and distribute this software
   for any purpose and without fee is hereby granted, provided
   that the above copyright notice appear in all copies and that
   both the copyright notice and this permission notice appear in
   supporting documentation, and that the name of Silicon
   Graphics, Inc. not be used in advertising or publicity
   pertaining to distribution of the software without specific,
   written prior permission.

   THE MATERIAL EMBODIED ON THIS SOFTWARE IS PROVIDED TO YOU
   "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED OR
   OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY WARRANTY OF
   MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  IN NO
   EVENT SHALL SILICON GRAPHICS, INC.  BE LIABLE TO YOU OR ANYONE
   ELSE FOR ANY DIRECT, SPECIAL, INCIDENTAL, INDIRECT OR
   CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER,
   INCLUDING WITHOUT LIMITATION, LOSS OF PROFIT, LOSS OF USE,
   SAVINGS OR REVENUE, OR THE CLAIMS OF THIRD PARTIES, WHETHER OR
   NOT SILICON GRAPHICS, INC.  HAS BEEN ADVISED OF THE POSSIBILITY
   OF SUCH LOSS, HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
   ARISING OUT OF OR IN CONNECTION WITH THE POSSESSION, USE OR
   PERFORMANCE OF THIS SOFTWARE.

   US Government Users Restricted Rights

   Use, duplication, or disclosure by the Government is subject to
   restrictions set forth in FAR 52.227.19(c)(2) or subparagraph
   (c)(1)(ii) of the Rights in Technical Data and Computer
   Software clause at DFARS 252.227-7013 and/or in similar or
   successor clauses in the FAR or the DOD or NASA FAR
   Supplement.  Unpublished-- rights reserved under the copyright
   laws of the United States.  Contractor/manufacturer is Silicon
   Graphics, Inc., 2011 N.  Shoreline Blvd., Mountain View, CA
   94039-7311.

   OpenGL(TM) is a trademark of Silicon Graphics, Inc.
*/

#include <math.h>
#include <stdio.h>
#include <assert.h>

static GLfloat dodec[20][3];

static void initDodecahedron(void)
{
   GLfloat alpha, beta;

   alpha = sqrt(2.0 / (3.0 + sqrt(5.0)));
   beta = 1.0 + sqrt(6.0 / (3.0 + sqrt(5.0)) - 2.0 + 2.0 * sqrt(2.0 / (3.0 + sqrt(5.0))));
   dodec[0][0] = -alpha; dodec[0][1] = 0; dodec[0][2] = beta;
   dodec[1][0] = alpha; dodec[1][1] = 0; dodec[1][2] = beta;
   dodec[2][0] = -1; dodec[2][1] = -1; dodec[2][2] = -1;
   dodec[3][0] = -1; dodec[3][1] = -1; dodec[3][2] = 1;
   dodec[4][0] = -1; dodec[4][1] = 1; dodec[4][2] = -1;
   dodec[5][0] = -1; dodec[5][1] = 1; dodec[5][2] = 1;
   dodec[6][0] = 1; dodec[6][1] = -1; dodec[6][2] = -1;
   dodec[7][0] = 1; dodec[7][1] = -1; dodec[7][2] = 1;
   dodec[8][0] = 1; dodec[8][1] = 1; dodec[8][2] = -1;
   dodec[9][0] = 1; dodec[9][1] = 1; dodec[9][2] = 1;
   dodec[10][0] = beta; dodec[10][1] = alpha; dodec[10][2] = 0;
   dodec[11][0] = beta; dodec[11][1] = -alpha; dodec[11][2] = 0;
   dodec[12][0] = -beta; dodec[12][1] = alpha; dodec[12][2] = 0;
   dodec[13][0] = -beta; dodec[13][1] = -alpha; dodec[13][2] = 0;
   dodec[14][0] = -alpha; dodec[14][1] = 0; dodec[14][2] = -beta;
   dodec[15][0] = alpha; dodec[15][1] = 0; dodec[15][2] = -beta;
   dodec[16][0] = 0; dodec[16][1] = beta; dodec[16][2] = alpha;
   dodec[17][0] = 0; dodec[17][1] = beta; dodec[17][2] = -alpha;
   dodec[18][0] = 0; dodec[18][1] = -beta; dodec[18][2] = alpha;
   dodec[19][0] = 0; dodec[19][1] = -beta; dodec[19][2] = -alpha;

}

#define DIFF3(_a,_b,_c) {                       \
      (_c)[0] = (_a)[0] - (_b)[0];              \
      (_c)[1] = (_a)[1] - (_b)[1];              \
      (_c)[2] = (_a)[2] - (_b)[2];              \
   }

static void crossprod(GLfloat v1[3], GLfloat v2[3], GLfloat prod[3])
{
   GLfloat p[3];         /* in case prod == v1 or v2 */

   p[0] = v1[1] * v2[2] - v2[1] * v1[2];
   p[1] = v1[2] * v2[0] - v2[2] * v1[0];
   p[2] = v1[0] * v2[1] - v2[0] * v1[1];
   prod[0] = p[0];
   prod[1] = p[1];
   prod[2] = p[2];
}

static void normalize(GLfloat v[3])
{
   GLfloat d;

   d = sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
   if (d == 0.0)
   {
      printf("normalize: zero length vector");
      v[0] = d = 1.0;
   }
   d = 1 / d;
   v[0] *= d;
   v[1] *= d;
   v[2] *= d;
}

static void pentagon(int a, int b, int c, int d, int e, GLenum shadeType)
{
   GLfloat n0[3], d1[3], d2[3];

   DIFF3(dodec[a], dodec[b], d1);
   DIFF3(dodec[b], dodec[c], d2);
   crossprod(d1, d2, n0);
   normalize(n0);

   glBegin(shadeType);
   glNormal3fv(n0);
   glVertex3fv(&dodec[a][0]);
   glVertex3fv(&dodec[b][0]);
   glVertex3fv(&dodec[c][0]);
   glVertex3fv(&dodec[d][0]);
   glVertex3fv(&dodec[e][0]);
   glEnd();
}

static void dodecahedron(GLenum type)
{
   static int inited = 0;

   if (inited == 0)
   {
      inited = 1;
      initDodecahedron();
   }
   pentagon(0, 1, 9, 16, 5, type);
   pentagon(1, 0, 3, 18, 7, type);
   pentagon(1, 7, 11, 10, 9, type);
   pentagon(11, 7, 18, 19, 6, type);
   pentagon(8, 17, 16, 9, 10, type);
   pentagon(2, 14, 15, 6, 19, type);
   pentagon(2, 13, 12, 4, 14, type);
   pentagon(2, 19, 18, 3, 13, type);
   pentagon(3, 0, 5, 12, 13, type);
   pentagon(6, 15, 8, 10, 11, type);
   pentagon(4, 17, 8, 15, 14, type);
   pentagon(4, 12, 5, 16, 17, type);
}

void shapesWireDodecahedron(void)
{
   dodecahedron(GL_LINE_LOOP);
}

void shapesSolidDodecahedron(void)
{
   dodecahedron(GL_TRIANGLE_FAN);
}

static void recorditem(GLfloat * n1, GLfloat * n2, GLfloat * n3,
                       GLenum shadeType)
{
   GLfloat q0[3], q1[3];

   DIFF3(n1, n2, q0);
   DIFF3(n2, n3, q1);
   crossprod(q0, q1, q1);
   normalize(q1);

   glBegin(shadeType);
   glNormal3fv(q1);
   glVertex3fv(n1);
   glVertex3fv(n2);
   glVertex3fv(n3);
   glEnd();
}

static void subdivide(GLfloat * v0, GLfloat * v1, GLfloat * v2,
                      GLenum shadeType)
{
   int depth = 1;
   for (int i = 0; i < depth; i++)
   {
      for (int j = 0; i + j < depth; j++)
      {
         GLfloat w0[3], w1[3], w2[3];
         int k = depth - i - j;
         for (int n = 0; n < 3; n++)
         {
            w0[n] = (i * v0[n] + j * v1[n] + k * v2[n]) / depth;
            w1[n] = ((i + 1) * v0[n] + j * v1[n] + (k - 1) * v2[n]) / depth;
            w2[n] = (i * v0[n] + (j + 1) * v1[n] + (k - 1) * v2[n]) / depth;
         }
         GLfloat l;
         l = sqrt(w0[0] * w0[0] + w0[1] * w0[1] + w0[2] * w0[2]);
         w0[0] /= l;
         w0[1] /= l;
         w0[2] /= l;
         l = sqrt(w1[0] * w1[0] + w1[1] * w1[1] + w1[2] * w1[2]);
         w1[0] /= l;
         w1[1] /= l;
         w1[2] /= l;
         l = sqrt(w2[0] * w2[0] + w2[1] * w2[1] + w2[2] * w2[2]);
         w2[0] /= l;
         w2[1] /= l;
         w2[2] /= l;
         recorditem(w1, w0, w2, shadeType);
      }
   }
}

static void drawtriangle(int i, GLfloat data[][3], int ndx[][3],
                         GLenum shadeType)
{
   GLfloat *x0 = data[ndx[i][0]];
   GLfloat *x1 = data[ndx[i][1]];
   GLfloat *x2 = data[ndx[i][2]];
   subdivide(x0, x1, x2, shadeType);
}

/* octahedron data: The octahedron produced is centered at the
   origin and has radius 1.0 */
static GLfloat odata[6][3] =
{
   {1.0, 0.0, 0.0},
   {-1.0, 0.0, 0.0},
   {0.0, 1.0, 0.0},
   {0.0, -1.0, 0.0},
   {0.0, 0.0, 1.0},
   {0.0, 0.0, -1.0}
};

static int ondex[8][3] =
{
   {0, 4, 2},
   {1, 2, 4},
   {0, 3, 4},
   {1, 4, 3},
   {0, 2, 5},
   {1, 5, 2},
   {0, 5, 3},
   {1, 3, 5}
};

static void octahedron(GLenum shadeType)
{
   for (int i = 7; i >= 0; i--)
   {
      drawtriangle(i, odata, ondex, shadeType);
   }
}

void shapesWireOctahedron(void)
{
   octahedron(GL_LINE_LOOP);
}

void shapesSolidOctahedron(void)
{
   octahedron(GL_TRIANGLES);
}


/* icosahedron data: These numbers are rigged to make an
   icosahedron of radius 1.0 */

#define X .525731112119133606
#define Z .850650808352039932

static GLfloat idata[12][3] =
{
   {-X, 0, Z},
   {X, 0, Z},
   {-X, 0, -Z},
   {X, 0, -Z},
   {0, Z, X},
   {0, Z, -X},
   {0, -Z, X},
   {0, -Z, -X},
   {Z, X, 0},
   {-Z, X, 0},
   {Z, -X, 0},
   {-Z, -X, 0}
};

static int connectivity[20][3] =
{
   {0, 4, 1},
   {0, 9, 4},
   {9, 5, 4},
   {4, 5, 8},
   {4, 8, 1},
   {8, 10, 1},
   {8, 3, 10},
   {5, 3, 8},
   {5, 2, 3},
   {2, 7, 3},
   {7, 10, 3},
   {7, 6, 10},
   {7, 11, 6},
   {11, 0, 6},
   {0, 1, 6},
   {6, 1, 10},
   {9, 0, 11},
   {9, 11, 2},
   {9, 2, 5},
   {7, 2, 11},
};

static void icosahedron(GLenum shadeType)
{
   for (int i = 19; i >= 0; i--)
   {
      drawtriangle(i, idata, connectivity, shadeType);
   }
}

void shapesWireIcosahedron(void)
{
   icosahedron(GL_LINE_LOOP);
}

void shapesSolidIcosahedron(void)
{
   icosahedron(GL_TRIANGLES);
}


/* tetrahedron data: */

#define T   1.73205080756887729

static GLfloat tdata[4][3] =
{
   {T, T, T},
   {T, -T, -T},
   {-T, T, -T},
   {-T, -T, T}
};
#undef T

static int tndex[4][3] =
{
   {0, 1, 3},
   {2, 1, 0},
   {3, 2, 0},
   {1, 2, 3}
};

static void tetrahedron(GLenum shadeType)
{
   for (int i = 3; i >= 0; i--)
      drawtriangle(i, tdata, tndex, shadeType);
}

void shapesWireTetrahedron(void)
{
   tetrahedron(GL_LINE_LOOP);
}

void shapesSolidTetrahedron(void)
{
   tetrahedron(GL_TRIANGLES);
}


/* Rim, body, lid, and bottom data must be reflected in x and
   y; handle and spout data across the y axis only.  */

static int patchdata[][16] =
{
   /* rim */
   {102, 103, 104, 105, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15},
   /* body */
   {12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27},
   {24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40},
   /* lid */
   {96, 96, 96, 96, 97, 98, 99, 100, 101, 101, 101, 101, 0, 1, 2, 3,},
   {0, 1, 2, 3, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117},
   /* bottom */
   {118, 118, 118, 118, 124, 122, 119, 121, 123, 126, 125, 120, 40, 39, 38, 37},
   /* handle */
   {41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56},
   {53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 28, 65, 66, 67},
   /* spout */
   {68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83},
   {80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95}
};

static float cpdata[][3] =
{
   {0.2,0,2.7}, {0.2,-0.112,2.7}, {0.112,-0.2,2.7}, {0,-0.2,2.7},
   {1.3375,0,2.53125}, {1.3375,-0.749,2.53125}, {0.749,-1.3375,2.53125},
   {0,-1.3375,2.53125}, {1.4375,0,2.53125}, {1.4375,-0.805, 2.53125},
   {0.805,-1.4375,2.53125}, {0,-1.4375,2.53125}, {1.5,0,2.4}, {1.5,-0.84,2.4},
   {0.84,-1.5,2.4}, {0,-1.5,2.4}, {1.75,0, 1.875}, {1.75,-0.98,1.875},
   {0.98,-1.75,1.875}, {0,-1.75,1.875}, {2,0,1.35}, {2,-1.12,1.35},
   {1.12,-2,1.35}, {0,-2,1.35}, {2,0,0.9}, {2,-1.12,0.9}, {1.12,-2,0.9},
   {0,-2,0.9}, {-2,0,0.9}, {2, 0,0.45}, {2,-1.12,0.45}, {1.12,-2,0.45},
   {0,-2,0.45}, {1.5,0,0.225}, {1.5,-0.84,0.225}, {0.84,-1.5,0.225},
   {0,-1.5,0.225}, {1.5, 0,0.15}, {1.5,-0.84,0.15}, {0.84,-1.5,0.15},
   {0,-1.5,0.15}, {-1.6,0,2.025}, {-1.6,-0.3,2.025}, {-1.5,-0.3,2.25},
   {-1.5,0,2.25}, {-2.3,0,2.025}, {-2.3,-0.3,2.025}, {-2.5,-0.3,2.25},
   {-2.5,0,2.25}, {-2.7,0,2.025}, {-2.7,-0.3,2.025}, {-3,-0.3,2.25},
   {-3,0,2.25}, {-2.7,0,1.8}, {-2.7,-0.3,1.8}, {-3,-0.3,1.8}, {-3,0,1.8},
   {-2.7,0,1.575}, {-2.7,-0.3,1.575}, {-3,-0.3,1.35}, {-3,0,1.35},
   {-2.5,0,1.125}, {-2.5,-0.3,1.125}, {-2.65,-0.3,0.9375}, {-2.65,0, 0.9375},
   {-2,-0.3,0.9}, {-1.9,-0.3,0.6}, {-1.9,0,0.6}, {1.7,0, 1.425},
   {1.7,-0.66,1.425}, {1.7,-0.66,0.6}, {1.7,0,0.6}, {2.6,0, 1.425},
   {2.6,-0.66,1.425}, {3.1,-0.66,0.825}, {3.1,0,0.825}, {2.3, 0,2.1},
   {2.3,-0.25,2.1}, {2.4,-0.25,2.025}, {2.4,0,2.025}, {2.7, 0,2.4},
   {2.7,-0.25,2.4}, {3.3,-0.25,2.4}, {3.3,0,2.4}, {2.8,0, 2.475},
   {2.8,-0.25,2.475}, {3.525,-0.25,2.49375}, {3.525,0, 2.49375}, {2.9,0,2.475},
   {2.9,-0.15,2.475}, {3.45,-0.15,2.5125}, {3.45,0,2.5125}, {2.8,0,2.4},
   {2.8,-0.15,2.4}, {3.2,-0.15,2.4}, {3.2,0,2.4}, {0,0,3.15}, {0.8,0,3.15},
   {0.8,-0.45,3.15}, {0.45, -0.8,3.15}, {0,-0.8,3.15}, {0,0,2.85}, {1.4,0,2.4},
   {1.4,-0.784, 2.4}, {0.784,-1.4,2.4}, {0,-1.4,2.4}, {0.4,0,2.55},
   {0.4,-0.224, 2.55}, {0.224,-0.4,2.55}, {0,-0.4,2.55}, {1.3,0,2.55},
   {1.3,-0.728,2.55}, {0.728,-1.3,2.55}, {0,-1.3,2.55}, {1.3,0,2.4},
   {1.3,-0.728,2.4}, {0.728,-1.3,2.4}, {0,-1.3,2.4}, {0,0,0}, {1.425,-0.798,0},
   {1.5,0,0.075}, {1.425,0,0}, {0.798,-1.425,0}, {0,-1.5, 0.075}, {0,-1.425,0},
   {1.5,-0.84,0.075}, {0.84,-1.5,0.075}
};

static float tex[2][2][2] =
{
   { {0, 0},
     {1, 0}},
   { {0, 1},
     {1, 1}}
};


static void teapot(GLint grid, GLenum type)
{
   float p[4][4][3], q[4][4][3], r[4][4][3], s[4][4][3];

   glPushAttrib(GL_ENABLE_BIT | GL_EVAL_BIT);
   glEnable(GL_AUTO_NORMAL);
   glEnable(GL_MAP2_VERTEX_3);
   glEnable(GL_MAP2_TEXTURE_COORD_2);
   for (int i = 0; i < 10; i++)
   {
      for (int j = 0; j < 4; j++)
      {
         for (int k = 0; k < 4; k++)
         {
            for (int l = 0; l < 3; l++)
            {
               p[j][k][l] = cpdata[patchdata[i][j * 4 + k]][l];
               q[j][k][l] = cpdata[patchdata[i][j * 4 + (3 - k)]][l];
               if (l == 1) q[j][k][l] *= -1.0;
               if (i < 6)
               {
                  r[j][k][l] = cpdata[patchdata[i][j * 4 + (3 - k)]][l];
                  if (l == 0) r[j][k][l] *= -1.0;
                  s[j][k][l] = cpdata[patchdata[i][j * 4 + k]][l];
                  if (l == 0) s[j][k][l] *= -1.0;
                  if (l == 1) s[j][k][l] *= -1.0;
               }
            }
         }
      }
      glMap2f(GL_MAP2_TEXTURE_COORD_2, 0, 1, 2, 2, 0, 1, 4, 2, &tex[0][0][0]);
      glMap2f(GL_MAP2_VERTEX_3, 0, 1, 3, 4, 0, 1, 12, 4, &p[0][0][0]);
      glMapGrid2f(grid, 0.0, 1.0, grid, 0.0, 1.0);
      glEvalMesh2(type, 0, grid, 0, grid);
      glMap2f(GL_MAP2_VERTEX_3, 0, 1, 3, 4, 0, 1, 12, 4, &q[0][0][0]);
      glEvalMesh2(type, 0, grid, 0, grid);
      if (i < 6)
      {
         glMap2f(GL_MAP2_VERTEX_3, 0, 1, 3, 4, 0, 1, 12, 4, &r[0][0][0]);
         glEvalMesh2(type, 0, grid, 0, grid);
         glMap2f(GL_MAP2_VERTEX_3, 0, 1, 3, 4, 0, 1, 12, 4, &s[0][0][0]);
         glEvalMesh2(type, 0, grid, 0, grid);
      }
   }
   glPopAttrib();
}

void shapesSolidTeapot()
{
   teapot(14, GL_FILL);
}

void shapesWireTeapot()
{
   teapot(10, GL_LINE);
}
#endif


//////////////////////////////////////////////////////////

class FormeBase2705
{
public:
   FormeBase2705( bool plein = true )
      : plein_(plein),
      vao(0), locVertex(-1), locNormal(-1), locTexCoord(-1)
   {
      glGenVertexArrays( 1, &vao );
   }
   ~FormeBase2705()
   {
      glDeleteVertexArrays( 1, &vao );
   }
protected:
   bool obtenirAttributs( )
   {
      GLint prog = 0; glGetIntegerv( GL_CURRENT_PROGRAM, &prog );
      if ( prog <= 0 )
      {
         std::cerr << "Pas de programme actif!" << std::endl;
         return(false);
      }

      locVertex = glGetAttribLocation( prog, "Vertex" );
      if ( locVertex == -1 )
      {
         std::cerr << "Pas de nuanceur de sommets!" << std::endl;
         return(false);
      }
      locNormal = glGetAttribLocation( prog, "Normal" );
      locTexCoord = glGetAttribLocation( prog, "TexCoord" );
      if ( locTexCoord < 0 ) locTexCoord = glGetAttribLocation( prog, "TexCoord0" );
      if ( locTexCoord < 0 ) locTexCoord = glGetAttribLocation( prog, "MultiTexCoord0" );
      return(true);
   }

   bool plein_;
   GLuint vao;
   GLint locVertex, locNormal, locTexCoord;
};

//////////

#define AJOUTE(X,Y,Z,NX,NY,NZ,S,T)                                      \
{                                                                       \
   if ( locTexCoord >= 0 )                                              \
   { texcoord[2*nsommets+0] = (S); texcoord[2*nsommets+1] = (T); }      \
   if ( locNormal >= 0 )                                                \
   { normales[3*nsommets+0] = (NX); normales[3*nsommets+1] = (NY); normales[3*nsommets+2] = (NZ); } \
   { sommets[3*nsommets+0] = (X); sommets[3*nsommets+1] = (Y); sommets[3*nsommets+2] = (Z); ++nsommets; } \
}

class FormeCube : public FormeBase2705
{
public:
   FormeCube( GLfloat taille = 1.0,
              bool plein = true )
      : FormeBase2705( plein )
   {
      /*         +Y                    */
      /*   3+-----------+2             */
      /*    |\          |\             */
      /*    | \         | \            */
      /*    |  \        |  \           */
      /*    |  7+-----------+6         */
      /*    |   |       |   |          */
      /*    |   |       |   |          */
      /*   0+---|-------+1  |          */
      /*     \  |        \  |     +X   */
      /*      \ |         \ |          */
      /*       \|          \|          */
      /*       4+-----------+5         */
      /*             +Z                */

      static GLint faces[6][4] =
      {
         { 3, 2, 1, 0 },
         { 5, 4, 0, 1 },
         { 6, 5, 1, 2 },
         { 7, 6, 2, 3 },
         { 4, 7, 3, 0 },
         { 4, 5, 6, 7 }
      };
      static GLfloat n[6][3] =
      {
         {  0.0,  0.0, -1.0 },
         {  0.0, -1.0,  0.0 },
         {  1.0,  0.0,  0.0 },
         {  0.0,  1.0,  0.0 },
         { -1.0,  0.0,  0.0 },
         {  0.0,  0.0,  1.0 }
      };
      GLfloat v[8][3];
      v[4][0] = v[7][0] = v[3][0] = v[0][0] = -taille / 2.;
      v[6][0] = v[5][0] = v[1][0] = v[2][0] = +taille / 2.;
      v[5][1] = v[4][1] = v[0][1] = v[1][1] = -taille / 2.;
      v[7][1] = v[6][1] = v[2][1] = v[3][1] = +taille / 2.;
      v[3][2] = v[2][2] = v[1][2] = v[0][2] = -taille / 2.;
      v[4][2] = v[5][2] = v[6][2] = v[7][2] = +taille / 2.;
      GLfloat t[8][2];
      t[4][0] = t[7][0] = t[3][0] = t[0][0] = 0.;
      t[6][0] = t[5][0] = t[1][0] = t[2][0] = 1.;
      t[5][1] = t[4][1] = t[0][1] = t[1][1] = 0.;
      t[7][1] = t[6][1] = t[2][1] = t[3][1] = 1.;

      if ( obtenirAttributs( ) )
      {
         // initialisation
         const int TAILLEMAX = 10000;
         assert( TAILLEMAX > 6*6 );
         GLfloat sommets[3*TAILLEMAX], normales[3*TAILLEMAX], texcoord[2*TAILLEMAX];
         int nsommets = 0;

         if ( plein_ )
         {
            for ( int i = 0 ; i < 6 ; ++i )
            {
               AJOUTE( v[faces[i][0]][0], v[faces[i][0]][1], v[faces[i][0]][2], n[i][0], n[i][1], n[i][2], t[faces[i][0]][0], t[faces[i][0]][1] );
               AJOUTE( v[faces[i][1]][0], v[faces[i][1]][1], v[faces[i][1]][2], n[i][0], n[i][1], n[i][2], t[faces[i][1]][0], t[faces[i][1]][1] );
               AJOUTE( v[faces[i][2]][0], v[faces[i][2]][1], v[faces[i][2]][2], n[i][0], n[i][1], n[i][2], t[faces[i][2]][0], t[faces[i][2]][1] );
               AJOUTE( v[faces[i][2]][0], v[faces[i][2]][1], v[faces[i][2]][2], n[i][0], n[i][1], n[i][2], t[faces[i][2]][0], t[faces[i][2]][1] );
               AJOUTE( v[faces[i][3]][0], v[faces[i][3]][1], v[faces[i][3]][2], n[i][0], n[i][1], n[i][2], t[faces[i][3]][0], t[faces[i][3]][1] );
               AJOUTE( v[faces[i][0]][0], v[faces[i][0]][1], v[faces[i][0]][2], n[i][0], n[i][1], n[i][2], t[faces[i][0]][0], t[faces[i][0]][1] );
            }
         }
         else
         {
            for ( int i = 0 ; i < 6 ; ++i )
            {
               AJOUTE( v[faces[i][0]][0], v[faces[i][0]][1], v[faces[i][0]][2], n[i][0], n[i][1], n[i][2], t[faces[i][0]][0], t[faces[i][0]][1] );
               AJOUTE( v[faces[i][1]][0], v[faces[i][1]][1], v[faces[i][1]][2], n[i][0], n[i][1], n[i][2], t[faces[i][1]][0], t[faces[i][1]][1] );
               AJOUTE( v[faces[i][2]][0], v[faces[i][2]][1], v[faces[i][2]][2], n[i][0], n[i][1], n[i][2], t[faces[i][2]][0], t[faces[i][2]][1] );
               AJOUTE( v[faces[i][3]][0], v[faces[i][3]][1], v[faces[i][3]][2], n[i][0], n[i][1], n[i][2], t[faces[i][3]][0], t[faces[i][3]][1] );
            }
         }
         nsommets_ = nsommets;
         assert( TAILLEMAX >= nsommets );

         // remplir VBOs
         glBindVertexArray( vao );
         glGenBuffers( 3, vbo );

         glBindBuffer( GL_ARRAY_BUFFER, vbo[0] );
         glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
         glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), sommets );
         glVertexAttribPointer( locVertex, 3, GL_FLOAT, GL_FALSE, 0, 0 );
         glEnableVertexAttribArray(locVertex);

         if ( locNormal >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[1] );
            glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), normales );
            glVertexAttribPointer( locNormal, 3, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locNormal);
         }

         if ( locTexCoord >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[2] );
            glBufferData( GL_ARRAY_BUFFER, 2*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 2*nsommets*sizeof(GLfloat), texcoord );
            glVertexAttribPointer( locTexCoord, 2, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locTexCoord);
         }

         glBindVertexArray( 0 );
      }
   }
   ~FormeCube()
   {
      glDeleteBuffers( 3, vbo );
   }
   void afficher()
   {
      glBindVertexArray( vao );
      if ( plein_ )
         glDrawArrays( GL_TRIANGLES, 0, nsommets_ );
      else
         for ( int i = 0 ; i < 6 ; ++i ) glDrawArrays( GL_LINE_LOOP, 4*i, 4 );
      glBindVertexArray( 0 );
   }
private:
   GLint nsommets_;
   GLuint vbo[3];
};

//////////

class FormePyramideBaseCarree : public FormeBase2705
{
public:
   FormePyramideBaseCarree( GLfloat taille = 1.0,
              bool plein = true )
      : FormeBase2705( plein )
   {

      static GLint faces[5][4] =
      {
         { 2, 1, 0, 0 },
         { 4, 3, 0, 1 },
         { 4, 2, 1, 1 },
         { 4, 3, 2, 2 },
         { 3, 2, 0, 0 }
      };
      static GLfloat n[5][3] =
      {
         {  0.0,  0.0, -1.0 },
         {  0.0, -1.0,  0.0 },
         {  1.0,  0.0,  0.0 },
         {  0.0,  0.0,  1.0 },
         { -1.0,  0.0,  0.0 }
      };

      GLfloat v[5][3];
      v[3][0] = v[0][0] = -taille / 2.;
      v[4][0] = v[1][0] = +taille / 2.;
      v[2][0] = 0.0;

      v[4][1] = v[3][1] = v[1][1] = v[0][1] = -taille / 2.;
      v[2][1] = +taille / 2.;
      
      v[1][2] = v[0][2] = -taille / 2.;
      v[4][2] = v[3][2] = +taille / 2.;
      
      GLfloat t[5][2];
      t[3][0] = t[0][0] = 0.;
      t[4][0] = t[2][0] = t[1][0] = 1.;
      t[3][1] = t[0][1] = t[1][1] = t[4][1] = 0.;
      t[2][1] = 1.;

      if ( obtenirAttributs( ) )
      {
         // initialisation
         const int TAILLEMAX = 10000;
         assert( TAILLEMAX > 6*6 );
         GLfloat sommets[3*TAILLEMAX], normales[3*TAILLEMAX], texcoord[2*TAILLEMAX];
         int nsommets = 0;

         if ( plein_ )
         {
            for ( int i = 0 ; i < 5 ; ++i )
            {
               AJOUTE( v[faces[i][0]][0], v[faces[i][0]][1], v[faces[i][0]][2], n[i][0], n[i][1], n[i][2], t[faces[i][0]][0], t[faces[i][0]][1] );
               AJOUTE( v[faces[i][1]][0], v[faces[i][1]][1], v[faces[i][1]][2], n[i][0], n[i][1], n[i][2], t[faces[i][1]][0], t[faces[i][1]][1] );
               AJOUTE( v[faces[i][2]][0], v[faces[i][2]][1], v[faces[i][2]][2], n[i][0], n[i][1], n[i][2], t[faces[i][2]][0], t[faces[i][2]][1] );
               AJOUTE( v[faces[i][2]][0], v[faces[i][2]][1], v[faces[i][2]][2], n[i][0], n[i][1], n[i][2], t[faces[i][2]][0], t[faces[i][2]][1] );
               AJOUTE( v[faces[i][3]][0], v[faces[i][3]][1], v[faces[i][3]][2], n[i][0], n[i][1], n[i][2], t[faces[i][3]][0], t[faces[i][3]][1] );
               AJOUTE( v[faces[i][0]][0], v[faces[i][0]][1], v[faces[i][0]][2], n[i][0], n[i][1], n[i][2], t[faces[i][0]][0], t[faces[i][0]][1] );
            }
         }
         else
         {
            for ( int i = 0 ; i < 5 ; ++i )
            {
               AJOUTE( v[faces[i][0]][0], v[faces[i][0]][1], v[faces[i][0]][2], n[i][0], n[i][1], n[i][2], t[faces[i][0]][0], t[faces[i][0]][1] );
               AJOUTE( v[faces[i][1]][0], v[faces[i][1]][1], v[faces[i][1]][2], n[i][0], n[i][1], n[i][2], t[faces[i][1]][0], t[faces[i][1]][1] );
               AJOUTE( v[faces[i][2]][0], v[faces[i][2]][1], v[faces[i][2]][2], n[i][0], n[i][1], n[i][2], t[faces[i][2]][0], t[faces[i][2]][1] );
               AJOUTE( v[faces[i][3]][0], v[faces[i][3]][1], v[faces[i][3]][2], n[i][0], n[i][1], n[i][2], t[faces[i][3]][0], t[faces[i][3]][1] );
            }
         }
         nsommets_ = nsommets;
         assert( TAILLEMAX >= nsommets );

         // remplir VBOs
         glBindVertexArray( vao );
         glGenBuffers( 3, vbo );

         glBindBuffer( GL_ARRAY_BUFFER, vbo[0] );
         glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
         glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), sommets );
         glVertexAttribPointer( locVertex, 3, GL_FLOAT, GL_FALSE, 0, 0 );
         glEnableVertexAttribArray(locVertex);

         if ( locNormal >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[1] );
            glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), normales );
            glVertexAttribPointer( locNormal, 3, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locNormal);
         }

         if ( locTexCoord >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[2] );
            glBufferData( GL_ARRAY_BUFFER, 2*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 2*nsommets*sizeof(GLfloat), texcoord );
            glVertexAttribPointer( locTexCoord, 2, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locTexCoord);
         }

         glBindVertexArray( 0 );
      }
   }
   ~FormePyramideBaseCarree()
   {
      glDeleteBuffers( 3, vbo );
   }
   void afficher()
   {
      glBindVertexArray( vao );
      if ( plein_ )
         glDrawArrays( GL_TRIANGLES, 0, nsommets_ );
      else
         for ( int i = 0 ; i < 6 ; ++i ) glDrawArrays( GL_LINE_LOOP, 4*i, 4 );
      glBindVertexArray( 0 );
   }
private:
   GLint nsommets_;
   GLuint vbo[3];
};

////////

class FormeSphere : public FormeBase2705
{
public:
   FormeSphere( GLdouble radius, GLint slices, GLint stacks,
                bool plein = true, bool entiere = true )
      : FormeBase2705( plein )
   {
      if ( obtenirAttributs( ) )
      {
         // initialisation
         const int TAILLEMAX = 10000;
         assert( TAILLEMAX > 2*(slices+1)*(stacks+2) );
         GLfloat sommets[3*TAILLEMAX], normales[3*TAILLEMAX], texcoord[2*TAILLEMAX];
         int nsommets = 0;

         // variables locales
         const GLfloat drho = M_PI / (GLfloat) stacks;
         const GLfloat dtheta = 2.0 * M_PI / (GLfloat) slices;

         GLint imin, imax;
         if ( locTexCoord >= 0 ) { imin = 0; imax = stacks; } else { imin = 1; imax = stacks - 1; }
         if ( !entiere ) imax = imax/2 + 1; // pour se rendre seulement à la moitié supérieure

         /* texturing: s goes from 0.0/0.25/0.5/0.75/1.0 at +y/+x/-y/-x/+y axis */
         /* t goes from -1.0/+1.0 at z = -radius/+radius (linear along longitudes) */
         /* cannot use triangle fan on texturing (s coord. at top/bottom tip varies) */

         nsommets = 0;
         {
            GLfloat t = 1.0;
            GLfloat ds = 1.0 / slices;
            GLfloat dt = 1.0 / stacks;
            for ( GLint i = imin; i < imax; i++ )
            {
               GLfloat rho = i * drho;
               GLfloat s = 0.0;
               for ( GLint j = 0; j <= slices; j++ )
               {
                  GLfloat x, y, z;
                  GLfloat theta = (j == slices) ? 0.0 : j * dtheta;
                  x = -sin(theta) * sin(rho);
                  y = cos(theta) * sin(rho);
                  z = cos(rho);
                  AJOUTE( x * radius, y * radius, z * radius, x, y, z, s, t );

                  x = -sin(theta) * sin(rho + drho);
                  y = cos(theta) * sin(rho + drho);
                  z = cos(rho + drho);
                  AJOUTE( x * radius, y * radius, z * radius, x, y, z, s, t-dt );
                  s += ds;
               }
               t -= dt;
            }
         }
         nsommetsStrip_ = nsommets;

         if ( !(locTexCoord >= 0) )
         {
            AJOUTE( 0.0, 0.0, radius, 0.0, 0.0, 1.0, 0, 0 );
            for ( GLint j = 0; j <= slices; j++ )
            {
               GLfloat x, y, z;
               GLfloat theta = (j == slices) ? 0.0 : j * dtheta;
               x = -sin(theta) * sin(drho);
               y = cos(theta) * sin(drho);
               z = cos(drho);
               AJOUTE( x * radius, y * radius, z * radius, x, y, z, 0, 0 );
            }
         }
         nsommetsFan_ = nsommets - nsommetsStrip_;

         if ( !(locTexCoord >= 0) && entiere )
         {
            AJOUTE( 0.0, 0.0, -radius, 0.0, 0.0, -1.0, 0, 0 );
            GLfloat rho = M_PI - drho;
            for ( GLint j = slices; j >= 0; j-- )
            {
               GLfloat x, y, z;
               GLfloat theta = (j == slices) ? 0.0 : j * dtheta;
               x = -sin(theta) * sin(rho);
               y = cos(theta) * sin(rho);
               z = cos(rho);
               AJOUTE( x * radius, y * radius, z * radius, x, y, z, 0, 0 );
            }
         }
         assert( TAILLEMAX >= nsommets );

         // remplir VBOs
         glBindVertexArray( vao );
         glGenBuffers( 3, vbo );

         glBindBuffer( GL_ARRAY_BUFFER, vbo[0] );
         glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
         glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), sommets );
         glVertexAttribPointer( locVertex, 3, GL_FLOAT, GL_FALSE, 0, 0 );
         glEnableVertexAttribArray(locVertex);

         if ( locNormal >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[1] );
            glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), normales );
            glVertexAttribPointer( locNormal, 3, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locNormal);
         }

         if ( locTexCoord >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[2] );
            glBufferData( GL_ARRAY_BUFFER, 2*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 2*nsommets*sizeof(GLfloat), texcoord );
            glVertexAttribPointer( locTexCoord, 2, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locTexCoord);
         }

         glBindVertexArray( 0 );
      }
   }
   ~FormeSphere()
   {
      glDeleteBuffers( 3, vbo );
   }
   void afficher()
   {
      glBindVertexArray( vao );
      glDrawArrays( GL_TRIANGLE_STRIP, 0, nsommetsStrip_ );
      if ( !(locTexCoord >= 0) )
      {
         glDrawArrays( GL_TRIANGLE_FAN, nsommetsStrip_, nsommetsFan_ );
         glDrawArrays( GL_TRIANGLE_FAN, nsommetsStrip_+nsommetsFan_, nsommetsFan_ );
      }
      glBindVertexArray( 0 );
   }
private:
   GLint nsommetsStrip_, nsommetsFan_;
   GLuint vbo[3];
};

//////////

class FormeTore : public FormeBase2705
{
public:
   FormeTore( GLdouble innerRadius, GLdouble outerRadius, GLint nsides, GLint rings,
              bool plein = true )
      : FormeBase2705( plein )
   {
      if ( obtenirAttributs( ) )
      {
         // initialisation
         const int TAILLEMAX = 10000;
         assert( TAILLEMAX > 2*(nsides+1)*(rings) );
         GLfloat sommets[3*TAILLEMAX], normales[3*TAILLEMAX], texcoord[2*TAILLEMAX];
         int nsommets = 0;

         // variables locales
         const GLfloat ringDelta = 2.0 * M_PI / rings;
         const GLfloat sideDelta = 2.0 * M_PI / nsides;

         GLfloat theta = 0.0;
         GLfloat cosTheta = 1.0;
         GLfloat sinTheta = 0.0;
         for ( int i = rings - 1; i >= 0; i-- )
         {
            GLfloat theta1 = theta + ringDelta;
            GLfloat cosTheta1 = cos(theta1);
            GLfloat sinTheta1 = sin(theta1);
            GLfloat phi = 0.0;
            for ( int j = nsides; j >= 0; j-- )
            {
               phi += sideDelta;
               GLfloat cosPhi = cos(phi);
               GLfloat sinPhi = sin(phi);
               GLfloat dist = outerRadius + innerRadius * cosPhi;

               AJOUTE( cosTheta1 * dist, -sinTheta1 * dist, innerRadius * sinPhi,
                       cosTheta1 * cosPhi, -sinTheta1 * cosPhi, sinPhi,
                       (4.0*(i+1))/rings, (4.0*j)/nsides );

               AJOUTE( cosTheta * dist, -sinTheta * dist,  innerRadius * sinPhi,
                       cosTheta * cosPhi, -sinTheta * cosPhi, sinPhi,
                       (4.0*i)/rings, (4.0*j)/nsides );
            }
            theta = theta1;
            cosTheta = cosTheta1;
            sinTheta = sinTheta1;
         }
         nsommets_ = nsommets;
         assert( TAILLEMAX >= nsommets );

         // remplir VBOs
         glBindVertexArray( vao );
         glGenBuffers( 3, vbo );

         glBindBuffer( GL_ARRAY_BUFFER, vbo[0] );
         glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
         glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), sommets );
         glVertexAttribPointer( locVertex, 3, GL_FLOAT, GL_FALSE, 0, 0 );
         glEnableVertexAttribArray(locVertex);

         if ( locNormal >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[1] );
            glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), normales );
            glVertexAttribPointer( locNormal, 3, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locNormal);
         }

         if ( locTexCoord >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[2] );
            glBufferData( GL_ARRAY_BUFFER, 2*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 2*nsommets*sizeof(GLfloat), texcoord );
            glVertexAttribPointer( locTexCoord, 2, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locTexCoord);
         }

         glBindVertexArray( 0 );
      }
   }
   ~FormeTore()
   {
      glDeleteBuffers( 3, vbo );
   }
   void afficher()
   {
      glBindVertexArray( vao );
      glDrawArrays( GL_TRIANGLE_STRIP, 0, nsommets_ );
      glBindVertexArray( 0 );
   }
private:
   GLint nsommets_;
   GLuint vbo[3];
};

//////////

class FormeCylindre : public FormeBase2705
{
public:
   FormeCylindre( GLdouble base, GLdouble top, GLdouble height, GLint slices, GLint stacks,
                  bool plein = true )
      : FormeBase2705( plein )
   {
      if ( obtenirAttributs( ) )
      {
         // initialisation
         const int TAILLEMAX = 10000;
         assert( TAILLEMAX > 2*(slices+1)*(stacks) + 2*(slices+1) + 2 );
         GLfloat sommets[3*TAILLEMAX], normales[3*TAILLEMAX], texcoord[2*TAILLEMAX];
         int nsommets = 0;

         // variables locales
         const GLdouble da = 2.0 * M_PI / slices;
         {
            // le cylindre
            const GLdouble dr = (top - base) / stacks;
            const GLdouble nz = (base - top) / height;
            const GLdouble dz = height / stacks;
            const GLfloat ds = 1.0 / slices;
            const GLfloat dt = 1.0 / stacks;
            GLfloat t = 0.0;
            GLfloat z = 0.0;
            GLfloat r = base;
            for ( int j = 0; j < stacks; j++ )
            {
               GLfloat s = 0.0;
               for ( int i = 0; i <= slices; i++ )
               {
                  GLfloat a = ( i == slices ) ? 0.0 : i * da;
                  GLfloat x = sin( a );
                  GLfloat y = cos( a );
                  AJOUTE( x * r, y * r, z,  x, y, nz, s, t );
                  AJOUTE( x * (r + dr), y * (r + dr), z + dz, x, y, nz, s, t + dt );
                  s += ds;
               }
               r += dr;
               t += dt;
               z += dz;
            }
            nsommetsCyl_ = nsommets;
         }
         {
            // les deux bouts avec des disques
            /* texture of a shapesDisk is a cut out of the texture unit square
             * x, y in [-outerRadius, +outerRadius]; s, t in [0, 1] (linear mapping) */
            AJOUTE( 0.0, 0.0, 0.0,  0.0, 0.0, -1.0,  0.5, 0.5 );
            for ( int i = slices; i >= 0; i-- )
            {
               GLfloat a = ( i == slices ) ? 0.0 : i * -da;
               GLfloat x = sin( a );
               GLfloat y = cos( a );
               AJOUTE( base*x, base*y, 0.0,  0.0, 0.0, -1.0,  0.5*(1.0-x), 0.5*(1.0+y) );
            }
            nsommetsBout_ = nsommets - nsommetsCyl_;
            AJOUTE( 0.0, 0.0, height,  0.0, 0.0, +1.0,  0.5, 0.5 );
            for ( int i = slices; i >= 0; i-- )
            {
               GLfloat a = ( i == slices ) ? 0.0 : i * da;
               GLfloat x = sin( a );
               GLfloat y = cos( a );
               AJOUTE( top*x, top*y, height,  0.0, 0.0, +1.0,  0.5*(1.0-x), 0.5*(1.0+y) );
            }
         }
         assert( TAILLEMAX >= nsommets );

         // remplir VBOs
         glBindVertexArray( vao );
         glGenBuffers( 3, vbo );

         glBindBuffer( GL_ARRAY_BUFFER, vbo[0] );
         glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
         glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), sommets );
         glVertexAttribPointer( locVertex, 3, GL_FLOAT, GL_FALSE, 0, 0 );
         glEnableVertexAttribArray(locVertex);

         if ( locNormal >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[1] );
            glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), normales );
            glVertexAttribPointer( locNormal, 3, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locNormal);
         }

         if ( locTexCoord >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[2] );
            glBufferData( GL_ARRAY_BUFFER, 2*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 2*nsommets*sizeof(GLfloat), texcoord );
            glVertexAttribPointer( locTexCoord, 2, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locTexCoord);
         }

         glBindVertexArray( 0 );
      }
   }
   ~FormeCylindre()
   {
      glDeleteBuffers( 3, vbo );
   }
   void afficher()
   {
      glBindVertexArray( vao );
      glDrawArrays( GL_TRIANGLE_STRIP, 0, nsommetsCyl_ );
      glDrawArrays( GL_TRIANGLE_FAN, nsommetsCyl_, nsommetsBout_ );
      glDrawArrays( GL_TRIANGLE_FAN, nsommetsCyl_+nsommetsBout_, nsommetsBout_ );
      glBindVertexArray( 0 );
  }
private:
   GLint nsommetsCyl_, nsommetsBout_;
   GLuint vbo[3];
};



//////////

class FormeDisque : public FormeBase2705
{
public:
   FormeDisque( GLdouble inner, GLdouble outer, GLint slices, GLint loops,
                bool plein = true )
      : FormeBase2705( plein )
   {
      if ( obtenirAttributs( ) )
      {
         // initialisation
         const int TAILLEMAX = 10000;
         assert( TAILLEMAX > 2*(slices+1)*(loops) );
         GLfloat sommets[3*TAILLEMAX], normales[3*TAILLEMAX], texcoord[2*TAILLEMAX];
         int nsommets = 0;

         // variables locales
         const GLfloat da = 2.0 * M_PI / slices;
         const GLfloat dr = (outer - inner) / (GLfloat) loops;

         /* texture of a shapesDisk is a cut out of the texture unit square
          * x, y in [-outer, +outer]; s, t in [0, 1] * (linear mapping) */
         GLfloat r1 = inner;
         for ( int l = 0; l < loops; l++ )
         {
            GLfloat r2 = r1 + dr;
            for ( int i = slices; i >= 0; i-- )
            {
               GLfloat a = ( i == slices ) ? 0.0 : i * da;
               GLfloat x = sin( a );
               GLfloat y = cos( a );
               AJOUTE( r2*x, r2*y, 0.0, 0.0, 0.0, +1.0, 0.5*( 1.0 - x*r2/outer ), 0.5*( 1.0 + y*r2/outer ) );
               AJOUTE( r1*x, r1*y, 0.0, 0.0, 0.0, +1.0, 0.5*( 1.0 - x*r1/outer ), 0.5*( 1.0 + y*r1/outer ) );
            }
            r1 = r2;
         }
         nsommets_ = nsommets;
         assert( TAILLEMAX >= nsommets );

         // remplir VBOs
         glBindVertexArray( vao );
         glGenBuffers( 3, vbo );

         glBindBuffer( GL_ARRAY_BUFFER, vbo[0] );
         glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
         glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), sommets );
         glVertexAttribPointer( locVertex, 3, GL_FLOAT, GL_FALSE, 0, 0 );
         glEnableVertexAttribArray(locVertex);

         if ( locNormal >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[1] );
            glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), normales );
            glVertexAttribPointer( locNormal, 3, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locNormal);
         }

         if ( locTexCoord >= 0 )
         {
            glBindBuffer( GL_ARRAY_BUFFER, vbo[2] );
            glBufferData( GL_ARRAY_BUFFER, 2*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 2*nsommets*sizeof(GLfloat), texcoord );
            glVertexAttribPointer( locTexCoord, 2, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locTexCoord);
         }

         glBindVertexArray( 0 );
      }
   }
   ~FormeDisque()
   {
      glDeleteBuffers( 3, vbo );
   }
   void afficher()
   {
      glBindVertexArray( vao );
      glDrawArrays( GL_TRIANGLE_STRIP, 0, nsommets_ );
      glBindVertexArray( 0 );
   }
private:
   GLint nsommets_;
   GLuint vbo[3];
};

//////////
#include <stdio.h>
#include <string>
#include <vector>

static bool lireOBJ( const char *fichierObj, std::vector<float> & sommetsObj, std::vector<unsigned int> & connecObj )
{
   printf( "Lecture de \"%s\" ...\n", fichierObj );

   FILE *fp = fopen( fichierObj, "r" );
   if ( fp == NULL )
   {
      perror( fichierObj );
      return false;
   }

   while( 1 )
   {
      char type[128];
      if ( fscanf( fp, "%s", type ) == EOF ) break; // c'est terminé

      char ligne[1000];
      fgets( ligne, 1000, fp );

      if ( strcmp( type, "v" ) == 0  )
      {
         float x[3];
         sscanf( ligne, "%f %f %f\n", &x[0], &x[1], &x[2] );
         sommetsObj.push_back(x[0]);
         sommetsObj.push_back(x[1]);
         sommetsObj.push_back(x[2]);
      }
      else if ( strcmp( type, "f" ) == 0  )
      {
         unsigned int vertexIndex[3];
         int nlu = sscanf( ligne, "%d/%*d/%*d %d/%*d/%*d %d/%*d/%*d\n", &vertexIndex[0], &vertexIndex[1], &vertexIndex[2] );
         if ( nlu != 3 )
            nlu = sscanf( ligne, "%d//%*d %d//%*d %d//%*d\n", &vertexIndex[0], &vertexIndex[1], &vertexIndex[2] );
         if ( nlu != 3 )
            nlu = sscanf( ligne, "%d %d %d\n", &vertexIndex[0], &vertexIndex[1], &vertexIndex[2] );
         if ( nlu != 3 )
         {
            printf("Incapable de lire la connectivité :-(\n");
            return false;
         }
         connecObj.push_back( vertexIndex[0] );
         connecObj.push_back( vertexIndex[1] );
         connecObj.push_back( vertexIndex[2] );
      }
      // else if ( strcmp( type, "vt" ) == 0  )
      // {
      // }
      // else if ( strcmp( type, "vn" ) == 0  )
      // {
      // }
   }

   fclose(fp);
   printf( "Lecture de \"%s\" terminé.\n", fichierObj );
   return true;
}

class FormeObj : public FormeBase2705
{
public:
   FormeObj( const char *fichierObj,
             bool plein = true )
      : FormeBase2705( plein ), nsommets_(0), nconnec_(0), min(0.0), max(0.0)
   {
      if ( obtenirAttributs( ) )
      {
         std::vector<float> sommetsObj;
         std::vector<unsigned int> connecObj;
         if ( lireOBJ( fichierObj, sommetsObj, connecObj ) )
         {
            nsommets_ = sommetsObj.size()/3;
            float *sommets = new float[sommetsObj.size()];
            {
               int i = 0;
               std::vector<float>::iterator ite;
               for( ite = sommetsObj.begin(); ite != sommetsObj.end(); ite++ ) { sommets[i++] = *ite; }
            }
            for ( int i = 0 ; i < nsommets_ ; ++i )
            {
               if ( min.x > sommets[3*i+0] ) min.x = sommets[3*i+0];
               else if ( max.x < sommets[3*i+0] ) max.x = sommets[3*i+0];
               if ( min.y > sommets[3*i+1] ) min.y = sommets[3*i+1];
               else if ( max.y < sommets[3*i+1] ) max.y = sommets[3*i+1];
               if ( min.z > sommets[3*i+2] ) min.z = sommets[3*i+2];
               else if ( max.z < sommets[3*i+2] ) max.z = sommets[3*i+2];
            }
            std::cout << "//@inf2705-forme," << __LINE__ << ";"
                      << " min=" <<  glm::to_string(min)
                      << " max=" <<  glm::to_string(max) << std::endl;

            nconnec_ = connecObj.size()/3;
            unsigned int *connec = new unsigned int[connecObj.size()];
            {
               int i = 0;
               std::vector<unsigned int>::iterator ite;
               for( ite = connecObj.begin(); ite != connecObj.end(); ite++ ) { connec[i++] = *ite-1; }
            }
            // for ( int i = 0 ; i < nconnec_ ; ++i )
            // {
            //    //  if ( connec[i] <= 0 ) std::cerr << "//@inf2705-forme," << __LINE__ << ";" << " i=" << i << " connec[i]=" << connec[i] << std::endl;
            //    if ( connec[i] >= (unsigned int) (nsommets_-14) ) std::cerr << "//@inf2705-forme," << __LINE__ << ";" << " i=" << i << " connec[i]=" << connec[i] << std::endl;
            // }

            // remplir VBOs
            glBindVertexArray( vao );
            glGenBuffers( 4, vbo );

            glBindBuffer( GL_ARRAY_BUFFER, vbo[0] );
            glBufferData( GL_ARRAY_BUFFER, 3*nsommets_*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets_*sizeof(GLfloat), sommets );
            glVertexAttribPointer( locVertex, 3, GL_FLOAT, GL_FALSE, 0, 0 );
            glEnableVertexAttribArray(locVertex);

            // if ( locNormal >= 0 )
            // {
            //    glBindBuffer( GL_ARRAY_BUFFER, vbo[1] );
            //    glBufferData( GL_ARRAY_BUFFER, 3*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            //    glBufferSubData( GL_ARRAY_BUFFER, 0, 3*nsommets*sizeof(GLfloat), normales );
            //    glVertexAttribPointer( locNormal, 3, GL_FLOAT, GL_FALSE, 0, 0 );
            //    glEnableVertexAttribArray(locNormal);
            // }

            // if ( locTexCoord >= 0 )
            // {
            //    glBindBuffer( GL_ARRAY_BUFFER, vbo[2] );
            //    glBufferData( GL_ARRAY_BUFFER, 2*nsommets*sizeof(GLfloat), NULL, GL_STATIC_DRAW );
            //    glBufferSubData( GL_ARRAY_BUFFER, 0, 2*nsommets*sizeof(GLfloat), texcoord );
            //    glVertexAttribPointer( locTexCoord, 2, GL_FLOAT, GL_FALSE, 0, 0 );
            //    glEnableVertexAttribArray(locTexCoord);
            // }

            glBindBuffer( GL_ELEMENT_ARRAY_BUFFER, vbo[3] );
            glBufferData( GL_ELEMENT_ARRAY_BUFFER, 3*nconnec_*sizeof(unsigned int), connec, GL_STATIC_DRAW );

            glBindVertexArray( 0 );

            delete [] sommets;
            delete [] connec;
         }
      }
   }
   ~FormeObj()
   {
      glDeleteBuffers( 4, vbo );
   }
   void afficher()
   {
      glBindVertexArray( vao );
      glDrawElements( GL_TRIANGLES, 3*nconnec_, GL_UNSIGNED_INT, 0 );
      glBindVertexArray( 0 );
   }
private:
   GLint nsommets_;
   GLint nconnec_;
   glm::vec3 min, max;
   GLuint vbo[4];
};

//////////

#endif

