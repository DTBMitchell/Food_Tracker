import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogonComponent } from './Components/logon/logon.component';
import { RegisterComponent } from './Components/register/register.component';


const routes: Routes = [
  {path: '', component: LogonComponent},
  {path: 'logon', component: LogonComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
