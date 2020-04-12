import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/authApi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: '../../Views/logout/logout.component.html',
  styleUrls: ['../../Views/logout/logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private apiService: AuthApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.logout();
    this.router.navigateByUrl('');
  }

}
