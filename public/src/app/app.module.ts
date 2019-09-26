import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component'
=======
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component';
>>>>>>> ac96db2636bc641a7513daf527fd1f287964ab6f


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
<<<<<<< HEAD
    AboutComponent
=======
    ProfileComponent
>>>>>>> ac96db2636bc641a7513daf527fd1f287964ab6f
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
