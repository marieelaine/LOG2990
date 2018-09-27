export function createMockImageFile(isBMP: Boolean) {
    const content = "Test image";
    var data: Blob;
    isBMP ?
    data = new Blob([content], { type: 'image/bmp' }) :
    data = new Blob([content], { type: 'image/jpeg' });
    const arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);

    return new File(arrayOfBlob, "MockFile");
}
