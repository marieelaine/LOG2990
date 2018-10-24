import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PartieMultiple } from './dialog-multiple/partie-mutiple';
import { Observable } from 'rxjs';

@Injectable()
export class PartieMultipleService {
  private readonly BASE_URL: string = "http://localhost:3000/partieMultiple/";
  private readonly AJOUTER_URL: string = this.BASE_URL + "ajouter";

  constructor(private _http: HttpClient) { }

  public register(partieMultiple: PartieMultiple): Observable<Object> {
    console.log("allo du register dans service");
    console.log(partieMultiple);

    return this._http.post(this.AJOUTER_URL, partieMultiple, {
      observe: "body",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
