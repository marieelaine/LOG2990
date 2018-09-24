 import { async, ComponentFixture, TestBed } from '@angular/core/testing';

 import { LoginFormComponent } from './login-form.component';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 import { HttpClientTestingModule } from '@angular/common/http/testing';
 import { RouterTestingModule } from "@angular/router/testing";
 import { ParticlesModule } from 'angular-particle';

 describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, ParticlesModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should", () => {

  });
});
