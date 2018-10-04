export abstract class ListePartieAbstraiteClass {

    constructor() { }

    protected getSortedTimes(times: number[]): number[] {
      return times.sort(function (a, b) {  return a - b;  });
    }

    protected getBestTime(times: number[]): String {
      const sortedTimes = this.getSortedTimes(times);
      if (sortedTimes[0] == null) {
        return "-";
      }

      return this.convertSecondsToMinutes(sortedTimes[0]);
  }

    protected getSecondBestTime(times: number[]): String {
      const sortedTimes = this.getSortedTimes(times);
      if (sortedTimes[1] == null) {
        return "-";
    }

      return this.convertSecondsToMinutes(sortedTimes[1]);
  }

    protected getThirdBestTime(times: number[]): String {
      const sortedTimes = this.getSortedTimes(times);
      if (sortedTimes[2] == null) {
        return "-";
    }

      return this.convertSecondsToMinutes(sortedTimes[2]);
  }

    protected getDisplayTime(minutes: number, secondes: number): String {
      if (secondes < 10) {
        return minutes + ":0" + secondes;

      } else {

      return minutes + ":" + secondes;
      }
  }

    protected getTitleWithoutFirstLetter(title: String): String {
      return title.substr(1, title.length - 1);
    }

    protected convertSecondsToMinutes(time: number): String {
        const minutes = Math.floor(time / 60);
        const secondes = time - minutes * 60;

        return this.getDisplayTime(minutes, secondes);
    }

  }
