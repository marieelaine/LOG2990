import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./login-form/user";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
    private readonly BASE_URL: string = "http://127.0.0.1:3000/users/";
    private readonly AJOUTER_URL: string = this.BASE_URL + "ajouter";
    private readonly SUPPRIMER_URL: string = this.BASE_URL + "delete/";

    // Pour le prochain sprint.
    // private usernameCourantSujet: BehaviorSubject<string> = new BehaviorSubject<string>("");
    // private usernameCourantObservable$: Observable<string> = this.usernameCourantSujet.asObservable();

    constructor(private _http: HttpClient) { }

    public register(user: User): Observable<Object> {
        return this._http.post(this.AJOUTER_URL, user, {
            observe: "body",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        });
    }

    public delete(username: string): Promise<Object> {
        return this._http.delete(this.SUPPRIMER_URL + username).toPromise();
    }

    // Pour le prochain sprint.
    // public envoieNouveauUser(nouveauUsername: string): void {
        // this.usernameCourantSujet.next(nouveauUsername);
    // }

    // Pour le prochain sprint.
    // public recevoirNouveauUser(): Observable<string> {
    //     return this.usernameCourantObservable$;
    // }
}
