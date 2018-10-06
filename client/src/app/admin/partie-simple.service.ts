import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PartieSimple } from "./dialog-simple/partie-simple";
import { Observable } from "rxjs";

@Injectable()
export class PartieSimpleService {
    private readonly BASE_URL: string = "http://127.0.0.1:3000/images/";
    private readonly AJOUTER_URL: string = this.BASE_URL + "ajouter";
    private readonly SUPPRIMER_URL: string = this.BASE_URL + "delete/";

    constructor(private _http: HttpClient) { }

    public register(partieSimple: PartieSimple): Observable<Object> {
        return this._http.post(this.AJOUTER_URL, partieSimple, {
            observe: "body",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }

    public delete(partieSimple: string): Promise<Object> {
        return this._http.delete(this.SUPPRIMER_URL + partieSimple).toPromise();
    }
}
