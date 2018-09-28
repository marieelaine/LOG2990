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

export function createMockBmpFile() {
    const byteLength: number = 921738;
    const buffer: ArrayBuffer = new ArrayBuffer(byteLength);
    const dataView: DataView =  new DataView(buffer);
    dataView.setUint16(28, 24);
    dataView.setUint32(18, 640);
    dataView.setUint32(22, 480);

    return new File([dataView], "MockBmpFile", {type: 'image/bmp'});
}
