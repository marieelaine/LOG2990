import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "./login-form/user";
import { Observable, Subject } from "rxjs";

@Injectable()
export class UserService {
  private userCourantSujet: Subject<User> = new Subject<User>();
  private userCourantObservable$: Observable<User> = this.userCourantSujet.asObservable();

  constructor(private _http: HttpClient) { }

  public register(user: User): Observable<Object> {

    return this._http.post("http://127.0.0.1:3000/users/ajouter", user, {
      observe: "body",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

  public delete(): Promise<Object> {
    return this._http.delete("http://127.0.0.1:3000/users/delete").toPromise();
  }

  public envoieNouveauUser(nouveauUser: User): void {
    this.userCourantSujet.next(nouveauUser);
  }

  public recevoirNouveauUser(): Observable<User> {
    return this.userCourantObservable$;
  }
}
