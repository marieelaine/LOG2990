import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VueMultipleComponent } from './vue-multiple.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {CookieService} from "ngx-cookie-service";

describe('VueMultipleComponent', () => {
  let component: VueMultipleComponent;
  let fixture: ComponentFixture<VueMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VueMultipleComponent ],
      imports: [
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      providers: [
          CookieService
      ]
    });

    fixture = TestBed.createComponent(VueMultipleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
