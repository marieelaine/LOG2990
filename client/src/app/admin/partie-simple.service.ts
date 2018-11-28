import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PartieSimple } from "./dialog-simple/partie-simple";
import { Observable } from "rxjs";
import * as constantes from "../constantes";

@Injectable()
export class PartieSimpleService {
    public constructor(private _http: HttpClient) { }

    public register(partieSimple: PartieSimple): Observable<PartieSimple> {
        return this._http.post<PartieSimple>(constantes.AJOUTER_PARTIE_SIMPLE_URL, partieSimple, {
            observe: "body",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }
}
