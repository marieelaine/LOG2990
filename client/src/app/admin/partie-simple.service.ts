import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PartieSimple } from "./dialog-simple/partie-simple";
import { Observable } from "rxjs";

@Injectable()
export class PartieSimpleService {
    private readonly BASE_URL: string = "http://127.0.0.1:3000/partieSimple/";
    private readonly AJOUTER_URL: string = this.BASE_URL + "ajouter";

    constructor(private _http: HttpClient) { }

    public register(partieSimple: PartieSimple): Observable<PartieSimple> {
        return this._http.post<PartieSimple>(this.AJOUTER_URL, partieSimple, {
            observe: "body",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }
}
