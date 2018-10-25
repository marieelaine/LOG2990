import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {MatRadioModule} from '@angular/material/radio';
import { ModalModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { SocketIoModule, SocketIoConfig } from 'ng6-socket-io';

import { CookieService } from "ngx-cookie-service";

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
import { HeaderComponent } from "./common/header/header.component";
import { VueInitialeComponent } from "./vue-initiale/vue-initiale.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginFormComponent } from "./vue-initiale/login-form/login-form.component";
import { DialogSimpleComponent } from './admin/dialog-simple/dialog-simple.component';
import { DialogMultipleComponent } from './admin/dialog-multiple/dialog-multiple.component';
import { ParticlesModule } from "angular-particle";
import { UserService } from "./vue-initiale/user.service";
import { PartieSimpleService } from "./admin/partie-simple.service";
import { ListePartieSimpleComponent } from "./liste-parties/liste-partie-simple/liste-partie-simple.component";
import { ListePartieMultipleComponent } from "./liste-parties/liste-partie-multiple/liste-partie-multiple.component";
import { PartieSoloComponent } from "./partie/vue-simple/partie-solo/partie-solo.component";
import { PartieMultijoueurComponent } from './partie/partie-multijoueur/partie-multijoueur.component';
import { VueMultipleComponent } from './partie/vue-multiple/vue-multiple.component';
import { ImageComponent } from './partie/image/image.component';
import { PartieMultipleService } from "./admin/partie-multiple.service";

const config: SocketIoConfig = { url: 'http://localhost:4200', options: {} };

const appRoutes: Routes = [
  { path: "", component: VueInitialeComponent },
  { path: "header", component: HeaderComponent },
  { path: "admin", component: AdminComponent },
  { path: "liste-parties", component: ListePartiesComponent },
  { path: "chrono", component: ChronoComponent },
  { path: "partie-solo/:idPartie", component: PartieSoloComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VueInitialeComponent,
    AdminComponent,
    ListePartiesComponent,
    LoginFormComponent,
    ChronoComponent,
    PartieSoloComponent,
    ListePartieSimpleComponent,
    ListePartieMultipleComponent,
    DialogSimpleComponent,
    DialogMultipleComponent,
    PartieMultijoueurComponent,
    VueMultipleComponent,
    ImageComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes // <-- debugging purposes only
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
    ParticlesModule,
    MatRadioModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [BasicService,
              CookieService,
              UserService,
              PartieSimpleService,
              PartieMultipleService],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogSimpleComponent,
    DialogMultipleComponent,
  ]
})
export class AppModule { }
