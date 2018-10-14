import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { PartieSimpleInterface} from "../liste-parties/liste-partie-simple/liste-partie-simple.component";

@Injectable()
export class PartiesService {
    private readonly BASE_URL: string = "http://127.0.0.1:3000/parties/";
    private readonly AJOUTER_URL: string = this.BASE_URL + "ajouter";
//    private readonly SUPPRIMER_URL: string = this.BASE_URL + "delete/";

    constructor(private _http: HttpClient) { }

    public register(partieSimple: PartieSimpleInterface): Observable<Object> {
        return this._http.post(this.AJOUTER_URL, partieSimple, {
            observe: "body",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }
}
