import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { User } from '../../Models/User';

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
    this.apiService.createUser(form.value).subscribe((user: User)=>{
      console.log("User created, ", user);
    console.log('Working!');
    });
  }

  /*
    * Variables
  */
  users: User[];
  selectedUser: User = new User();

}
