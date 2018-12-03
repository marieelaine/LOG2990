import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PartieSimple } from "./dialog-simple/partie-simple";
import { Observable } from "rxjs";
import * as constantes from "../constantes";

const HTTP_HEADER_NAME: string = "Content-Type";
const HTTP_HEADER_VALUE: string = "application/json";

@Injectable()
export class PartieSimpleService {
    public constructor(private _http: HttpClient) { }

    public register(partieSimple: PartieSimple): Observable<PartieSimple> {
        return this._http.post<PartieSimple>(constantes.AJOUTER_PARTIE_SIMPLE_URL, partieSimple, {
            observe: "body",
            headers: new HttpHeaders().append(HTTP_HEADER_NAME, HTTP_HEADER_VALUE)
        });
    }
}
