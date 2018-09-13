import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { HeaderComponent } from "./common/header/header.component";
import { VueInitialeComponent } from "./vue-initiale/vue-initiale.component";
import { AdminComponent } from "./admin/admin.component";

const appRoutes: Routes = [
  { path: "", component: VueInitialeComponent },
  { path: "header", component: HeaderComponent },
  { path: "admin", component: AdminComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VueInitialeComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [BasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
