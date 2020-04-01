import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogonComponent } from './Components/logon/logon.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LogoutComponent } from './Components/logout/logout.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'logon', component: LogonComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},

  {path: 'dashboard', component: DashboardComponent},

  {path: '**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
