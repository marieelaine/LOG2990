import { Injectable, ErrorHandler } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PartieMultiple } from '../admin/dialog-multiple/partie-multiple';
import * as route from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class ListePartieServiceService {

  constructor( private http: HttpClient ) {}

  public getListePartieSimple(): Observable<PartieSimple[]> {

      return this.http.get<PartieSimple[]>(route.GET_LISTE_SIMPLE_URL);
  }

  public async deletePartieSimple(partieId: string): Promise<void> {

    this.http.delete(route.DELETE_PARTIE_SIMPLE_URL + partieId).toPromise()
      .catch(() => ErrorHandler);
  }

  public getListePartieMultiple(): Observable<PartieMultiple[]> {

    return this.http.get<PartieMultiple[]>(route.GET_LISTE_MULTIPLE_URL);
  }

  public async deletePartieMultiple(partieId: string): Promise<void> {

    this.http.delete(route.DELETE_PARTIE_MULTIPLE_URL + partieId).toPromise()
    .catch(() => ErrorHandler);
  }

  public async reinitialiserTempsPartie(partieId: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>): Promise<void> {

    this.http.put(route.REINITIALISER_TEMPS_SIMPLE_URL + partieId, { tempsSolo, tempsUnContreUn}).toPromise()
    .catch(() => ErrorHandler);
  }

  public async reinitialiserTempsPartieMultiple(partieId: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>): Promise<void> {

    this.http.put(route.REINITIALISER_TEMPS_MULTIPLE_URL + partieId, { tempsSolo, tempsUnContreUn}).toPromise()
    .catch(() => ErrorHandler);
  }

  public async getListePartieSimpleEnAttente(): Promise<string[]> {

    return this.http.get<string[]>(route.GET_PARTIES_SIMPLE_ATTENTE).toPromise();
  }

  public async addPartieSimpleEnAttente(partieId: string): Promise<void> {

    this.http.post(route.ADD_PARTIES_SIMPLE_ATTENTE, partieId);
  }

  public async deletePartieSimpleEnAttente(partieId: string): Promise<void> {

    this.http.delete(route.DELETE_PARTIES_SIMPLE_ATTENTE + partieId);
  }
}
