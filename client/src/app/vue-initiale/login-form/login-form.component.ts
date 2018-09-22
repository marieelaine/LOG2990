import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User} from "../login-form/user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
declare var particlesJS: any;

export const USER_URL: string = "http://localhost:3000/users/";
const URL_AJOUTER_PISTE: string = USER_URL + "ajouter/";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})

export class LoginFormComponent implements OnInit {

  public BASE_URL: string = "http://localhost:3000/";
  public loginForm: FormGroup;

  public constructor(private router: Router, private http: HttpClient) {
    this.loginForm = this.createFormGroup();
  }

  public onSubmit(): void {
    const result: User = Object.assign({}, this.loginForm.value);
    this.creerNouveauUser(result);
    this.router.navigateByUrl("/liste-parties");
 }

  public createFormGroup(): FormGroup {
    return new FormGroup({
        username: new FormControl("", [
          Validators.pattern("^[A-Za-z\d]+$")
        ])
    });
  }

  // tslint:disable-next-line:typedef
  public ngOnInit() {
    particlesJS.load("particles-js", "assets/particles.json", null);
  }

  public obtenirUser(identifiant: string): Observable<User> {
    return this.http.get<User>(USER_URL + identifiant);
  }

  public async creerNouveauUser(user: User): Promise<Object> {
    return this.http.post(URL_AJOUTER_PISTE, user).toPromise();
  }

}
