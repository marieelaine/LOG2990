import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './common/header/header.component';
import { VueInitialeComponent } from './vue-initiale/vue-initiale.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VueInitialeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
