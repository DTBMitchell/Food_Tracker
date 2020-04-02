import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../authApi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private apiService: AuthApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.logout();
    this.router.navigateByUrl('');
  }

}
