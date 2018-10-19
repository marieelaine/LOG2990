import { Injectable } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListePartieServiceService {
  private readonly BASE_URL: string = "http://127.0.0.1:3000/partie/";
  private readonly GETLISTE_URL: string = this.BASE_URL + "getListe";

  constructor(
    private http: HttpClient
  ) { }

  public getListeImageSimple(): Observable<PartieSimple> {

      return(this.http.get<PartieSimple>(this.GETLISTE_URL));
  }
}
