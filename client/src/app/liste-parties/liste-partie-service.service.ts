import { Injectable, ErrorHandler } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PartieMultiple } from '../admin/dialog-multiple/partie-multiple';
import * as route from '../constantes';
import { TempsUser } from '../admin/temps-user';

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

  public async reinitialiserTempsPartie(partieId: string, tempsSolo: Array<TempsUser>, tempsUnContreUn: Array<TempsUser>): Promise<void> {

    this.http.put(route.REINITIALISER_TEMPS_SIMPLE_URL + partieId, { tempsSolo, tempsUnContreUn }).toPromise()
    .catch(() => ErrorHandler);
  }

  public async reinitialiserTempsPartieMultiple(partieId: string, tempsSolo: Array<TempsUser>,
                                                tempsUnContreUn: Array<TempsUser>): Promise<void> {

    this.http.put(route.REINITIALISER_TEMPS_MULTIPLE_URL + partieId, { tempsSolo, tempsUnContreUn }).toPromise()
    .catch(() => ErrorHandler);
  }

  public getListePartieSimpleEnAttente(): Observable<string[]> {

    return this.http.get<string[]>(route.GET_PARTIE_SIMPLE_ATTENTE);
  }

  public addPartieSimpleEnAttente(partieId: string): Observable<string> {

    return this.http.post<string>(route.ADD_PARTIE_SIMPLE_ATTENTE, { partieId });
  }

  public deletePartieSimpleEnAttente(partieId: string): Observable<string> {

    return this.http.delete<string>(route.DELETE_PARTIE_SIMPLE_ATTENTE + partieId);
  }

  public getListePartieMultipleEnAttente(): Observable<string[]> {

    return this.http.get<string[]>(route.GET_PARTIE_MULTIPLE_ATTENTE);
  }

  public addPartieMultipleEnAttente(partieId: string): Observable<string> {

    return this.http.post<string>(route.ADD_PARTIE_MULTIPLE_ATTENTE, { partieId });
  }

  public deletePartieMultipleEnAttente(partieId: string): Observable<string> {

    return this.http.delete<string>(route.DELETE_PARTIE_MULTIPLE_ATTENTE + partieId);
  }
}
