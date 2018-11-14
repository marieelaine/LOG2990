#RUN COMMAND TO CREATE EXECUTABLE
gcc -o genscene -I./include genscene.cpp -lfreeimage -lstdc++ -lm -lglut -lGLU -lGL -lSDL2 -lSDL2main