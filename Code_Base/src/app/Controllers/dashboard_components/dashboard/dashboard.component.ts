import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/authApi.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: '../../../Views/dashboard_components/dashboard/dashboard.component.html',
  styleUrls: ['../../../Views/dashboard_components/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: AuthApiService, private router: Router) { }

  ngOnInit(): void {
    if(!this.apiService.isLoggedIn()){
      this.router.navigateByUrl('/logon');
    }
  }

}
