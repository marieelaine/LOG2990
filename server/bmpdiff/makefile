CONTEXT=sdl2
#CONTEXT=glfw3

LDFLAGS += -g

SRC=bmpdiff

exe : $(SRC)
run : exe
	./$(SRC)
$(SRC).exe : $(SRC).cpp *.h -o$@ $(SRC).cpp $(LDFLAGS)

clean :
	rm -rf *.o *.exe *.exe.dSYM
