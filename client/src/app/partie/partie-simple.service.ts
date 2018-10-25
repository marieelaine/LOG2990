import { Injectable } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { PartieMultiple } from '../admin/dialog-multiple/partie-multiple';

@Injectable({
    providedIn: 'root'
})
export class PartieSimpleService {
    private readonly BASE_URL_SIMPLE: string = "http://localhost:3000/partieSimple/";
    private readonly GETPARTIESIMPLE_URL: string = this.BASE_URL_SIMPLE + "getPartieSimple/";
    private readonly BASE_URL_MULTIPLE: string = "http://localhost:3000/partiemultiple/";
    private readonly GETPARTIEMULTIPLE_URL: string = this.BASE_URL_MULTIPLE + "getPartieMultiple/";

    constructor(
        private http: HttpClient
    ) { }

    public getPartieSimple(partieID: string): Observable<PartieSimple> {
        return this.http.get<PartieSimple>(this.GETPARTIESIMPLE_URL + partieID);
    }

    public getPartieMultiple(partieID: string): Observable<PartieMultiple> {
        return this.http.get<PartieMultiple>(this.GETPARTIEMULTIPLE_URL + partieID);
    }
}
