import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./login-form/user";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
    private readonly BASE_URL: string = "http://localhost:3000/users/";
    private readonly AJOUTER_URL: string = this.BASE_URL + "ajouter";
    private readonly SUPPRIMER_URL: string = this.BASE_URL + "delete/";

    public constructor(private _http: HttpClient) { }

    public register(user: User): Observable<Object> {
        console.log(user);

        return this._http.post(this.AJOUTER_URL, user, {
            observe: "body",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }

    public async delete(username: string): Promise<Object> {
        return this._http.delete(this.SUPPRIMER_URL + username).toPromise();
    }
}
