import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  // tslint:disable-next-line:no-any
  register(body: any) {
    return this._http.post("http://127.0.0.1:3000/users/ajouter", body, {
      observe: "body",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
