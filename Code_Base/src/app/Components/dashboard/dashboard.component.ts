import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../authApi.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: AuthApiService, private router: Router) { }

  ngOnInit(): void {
    if(!this.apiService.isLoggedIn()){
      this.router.navigateByUrl('/logon');
    }
  }

}
