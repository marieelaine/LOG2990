import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "./login-form/user";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  userCourant: User;
  constructor(private _http: HttpClient) { }

  public register(user: User): Observable<Object> {

    this.userCourant = user;

    return this._http.post("http://127.0.0.1:3000/users/ajouter", user, {
      observe: "body",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

  // tslint:disable-next-line:no-any
  public delete() {
    return this._http.delete("http://127.0.0.1:3000/users/delete" + this.userCourant.id).toPromise();
  }
}
