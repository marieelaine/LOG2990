export class PartieAttributsData {

    private _nbImages: number;
    private _imageData: Array<string>;
    private _image: Array<HTMLImageElement>;
    private _partieID: string;
    private _nomPartie: string;
    private _audio: HTMLAudioElement;

    public constructor() {
        this.audio = new Audio();
        this.imageData = [];
    }

    public get audio(): HTMLAudioElement {
        return this._audio;
    }

    public set audio(value: HTMLAudioElement) {
        this._audio = value;
    }

    public get nbImages(): number {
        return this._nbImages;
    }

    public set nbImages(value: number) {
        this._nbImages = value;
    }

    public get imageData(): Array<string> {
        return this._imageData;
    }

    public set imageData(value: Array<string>) {
        this._imageData = value;
    }

    public get image(): Array<HTMLImageElement> {
        return this._image;
    }

    public set image(value: Array<HTMLImageElement>) {
        this._image = value;
    }

    public get partieID(): string {
        return this._partieID;
    }

    public set partieID(value: string) {
        this._partieID = value;
    }

    public get nomPartie(): string {
        return this._nomPartie;
    }

    public set nomPartie(value: string) {
        this._nomPartie = value;
    }
}
