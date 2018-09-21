import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User} from "../login-form/user";
import { HttpClient } from "@angular/common/http";
declare var particlesJS: any;

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})

export class LoginFormComponent implements OnInit {

  public BASE_URL: string = "http://localhost:3000/";
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public userList: Array<User>;

  public constructor(private router: Router, private http: HttpClient) {
    this.loginForm = this.createFormGroup();
  }

  public onSubmit(): void {
    this.submitted = true;
    const result: User = Object.assign({}, this.loginForm.value);
    result.personalData = Object.assign({}, result.personalData);
    this.router.navigateByUrl("/liste-parties");
 }

  public createFormGroup(): FormGroup {
    return new FormGroup({
      personalData: new FormGroup({
        username: new FormControl("", [
          Validators.pattern("^[A-Za-z\d]+$")
        ])
      })
    });
  }

  // tslint:disable-next-line:typedef
  public ngOnInit() {
    particlesJS.load("particles-js", "assets/particles.json", null);
  }

  // public checkUsername(): Boolean {
  //   return this.http.get<string>(this.BASE_URL).pipe(
  //       catchError(this.handleError<Boolean>("checkUsername"))
  //   );
  // }
}
