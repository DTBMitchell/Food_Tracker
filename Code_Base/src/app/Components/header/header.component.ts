import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

  isLoggedIn(): Boolean{
    return this.apiService.isLoggedIn();
  }

  title: string = "Pavolovian Tracker";
}
