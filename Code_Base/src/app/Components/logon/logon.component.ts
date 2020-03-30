import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { User } from '../../Models/User';
import { JwtModule } from '@auth0/angular-jwt';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    //Gets all users. Testing purposes only
    this.apiService.readUsers().subscribe((users: User[])=>{
      this.users = users;
      console.log(this.users);
  })
  }

  Login(form){
    this.user.user_id=null;
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    //send to database
    this.apiService.login(this.user);
      console.log(localStorage.getItem('id_token'));
      console.log(localStorage.getItem('expires_at'));
  }

  

  /*
    * Variables
  */
  users: User[];
  user: User = new User();
  jwt: JwtModule;
}
