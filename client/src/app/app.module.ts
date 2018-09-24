import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { MatToolbarModule,
        MatCardModule,
        MatBadgeModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
      } from '@angular/material';

import { ListePartiesComponent } from "./liste-parties/liste-parties.component";
import { ChronoComponent } from './chrono/chrono.component';
import { PartieSoloComponent } from './partie-solo/partie-solo.component';
import { HeaderComponent } from "./common/header/header.component";
import { VueInitialeComponent } from "./vue-initiale/vue-initiale.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginFormComponent } from "./vue-initiale/login-form/login-form.component";
import { PartieSimpleFonctions } from './liste-parties/partie-simple/partie-simple.component';
import { PartieMultipleFonctions } from './liste-parties/partie-multiple/partie-multiple.component';
import { DialogSimpleComponent } from './admin/dialog-simple/dialog-simple.component';
import { DialogMultipleComponent } from './admin/dialog-multiple/dialog-multiple.component';
import { ParticlesModule } from "angular-particle";

const appRoutes: Routes = [
  { path: "", component: VueInitialeComponent },
  { path: "header", component: HeaderComponent },
  { path: "admin", component: AdminComponent },
  { path: "liste-parties", component: ListePartiesComponent },
  { path: "chrono", component: ChronoComponent },
  { path: "partie-solo", component: PartieSoloComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VueInitialeComponent,
    AdminComponent,
    AppComponent,
    ListePartiesComponent,
    LoginFormComponent,
    ChronoComponent,
    PartieSoloComponent,
    PartieSimpleFonctions,
    PartieMultipleFonctions,
    DialogSimpleComponent,
    DialogMultipleComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ParticlesModule
  ],
  providers: [BasicService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogSimpleComponent,
    DialogMultipleComponent
  ]
})
export class AppModule { }
