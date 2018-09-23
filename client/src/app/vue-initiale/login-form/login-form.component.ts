import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User} from "../login-form/user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../user.service";
declare var particlesJS: any;

export const USER_URL: string = "http://localhost:3000/users/";
const URL_AJOUTER_PISTE: string = USER_URL + "ajouter/";

@Component({
  selector: "app-login-form",
  providers: [UserService],
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})

export class LoginFormComponent implements OnInit {

  private BASE_URL: string = "http://localhost:3000/";
  public loginForm: FormGroup;
  public usernameTaken: Boolean;

  public constructor(private router: Router, private http: HttpClient, private userService: UserService) {
    this.loginForm = this.createFormGroup();
  }

  public onSubmit(): void {
    const result: User = Object.assign({}, this.loginForm.value);
    this.userService.register(JSON.stringify(this.loginForm.value))
    .subscribe(
    (data) => {
      console.log(data);
      this.router.navigate(["/liste-parties"]);
      this.usernameTaken = true;
    },
    (error) => {
      console.error(error);
      this.usernameTaken = false;
    }
    );
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

  public obtenirUserId(identifiant: string): Observable<User> {
    return this.http.get<User>(USER_URL + identifiant);
  }

  public obtenirUserName(username: string): Observable<User> {
    return this.http.get<User>(USER_URL + username);
  }

  public async creerNouveauUser(user: User): Promise<Object> {
    return this.http.post(URL_AJOUTER_PISTE, user).toPromise();
  }

}
