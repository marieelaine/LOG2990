export function createMockImageFile(isBMP: Boolean) {
    const content = "Test image";
    var data: Blob;
    data = new Blob([content]);
    const arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);

    if (isBMP) {
        return new File(arrayOfBlob, "MockFile", { type: 'image/bmp' });
    }

    return new File(arrayOfBlob, "MockFile", { type: 'image/jpeg' });
}
