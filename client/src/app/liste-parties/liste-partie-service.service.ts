import { Injectable } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListePartieServiceService {
  private readonly BASE_URL: string = "http://localhost:3000/partieSimple/";
  private readonly GETLISTE_URL: string = this.BASE_URL + "getListePartieSimple";
  private readonly DELETE_PARTIE_URL: string = this.BASE_URL + "delete/";
  private readonly REINITIALISER_TEMPS_URL: string = this.BASE_URL + "reinitialiseTemps/";

  constructor(
    private http: HttpClient
  ) { }

  public getListeImageSimple(): Observable<PartieSimple[]> {

      return this.http.get<PartieSimple[]>(this.GETLISTE_URL);
  }

  public async deletePartieSimple(partieId: string): Promise<void> {

      this.http.delete(this.DELETE_PARTIE_URL + partieId).toPromise();
  }

  public async reinitialiserTempsPartie(partieId: string): Promise<void> {

    this.http.get(this.REINITIALISER_TEMPS_URL + partieId).toPromise();
  }
}
