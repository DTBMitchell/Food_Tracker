import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogonComponent } from './Controllers/logon/logon.component';
import { RegisterComponent } from './Controllers/register/register.component';
import { HomeComponent } from './Controllers/home/home.component';
import { DashboardComponent } from './Controllers/dashboard_components/dashboard/dashboard.component';
import { LogoutComponent } from './Controllers/logout/logout.component';
import { HeaderComponent } from './Controllers/header/header.component';
import { GoalsComponent } from './Controllers/dashboard_components/goals/goals.component';
import { WeightsComponent } from './Controllers/dashboard_components/weights/weights.component';


@NgModule({
  declarations: [
    AppComponent,
    LogonComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    LogoutComponent,
    HeaderComponent,
    GoalsComponent,
    WeightsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    JwtModule
    //BsDropdownModule
  ],
  providers: [
    //{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
