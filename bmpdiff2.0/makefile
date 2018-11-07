CONTEXT=sdl2
#CONTEXT=glfw3

LDFLAGS += -g
LDFLAGS += $(shell pkg-config --libs opencv2)
LDFLAGS += $(shell pkg-config --libs $(CONTEXT))
LDFLAGS += -opencv2

SRC=bmpdiff

exe : $(SRC)
run : exe
	./$(SRC).exe
$(SRC).exe : $(SRC).cpp *.h -o$@ $(SRC).cpp $(LDFLAGS)

clean :
	rm -rf *.o *.exe *.exe.dSYM
