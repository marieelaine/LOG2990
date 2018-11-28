import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./login-form/user";
import { Observable } from "rxjs";
import * as constantes from "../constantes";

@Injectable()
export class UserService {
    public constructor(private _http: HttpClient) { }

    public register(user: User): Observable<User> {

        return this._http.post<User>(constantes.AJOUTER_USERS_URL, user, {
            observe: "body",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }

    public async delete(username: string): Promise<string> {
        const id: Observable<string> = this._http.delete<string>( constantes.DELETE_USERS_URL + username);

        return id.toPromise();
    }
}
