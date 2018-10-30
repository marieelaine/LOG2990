import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { UserService } from "../vue-initiale/user.service";
import { User } from "./login-form/user";
import { Form } from '@angular/forms';

describe("UserService", () => {
  const responseForm = '<form />';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
  });

  it("should be created", () => {
    const service = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('POST request should be called with proper arguments', () => {
    const service = TestBed.get(UserService);
    const http = TestBed.get(HttpTestingController);
    let loginResponse;
    const user = new User("username");

    service.register(user).subscribe((response) => {
      loginResponse = response;
    });

    http.expectOne({
      url: 'http://127.0.0.1:3000/users/ajouter',
      method: 'POST'
    }).flush(responseForm);

    expect(loginResponse).toEqual(responseForm);
  });

});
