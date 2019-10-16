import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
=======
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component'
=======
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component';
>>>>>>> ac96db2636bc641a7513daf527fd1f287964ab6f
>>>>>>> 1ae0f88ca7838ecad0ef35b69f1ec415ec0dc4a8

import { TokenInterceptor } from './token-interceptor';
import { EditorComponent } from './editor/editor.component';
import { CommonModule } from '@angular/common';

import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
<<<<<<< HEAD
    RegisterComponent,
    ProfileComponent,
    EditorComponent
=======
<<<<<<< HEAD
    AboutComponent
=======
    ProfileComponent
>>>>>>> ac96db2636bc641a7513daf527fd1f287964ab6f
>>>>>>> 1ae0f88ca7838ecad0ef35b69f1ec415ec0dc4a8
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    CommonModule
  ],
  providers: [HttpService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true
    }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
