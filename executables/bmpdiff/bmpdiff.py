import PIL
from PIL import ImageChops
from PIL import Image
import numpy as np
import sys


def compare_images(image_originale, image_modifiee, image_differences):

    image_one = Image.open(image_originale)
    image_two = Image.open(image_modifiee)

    width = image_one.size[0]
    height = image_one.size[1]
    pixels_one = np.asarray(image_one)
    pixels_two = np.asarray(image_two)

    newImage = Image.new("RGB", (640,480), 0)
    newpixels = newImage.load()

    for y in range(0,width):
        for x in range(0,height):

            px_one = pixels_one[x,y]
            px_two = pixels_two[x,y]
            if (px_one==px_two).all():
                newpixels[y,x] = (255, 255, 255)
            else:
                newpixels[y,x] = (0, 0, 0)

    newImage.save(image_differences)

if __name__ == '__main__':
		arguments = sys.argv
		compare_images(arguments[1], arguments[2], arguments[3])
