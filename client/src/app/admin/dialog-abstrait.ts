export abstract class DialogAbstrait {

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
