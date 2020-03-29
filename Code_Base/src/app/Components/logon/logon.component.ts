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
    //Fetch the user's public salt to not transmit password in plain text
    console.log("Weeeeeeeee");
  }

  /*
    * Variables
  */
  users: User[];
  selectedUser: User = new User();
}
