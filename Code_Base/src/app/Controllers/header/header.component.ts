import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/authApi.service';

@Component({
  selector: 'app-header',
  templateUrl: '../../Views/header/header.component.html',
  styleUrls: ['../../Views/header/header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: AuthApiService) {}

  ngOnInit(): void {
  }

  isLoggedIn(): Boolean{
    return this.apiService.isLoggedIn();
  }

  title: string = "Pavolovian Tracker";
}
