import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
<<<<<<< HEAD
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path :'',component:HomeComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profile', component: ProfileComponent}
=======
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path :'dashboard',component:HomeComponent, canActivate:[AuthGuard], children: [
    {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
>>>>>>> 6a01dde50a505c4607ff3ff72c76324917e25586
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
