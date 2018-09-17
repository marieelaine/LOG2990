import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { User, PersonalData} from "../login-form/user";
declare var particlesJS: any;

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public userList: Array<User>;

  public constructor(private router: Router) {
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
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(12),
          Validators.pattern("^[A-Za-z\d]+$")
        ])
      })
    });
  }

  // tslint:disable-next-line:typedef
  public ngOnInit() {
    particlesJS.load("particles-js", "assets/particles.json", null);
  }

  public get username(): any {
    return this.loginForm.get("username");
  }

}
