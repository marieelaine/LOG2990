export abstract class DialogAbstrait {

    protected outOfBoundNameLengthMessage: String = "";
    protected wrongNumberOfImagesMessage: String = "";
    protected wrongImageSizeOrTypeMessage: String = "";

    public constructor() {
    }

    protected abstract onFileSelectedImage(event, i): void;
    protected abstract onSubmit(): void;

    protected genererTableauTempsAleatoires(): Array<number> {
        const arr: Array<number> = new Array<number>();
        for (let i: number = 0; i < 6; i++) {
          arr[i] = this.genererTempsAleatoire();
        }

        return arr;
      }

    private genererTempsAleatoire(): number {
        return Math.floor(Math.random() * 400) + 100;
      }

}
