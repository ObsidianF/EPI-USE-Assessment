import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { IssueCreateComponent } from './issue/issue-create/issue-create.component';
import { IssueDisplayComponent } from './issue/issue-display/issue-display.component';
import { LoginComponent } from './auth/login/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {ErrorInteceptor} from "./error/error/error.inteceptor";
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from  '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox'

import { MatButtonModule } from '@angular/material/button';

import {MatToolbarModule} from '@angular/material/toolbar';





import {MatNativeDateModule} from '@angular/material/core';

import { GravatarModule, GravatarConfig, FALLBACK, RATING } from 'ngx-gravatar';

const gravatarConfig: GravatarConfig = {
	// fallback: FALLBACK_TYPES.retro,
	// hasBorder: true,
	// borderColor: "rgba(255, 0, 0, 0.4)",
  rating: RATING.pg
}

@NgModule({
  declarations: [
    AppComponent,
    IssueCreateComponent,
    IssueDisplayComponent,
    LoginComponent,
    LoginComponent,
    ErrorComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTreeModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    GravatarModule,
    MatButtonModule,
    MatToolbarModule
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInteceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
