import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Location } from "@angular/common";
import { ListePartiesComponent } from '../../liste-parties/liste-parties.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../vue-initiale/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, ListePartiesComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [MatToolbarModule, RouterTestingModule.withRoutes([
        { path: "liste-parties", component: ListePartiesComponent },
        { path: "header", component: HeaderComponent },
      ]),       HttpClientTestingModule],
      providers: [CookieService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('click header title redirects you to /liste-parties', fakeAsync(() => {
//     component.OnHeaderTitleClick();
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       expect(location.path()).toBe('/liste-parties');
//     });
//   }));
});
