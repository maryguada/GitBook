import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path :'dashboard',component:HomeComponent, canActivate:[AuthGuard], children: [
    {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
    {path: 'profile', component: ProfileComponent},
=======
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'/login'},
  {path :'',component:HomeComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'editor', component: EditorComponent}

>>>>>>> f7fb1ea4c594b846bef54d473c0ba95176e17f32
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
