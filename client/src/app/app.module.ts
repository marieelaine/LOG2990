import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppComponent} from "./app.component";
import {BasicService} from "./basic.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {SocketIoModule, SocketIoConfig} from "ng6-socket-io";
import {CookieService} from "ngx-cookie-service";
import {
    MatToolbarModule,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
} from "@angular/material";
import { ListePartiesComponent } from "./liste-parties/liste-parties.component";
import { HeaderComponent } from "./common/header/header.component";
import { VueInitialeComponent } from "./vue-initiale/vue-initiale.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginFormComponent } from "./vue-initiale/login-form/login-form.component";
import { DialogSimpleComponent } from "./admin/dialog-simple/dialog-simple.component";
import { DialogMultipleComponent } from "./admin/dialog-multiple/dialog-multiple.component";
import { ParticlesModule } from "angular-particle";
import { UserService } from "./vue-initiale/user.service";
import { PartieSimpleService } from "./admin/partie-simple.service";
import { ListePartieSimpleComponent } from "./liste-parties/liste-partie-simple/liste-partie-simple.component";
import { ListePartieMultipleComponent } from "./liste-parties/liste-partie-multiple/liste-partie-multiple.component";
import { VueMultipleComponent } from "./partie/vue-multiple/vue-multiple.component";
import { PartieMultipleService } from "./admin/partie-multiple.service";
import { DialogConfirmationComponent } from "./liste-parties/dialog-confirmation/dialog-confirmation.component";
import { SocketClientService } from "./socket/socket-client.service";
import { ListePartieServiceService } from "./liste-parties/liste-partie-service.service";
import { DialogErreurComponent } from "./admin/dialog-erreur/dialog-erreur.component";
import { DialogVueAttenteComponent } from "./liste-parties/dialog-vue-attente/dialog-vue-attente.component";
import { ChatComponent } from "./chat/chat.component";
import { VueSimpleComponent } from "./partie/vue-simple/vue-simple.component";
import { DialogFinPartieComponent } from "./partie/dialog-fin-partie/dialog-fin-partie.component";
import { NotifierService, NotifierModule } from "angular-notifier";
import { ChronoService } from "./chrono/chrono.service";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import * as constantes from "./constantes";

const config: SocketIoConfig = {url: constantes.BASE_URL, options: {}};

const appRoutes: Routes = [
    { path: "", component: VueInitialeComponent },
    { path: "header", component: HeaderComponent },
    { path: "admin", component: AdminComponent },
    { path: "liste-parties", component: ListePartiesComponent },
    { path: "partie-simple/:idPartie/:channelId", component: VueSimpleComponent },
    { path: "partie-multiple/:idPartie/:channelId", component: VueMultipleComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        VueInitialeComponent,
        AdminComponent,
        ListePartiesComponent,
        LoginFormComponent,
        ListePartieSimpleComponent,
        ListePartieMultipleComponent,
        DialogSimpleComponent,
        DialogMultipleComponent,
        VueMultipleComponent,
        DialogConfirmationComponent,
        DialogErreurComponent,
        DialogVueAttenteComponent,
        ChatComponent,
        VueSimpleComponent,
        DialogFinPartieComponent,
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
        NgbModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatDividerModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatBadgeModule,
        MatCheckboxModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        ParticlesModule,
        SocketIoModule.forRoot(config),
        NotifierModule,
        MatIconModule,
        NgxUiLoaderModule,
    ],
    providers: [
        BasicService,
        CookieService,
        UserService,
        ChronoService,
        PartieSimpleService,
        PartieMultipleService,
        SocketClientService,
        ListePartieServiceService,
        NotifierService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogSimpleComponent,
        DialogMultipleComponent,
        DialogConfirmationComponent,
        DialogErreurComponent,
        DialogVueAttenteComponent,
        DialogFinPartieComponent,
    ],
})
export class AppModule {
}
