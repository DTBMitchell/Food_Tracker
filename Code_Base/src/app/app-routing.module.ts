import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogonComponent } from './Controllers/logon/logon.component';
import { RegisterComponent } from './Controllers/register/register.component';
import { HomeComponent } from './Controllers/home/home.component';
import { DashboardComponent } from './Controllers/dashboard_components/dashboard/dashboard.component';
import { LogoutComponent } from './Controllers/logout/logout.component';
import { GoalsComponent } from './Controllers/dashboard_components/goals/goals.component';
import { WeightsComponent } from './Controllers/dashboard_components/weights/weights.component';
import { DashboardHomeComponent } from './Controllers/dashboard_components/dashboard-home/dashboard-home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'logon', component: LogonComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  //{path: 'goals', component: GoalsComponent},
  //{path: 'weights', component:WeightsComponent},

  {path: 'dashboard', 
  component: DashboardComponent,
  children:[
    {path: 'home', component:DashboardHomeComponent},
    {path: 'weights', component:WeightsComponent},
    {path: 'goals', component: GoalsComponent},


    {path: '**', component:DashboardHomeComponent}
  ]},

  {path: '**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
