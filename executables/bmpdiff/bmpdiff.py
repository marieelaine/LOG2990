import PIL
from PIL import ImageChops
from PIL import Image
import numpy as np
import sys
import argparse
import os.path

newImage = Image.new("RGB", (640, 480), 0)
newpixels = newImage.load()

def file_choices(choices,fname):
    ext = os.path.splitext(fname)[1][1:]
    if ext not in choices:
       parser.error("image de mauvais type, demandé: {}".format(choices))
    return fname

def compare_images(settings, enlargePixels):

    image_one = Image.open(settings.imageOriginale)
    image_two = Image.open(settings.imageModifie)

    width = image_one.size[0]
    height = image_one.size[1]
    pixels_one = np.asarray(image_one)
    pixels_two = np.asarray(image_two)

    for y in range(0,width):
        for x in range(0,height):

            px_one = pixels_one[x,y]
            px_two = pixels_two[x,y]
            if not (px_one==px_two).all():
                if(enlargePixels):
                    enlarge_pixels(x,y)
                else:
                    newpixels[y, x] = (0, 0, 0)
            elif(newpixels[y, x] == (0, 0, 0)):
                newpixels[y, x] = (255, 255, 255)

    newImage.save(settings.imageSortie)

def enlarge_pixels(x, y):
    for i in range(-3, 4):
        for j in range(-3, 4):
            if(not ((abs(i) > 1 and abs(j) == 3) or (abs(j) > 1 and abs(i) == 3))):
                newpixels[y+i,x+j] = (0, 0, 0)
            else:
                newpixels[y+i,x+j] = (255, 0, 0)

if __name__ == '__main__':

    parser = argparse.ArgumentParser(
        description="Générer une image en noir et blanc décrivant les différences entre deux images")
    parser.add_argument("-partiel", action="store_true", help="Générer une image de différences partielles")
    parser.add_argument('imageOriginale', type=lambda s: file_choices("bmp", s))
    parser.add_argument('imageModifie', type=lambda s: file_choices("bmp", s))
    parser.add_argument('imageSortie', type=lambda s: file_choices("bmp", s))

    settings = parser.parse_args()

    if settings.partiel:
        compare_images(settings, 0)
    else:
        compare_images(settings, 1)
