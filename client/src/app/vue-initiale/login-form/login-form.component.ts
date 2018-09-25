import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User} from "../login-form/user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../user.service";
import { ParticlesModule } from 'angular-particle';
import { myParams, myStyle } from "../../../assets/particles";

export const USER_URL: string = "http://localhost:3000/users/";
const URL_AJOUTER: string = USER_URL + "ajouter/";

@Component({
  selector: "app-login-form",
  providers: [UserService],
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})

export class LoginFormComponent implements OnInit, OnDestroy {

  private BASE_URL: string = "http://localhost:3000/";
  public loginForm: FormGroup;
  public usernameTaken: Boolean;

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  public constructor(private router: Router, private http: HttpClient, private userService: UserService) {
    this.loginForm = this.createFormGroup();
  }

  public onSubmit(): void {
    const result: User =  new User(this.loginForm.value.username);
    this.userService.register(result)
    .subscribe(
    (data) => {
      console.log(data);
      this.usernameTaken = false;
      this.router.navigate(["/liste-parties"]);
    },
    (error) => {
      console.error(error);
      this.usernameTaken = true;
    }
    );
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

  public ngOnInit(): void {
    this.myStyle = myStyle;
    this.myParams = myParams;
  }

  ngOnDestroy(): void {
    console.log("on destroy fonctionne");
    this.userService.delete();
    // tslint:disable-next-line:no-unused-expression
    (data) => {
      console.log(data);
    };
    // tslint:disable-next-line:no-unused-expression
    (error) => {
      console.error(error);
    };
  }

  // public obtenirUserId(identifiant: string): Observable<User> {
  //   return this.http.get<User>(USER_URL + identifiant);
  // }

  // public obtenirUserName(username: string): Observable<User> {
  //   return this.http.get<User>(USER_URL + username);
  // }

  // public async creerNouveauUser(user: User): Promise<Object> {
  //   return this.http.post(URL_AJOUTER, user).toPromise();
  // }

}
