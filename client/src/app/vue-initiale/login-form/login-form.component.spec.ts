//  import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//  import { LoginFormComponent } from './login-form.component';
//  import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//  import { HttpClientTestingModule } from '@angular/common/http/testing';
//  import { RouterTestingModule } from "@angular/router/testing";
//  import { ParticlesModule } from 'angular-particle';
//  import { CookieService } from 'ngx-cookie-service';

//  describe('LoginFormComponent', () => {
//   let component: LoginFormComponent;
//   let fixture: ComponentFixture<LoginFormComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ LoginFormComponent ],
//       imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, ParticlesModule ],
//       providers: [CookieService]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginFormComponent);
//     component = fixture.componentInstance;
//     component.ngOnInit();
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('form invalid when empty', () => {
//     expect(component.loginForm.valid).toBeFalsy();
//   });

//   // tslint:disable-next-line:max-func-body-length
//   it('username field validity', () => {
//     let errors = {};
//     const username = component.loginForm.controls['username'];
//     expect(username.valid).toBeFalsy();

//     // username field is required
//     errors = username.errors || {};
//     expect(errors['required']).toBeTruthy();

//     // Set username to something that doesn't respect the pattern
//     username.setValue("tEst10-;");
//     errors = username.errors || {};
//     expect(errors['required']).toBeFalsy();
//     expect(errors['pattern']).toBeTruthy();

//     // Set username to something that doesn't respect the pattern
//     username.setValue("tE");
//     errors = username.errors || {};
//     expect(errors['required']).toBeFalsy();
//     expect(errors['minlength']).toBeTruthy();

//     // Set username to something that doesn't respect the pattern
//     username.setValue("tEst10000000000");
//     errors = username.errors || {};
//     expect(errors['required']).toBeFalsy();
//     expect(errors['maxlength']).toBeTruthy();

//     // Set username to something correct
//     username.setValue("admiN1");
//     errors = username.errors || {};
//     expect(errors['required']).toBeFalsy();
//     expect(errors['minlength']).toBeFalsy();
//     expect(errors['maxlength']).toBeFalsy();
//     expect(errors['pattern']).toBeFalsy();
//   });

// });
