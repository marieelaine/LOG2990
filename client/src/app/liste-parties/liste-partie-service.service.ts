import { Injectable } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListePartieServiceService {
  private readonly BASE_URL: string = "http://localhost:3000/partie/";
  private readonly GETLISTE_URL: string = this.BASE_URL + "getPartieSimple";
  private readonly DELETE_PARTIE_URL: string = this.BASE_URL + "delete/";

  constructor(
    private http: HttpClient
  ) { }

  public getListeImageSimple(): Observable<PartieSimple[]> {

      return this.http.get<PartieSimple[]>(this.GETLISTE_URL);
  }

  public async deletePartieSimple(partieId: string): Promise<Object> {

      console.log(partieId);
      console.log(this.DELETE_PARTIE_URL + partieId);

      return this.http.delete(this.DELETE_PARTIE_URL + partieId).toPromise();
  }
}
