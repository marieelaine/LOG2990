#include <cstdlib>
#include <iostream>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <string>

using namespace std;

int main(int argc, const char* argv[]) {


    for (int i = 0; i < 4; i++){
        int output = system("../bmpdiff ../1.bmp ../5.bmp ../3.bmp.txt");

        if (output == 0){
            cout << "Les différences sont bien généré";
            return 0;
        } else{
            cout << "erreur";
        }
    }

}