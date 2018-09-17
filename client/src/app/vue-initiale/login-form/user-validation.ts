import { Directive, forwardRef, Injectable } from "@angular/core";
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from "@angular/forms";
import { catchError, map } from "rxjs/operators";
import { UserService } from "./user.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UniqueUserValidator implements AsyncValidator {
  public constructor(private userService: UserService) {}

//   public validate(
//     ctrl: AbstractControl
//   ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//     return this.userService.isUserTaken(ctrl.value).pipe(
//       map((isTaken) => (isTaken ? { uniqueAlterEgo: true } : null)),
//       catchError(() => null)
//     );
//   }
// }

@Directive({
  selector: "[appUniqueAlterEgo]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUserValidator),
      multi: true
    }
  ]
})
export class UniqueUserValidatorDirective {
  public constructor(private validator: UniqueUserValidator) {}

  public validate(control: AbstractControl): void {
    this.validator.validate(control);
  }
}
