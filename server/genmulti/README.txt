EXECUTABLE LINUX - A ROULER DANS L4712:
$ ./genmulti {geo | theme} <quantité> <modification> <sortie>
ex: $ ./genmulti/genmulti theme 15 s sortie

Use this command line to compile project:
gcc -o genmulti -I./include genmulti.cpp -lfreeimage -lstdc++ -lm -lGLEW -lGL -lSDL2 -lSDL2main