import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../login-form/user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../user.service";
import { ParticlesModule } from 'angular-particle';
import { myParams, myStyle } from "../../../assets/particles";
import { CookieService } from "ngx-cookie-service";

export const USER_URL: string = "http://localhost:3000/users/";
const URL_AJOUTER: string = USER_URL + "ajouter/";

@Component({
    selector: "app-login-form",
    providers: [UserService],
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.css"]
})

export class LoginFormComponent implements OnInit {

    public loginForm: FormGroup;
    public usernameTaken: Boolean;

    // Parametres de particles background
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;

    public constructor(private router: Router,
                       private http: HttpClient,
                       private userService: UserService,
                       private cookieService: CookieService) {
        this.loginForm = this.createFormGroup();
    }

    public onSubmit(): void {
        const username: string = this.loginForm.value.username;
        const result: User = new User(username);
        this.userService.register(result)
            .subscribe(
                (data) => {
                    this.usernameTaken = false;
                    this.createCookie(username);
                    this.router.navigate(["/liste-parties"]);
                },
                (error) => {
                    console.error(error);
                    this.usernameTaken = true;
                });
    }

    public createFormGroup(): FormGroup {
        return new FormGroup({
            username: new FormControl("", [
                Validators.required,
                Validators.pattern("^[A-Za-z0-9]+$"),
                Validators.maxLength(12),
                Validators.minLength(3)
            ])
        });
    }

    public createCookie(username: string): void {
        this.cookieService.set("username", username);
    }

    public ngOnInit(): void {
        this.myStyle = myStyle;
        this.myParams = myParams;
    }

    public obtenirUserId(identifiant: string): Observable<User> {
        return this.http.get<User>(USER_URL + identifiant);
    }

    public obtenirUserName(username: string): Observable<User> {
        return this.http.get<User>(USER_URL + username);
    }

    public async creerNouveauUser(user: User): Promise<Object> {
        return this.http.post(URL_AJOUTER, user).toPromise();
    }
}
