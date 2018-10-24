import { Injectable } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PartieMultiple } from '../admin/dialog-multiple/partie-mutiple';

@Injectable({
  providedIn: 'root'
})
export class ListePartieServiceService {
  private readonly BASE_URL: string = "http://localhost:3000/";
  private readonly GET_LISTE_SIMPLE_URL: string = this.BASE_URL + "partieSimple/getListePartieSimple";
  private readonly GET_LISTE_MULTIPLE_URL: string = this.BASE_URL + "partieMultiple/getListePartieMultiple";
  private readonly DELETE_PARTIE_SIMPLE_URL: string = this.BASE_URL + "partieSimple/delete/";
  private readonly REINITIALISER_TEMPS_SIMPLE_URL: string = this.BASE_URL + "partieSimple/reinitialiseTemps/";
  private readonly REINITIALISER_TEMPS_MULTIPLE_URL: string = this.BASE_URL + "partieMultiple/reinitialiseTemps/";

  constructor( private http: HttpClient ) {}

  public getListePartieSimple(): Observable<PartieSimple[]> {

      return this.http.get<PartieSimple[]>(this.GET_LISTE_SIMPLE_URL);
  }

  public async deletePartieSimple(partieId: string): Promise<void> {

      this.http.delete(this.DELETE_PARTIE_SIMPLE_URL + partieId).toPromise();
  }

  public getListePartieMultiple(): Observable<PartieMultiple[]> {

    return this.http.get<PartieMultiple[]>(this.GET_LISTE_MULTIPLE_URL);
  }

  // public async deletePartieMultiple(): Observable<PartieMultiple[]> {

  //   this.http.delete
  // }

  public async reinitialiserTempsPartie(partieId: string): Promise<void> {

    this.http.get(this.REINITIALISER_TEMPS_SIMPLE_URL + partieId).toPromise();
  }

  public async reinitialiserTempsPartieMultiple(partieId: string): Promise<void> {

    this.http.get(this.REINITIALISER_TEMPS_MULTIPLE_URL + partieId).toPromise();
  }
}
