export class MockFileCreator {
    public constructor() {
    }

    public createMockImageFile(isBMP: Boolean): File {
        const content: string = "Test image";
        const data: Blob = new Blob([content]);
        const arrayOfBlob: Array<Blob> = new Array<Blob>();
        arrayOfBlob.push(data);

        if (isBMP) {
            return new File(arrayOfBlob, "MockFile", { type: "image/bmp" });
        }

        return new File(arrayOfBlob, "MockFile", { type: "image/jpeg" });
    }
}
