import { TestBed, inject } from "@angular/core/testing";

import { UserService } from "../vue-initiale/user.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(UserService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
