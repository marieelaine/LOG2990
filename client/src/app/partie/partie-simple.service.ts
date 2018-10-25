import { Injectable } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PartieSimpleService {
    private readonly BASE_URL: string = "http://localhost:3000/partieSimple/";
    private readonly GETPARTIE_URL: string = this.BASE_URL + "getPartieSimple/";
    private readonly VERIF_URL: string = this.BASE_URL + "coordDiff/";


    constructor(
        private http: HttpClient
    ) { }

    public getPartieSimple(partieID: string): Observable<PartieSimple> {

        return this.http.get<PartieSimple>(this.GETPARTIE_URL + partieID);
    }

    public verifierDiff(coords: Array<string>): Observable<Object> {
        return this.http.post(this.VERIF_URL, coords, {
            observe: "body",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }
}
