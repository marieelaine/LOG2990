import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartieMultiple } from './dialog-multiple/partie-mutiple';
import { Observable } from 'rxjs';

@Injectable()
export class PartieMultipleService {
  private readonly BASE_URL: string = "http://127.0.0.1:3000/partie/";
  private readonly AJOUTER_URL: string = this.BASE_URL + "ajouter";

  constructor(private _http: HttpClient) { }

  private register(partieMultiple: PartieMultiple): Observable<Object> {
    return this._http.post(this.BASE_URL, partieMultiple, {

    });
  }
}
