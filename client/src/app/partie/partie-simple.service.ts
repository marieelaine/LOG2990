import { Injectable } from '@angular/core';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PartieSimpleService {
    private readonly BASE_URL: string = "http://localhost:3000/partieSimple/";
    private readonly GETPARTIE_URL: string = this.BASE_URL + "getPartieSimple/";

    constructor(
        private http: HttpClient
    ) { }

    public getPartieSimple(partieID: string): Observable<PartieSimple> {
        return this.http.get<PartieSimple>(this.GETPARTIE_URL + partieID);
    }
}
