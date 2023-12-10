import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarListComponent } from './components/car-list/car-list.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { CarDialogComponent } from './components/car-dialog/car-dialog.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    SignupComponent,
    CarDialogComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterOutlet,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
