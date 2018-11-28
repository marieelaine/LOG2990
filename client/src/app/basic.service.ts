import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { Message } from "../../../common/communication/message";
import * as constantes from "./constantes";

@Injectable()
export class BasicService {
    public constructor(private http: HttpClient) { }

    public basicGet(): Observable<Message> {

        return this.http.get<Message>(constantes.BASE_URL).pipe(
            catchError(this.handleError<Message>("basicGet"))
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
