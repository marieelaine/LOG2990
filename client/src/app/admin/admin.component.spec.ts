import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminComponent } from "./admin.component";
import { MatMenuModule, MatToolbarModule, MatCardModule, MatDialogModule } from "@angular/material";
import { ListePartiesComponent } from "../liste-parties/liste-parties.component";
import { PartieSimpleComponent } from "../liste-parties/partie-simple/partie-simple.component";
import { PartieMultipleComponent } from "../liste-parties/partie-multiple/partie-multiple.component";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

describe("AdminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent, ListePartiesComponent, PartieSimpleComponent, PartieMultipleComponent ],
      imports: [MatMenuModule, MatToolbarModule, MatCardModule, RouterTestingModule, MatDialogModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // it("should open dialog-simple on simple game click", () => {
  //   const addGameButton = fixture.debugElement.query(By.css('#addGameButton')).nativeElement;
  //   addGameButton.dispatchEvent(new Event('click'));

  //   const dialogueSimpleBouton = fixture.debugElement.query(By.css('#dialogueSimpleBouton')).nativeElement;
  //   spyOn(component, 'openDialogSimple');
  //   dialogueSimpleBouton.dispatchEvent(new Event('click'));
  //   expect(component.openDialogSimple).toHaveBeenCalled();
  // });

  // it('call user.signIn() once sign in button is pressed', async () => {
  //     button.click();
  //     const mockUser = TestBed.get(UserService);
  //     dom.parentNode.querySelector('#userSignIn').click();
  //     expect(mockUser['signIn']).toHaveBeenCalled();
  // });
});
