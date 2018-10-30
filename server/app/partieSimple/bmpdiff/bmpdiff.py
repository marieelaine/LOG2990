import PIL
from PIL import ImageChops
from PIL import Image
import sys
import argparse
import os.path
import numpy as np

newImage = PIL.ImageChops.invert(Image.new("RGB", (640, 480), 0))
newpixels = newImage.load()
visited = np.empty(shape=(640,480))
visited.fill(False)

def file_choices(choices,fname):
    ext = os.path.splitext(fname)[1][1:]
    if ext not in choices:
       parser.error("image de mauvais type, demandé: {}".format(choices))
    return fname

def compare_images(settings, enlargePixels):

    #Ouverture des images et déclaration de constantes
    image_one = Image.open(settings.imageOriginale)
    image_two = Image.open(settings.imageModifie)

    pixels_one = np.asarray(image_one)
    pixels_two = np.asarray(image_two)

    #Détection de la mauvaise taille d'image
    if(not (image_one.size[0] or image_two.size[0]) == 640 or not (image_one.size[1] or image_two.size[1]) == 480):
        print("Images de mauvaise taille, veuillez choisir des images de type .bmp de taille 640x480")
        return
    
    f = open(str(settings.imageSortie)+".txt",'w+')
    #Parcours dans l'image pour trouver les pixels différents
    width = 640
    height = 480
    compteur = 0
    
    for i in range (0, height):
        for j in range (0, width):
            px_one = pixels_one[i, j]
            px_two = pixels_two[i, j]
            if((not (px_one==px_two).all()) and visited[j,i] == False):
                compteur+=1
                print(compteur)
                f.write("DIFFERENCE\n")
                stack = []
                stack.append((j,i))
                while not stack == []:
                    curr = stack.pop()
                    newpixels[curr[0],curr[1]] = (0, 0, 0)
                    f.write(str(curr[0])+","+str(curr[1])+"\n")
                    visited[curr[0],curr[1]] = True
                    if enlargePixels:
                        enlarge_pixels(pixels_one, pixels_two, f, stack, curr[0], curr[1])
                    else:
                        addAdjacent(pixels_one, pixels_two, stack, curr[0], curr[1])
                    
    f.write("END\n")

    #Sauvegarde de l'image
    if (compteur == 7):
        newImage.save(settings.imageSortie)
        print('Image de différence générée avec succès!', file=sys.stdout)
        sys.exit(0)
    else:
        print("Le nombre de différences entre les deux images ne correspond pas au nombre demandé! \n"
              "Il faut exactement 7 différences entre les deux images.", file=sys.stderr)
        sys.exit(1)

def enlarge_pixels(pxs_one, pxs_two, f, stack, x, y):
    #Élargissement des différences
    for j in range(3, -4, -1):
        for i in range(-3, 4):
            if(not ((abs(i) > 1 and abs(j) == 3) or (abs(j) > 1 and abs(i) == 3))):
                if x+i in range(640) and y+j in range(480):
                    if visited[x+i, y+j] == False:
                        f.write(str(x+i)+","+str(y+j)+"\n")
                        newpixels[x+i, y+j] = (0, 0, 0)
                        visited[x+i, y+j] = True
                        if not (pxs_one[y+j,x+i] == pxs_two[y+j,x+i]).all():
                            stack.append((x+i,y+j))


def addAdjacent(pxs_one, pxs_two, stack, x, y):
    if((not (pxs_one[y,x+1] == pxs_two[y,x+1]).all()) and visited[x+1,y] == False):
        stack.append((x+1,y))
        visited[x+1,y] = True
    if((not (pxs_one[y+1,x] == pxs_two[y+1,x]).all()) and visited[x,y+1] == False):
        stack.append((x,y+1))
        visited[x,y+1] = True
    if((not (pxs_one[y,x-1] == pxs_two[y,x-1]).all()) and visited[x-1,y] == False):
        stack.append((x-1,y))
        visited[x-1,y] = True
    if((not (pxs_one[y-1,x] == pxs_two[y-1,x]).all()) and visited[x,y-1] == False):
        stack.append((x,y-1))
        visited[x,y-1] = True

if __name__ == '__main__':
    sys.setrecursionlimit(1000000)
    #Déclaration des arguments
    parser = argparse.ArgumentParser(
        description="Générer une image en noir et blanc décrivant les différences entre deux images")
    parser.add_argument("-partiel", action="store_true", help="Générer une image de différences partielles")
    parser.add_argument('imageOriginale', type=lambda s: file_choices("bmp", s), help="Chemin pointant sur l'image d'origine")
    parser.add_argument('imageModifie', type=lambda s: file_choices("bmp", s), help="Chemin pointant sur l'image modifiée")
    parser.add_argument('imageSortie', type=lambda s: file_choices("bmp", s), help="Chemin où l'image de sortie doit être générée")

    settings = parser.parse_args()

    #Vérification argument -partiel
    if settings.partiel:
        compare_images(settings, 0)
    else:
        compare_images(settings, 1)
    exit()
