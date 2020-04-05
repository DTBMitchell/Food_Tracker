import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogonComponent } from './Components/logon/logon.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { GoalsComponent } from './Components/goals/goals.component';
import { WeightsComponent } from './Components/weights/weights.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'logon', component: LogonComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'goals', component: GoalsComponent},
  {path: 'weights', component:WeightsComponent},

  {path: 'dashboard', component: DashboardComponent},

  {path: '**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
