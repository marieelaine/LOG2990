import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

const USERS: Array<String> = ["Eric"];

@Injectable({ providedIn: "root" })
export class UserService {
  public isUserTaken(user: string): Observable<boolean> {
    const isTaken: boolean = USERS.includes(user);

    return of(isTaken).pipe(delay(400));
  }
}