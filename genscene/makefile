CONTEXT=sdl2

CXXFLAGS += -DFENETRE_$(CONTEXT)
CXXFLAGS += -g -W -Wall -Wno-unused-parameter -Wno-deprecated-declarations -Wvla -pedantic -std=c++11
CXXFLAGS += $(shell pkg-config --cflags glew)

LDFLAGS += -g
LDFLAGS += $(shell pkg-config --libs glew)
LDFLAGS += -lfreeimage -lfreeimageplus -lGL -lGLU -lglut

INCLUDEFLAG= -I. -Idep/ -Idep/soil/include/
LIBFLAG = -Ldep/soil/lib

ifeq "$(shell uname)" "Darwin"
  LDFLAGS += -framework OpenGL
  ifeq "$(CONTEXT)" "glfw3"
    LDFLAGS += -lobjc -framework Foundation -framework Cocoa
  endif
endif

SRC=genscene

exe : $(SRC)
run : exe
	./$(SRC).exe
$(SRC).exe : $(SRC).cpp *.h
	$(CXX) $(CXXFLAGS) $(INCLUDEFLAG) $(LIBFLAG) -o$@ $(SRC).cpp $(LDFLAGS)

clean :
	rm -rf *.o *.exe *.exe.dSYM