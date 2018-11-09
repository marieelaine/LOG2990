CONTEXT=sdl2
#CONTEXT=glfw3

LDFLAGS += -g

SRC=source

exe : $(SRC)
run : exe
	./$(SRC).exe
$(SRC).exe : $(SRC).cpp *.h -o$@ $(SRC).cpp $(LDFLAGS)

clean :
	rm -rf *.o *.exe *.exe.dSYM
