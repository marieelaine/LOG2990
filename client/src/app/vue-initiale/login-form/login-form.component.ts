import { Component, OnInit, ErrorHandler } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../login-form/user";
import { UserService } from "../user.service";
import { myParams, myStyle } from "../../../assets/particles";
import { CookieService } from "ngx-cookie-service";

export const USER_URL: string = "http://localhost:3000/users/";

@Component({
    selector: "app-login-form",
    providers: [UserService],
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.css"]
})

export class LoginFormComponent implements OnInit {

    public loginForm: FormGroup;
    public usernameTaken: Boolean;

    // Paramètres de particles background
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;

    public constructor(private router: Router,
                       private userService: UserService,
                       private cookieService: CookieService) {
        this.loginForm = this.createFormGroup();
    }

    public ngOnInit(): void {
        this.myStyle = myStyle;
        this.myParams = myParams;

        if (this.cookieService.check("username")) {
            this.router.navigate(["/liste-parties"])
            .catch(() => ErrorHandler);
        }
    }

    protected onSubmit(): void {
        const username: string = this.loginForm.value.username;
        const result: User = new User(username);
        this.userService["register"](result)
            .subscribe(
                (data) => {
                    this.usernameTaken = false;
                    this.createCookie(username);
                    this.router.navigate(["/liste-parties"])
                    .catch(() => ErrorHandler);
                },
                (error) => {
                    console.error(error);
                    this.usernameTaken = true;
                });
    }

    private createFormGroup(): FormGroup {
        return new FormGroup({
            username: new FormControl("", [
                Validators.required,
                Validators.pattern("^[A-Za-z0-9]+$"),
                Validators.maxLength(12),
                Validators.minLength(3)
            ])
        });
    }

    private createCookie(username: string): void {
        this.cookieService.set("username", username);
    }
}
