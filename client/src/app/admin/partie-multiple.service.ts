import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PartieMultiple } from "./dialog-multiple/partie-multiple";
import { Observable } from "rxjs";
import * as constantes from "../constantes";

@Injectable()
export class PartieMultipleService {
  public constructor(private _http: HttpClient) { }

  public register(partieMultiple: PartieMultiple): Observable<PartieMultiple> {

    return this._http.post<PartieMultiple>(constantes.AJOUTER_PARTIE_MULTIPLE_URL, partieMultiple, {
      observe: "body",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
