import { Injectable, ErrorHandler } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PartieMultiple } from '../admin/dialog-multiple/partie-multiple';

@Injectable({
  providedIn: 'root'
})
export class ListePartieServiceService {
  private readonly BASE_URL: string = "http://localhost:3000/";
  private readonly SIMPLE: string = "partieSimple/";
  private readonly MULTIPLE: string = "partieMultiple/";
  private readonly GET_LISTE_SIMPLE_URL: string = this.BASE_URL + this.SIMPLE + "getListePartieSimple";
  private readonly GET_LISTE_MULTIPLE_URL: string = this.BASE_URL + this.MULTIPLE + "getListePartieMultiple";
  private readonly DELETE_PARTIE_SIMPLE_URL: string = this.BASE_URL + this.SIMPLE + "delete/";
  private readonly DELETE_PARTIE_MULTIPLE_URL: string = this.BASE_URL + this.MULTIPLE + "delete/";
  private readonly REINITIALISER_TEMPS_SIMPLE_URL: string = this.BASE_URL + this.SIMPLE + "reinitialiseTemps/";
  private readonly REINITIALISER_TEMPS_MULTIPLE_URL: string = this.BASE_URL + this.MULTIPLE + "reinitialiseTemps/";

  // public listePartieSimple: PartieSimple[];
  // public listePartieMultiple: Array<PartieMultiple>;

  constructor( private http: HttpClient ) {}

  public getListePartieSimple(): Observable<PartieSimple[]> {

      return this.http.get<PartieSimple[]>(this.GET_LISTE_SIMPLE_URL);
  }

  public async deletePartieSimple(partieId: string): Promise<void> {

    this.http.delete(this.DELETE_PARTIE_SIMPLE_URL + partieId).toPromise()
      .catch(() => ErrorHandler);
  }

  public getListePartieMultiple(): Observable<PartieMultiple[]> {

    return this.http.get<PartieMultiple[]>(this.GET_LISTE_MULTIPLE_URL);
  }

  public async deletePartieMultiple(partieId: string): Promise<void> {

    this.http.delete(this.DELETE_PARTIE_MULTIPLE_URL + partieId).toPromise()
    .catch(() => ErrorHandler);
  }

  public async reinitialiserTempsPartie(partieId: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>): Promise<void> {

    this.http.put(this.REINITIALISER_TEMPS_SIMPLE_URL + partieId, { tempsSolo, tempsUnContreUn}).toPromise()
    .catch(() => ErrorHandler);
  }

  public async reinitialiserTempsPartieMultiple(partieId: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>): Promise<void> {

    this.http.put(this.REINITIALISER_TEMPS_MULTIPLE_URL + partieId, { tempsSolo, tempsUnContreUn}).toPromise()
    .catch(() => ErrorHandler);
  }
}
