import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path :'user',component:HomeComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'about', component: AboutComponent},
    {path:'profile/:id', component:ProfileComponent}
    ]},
  {path: '', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
