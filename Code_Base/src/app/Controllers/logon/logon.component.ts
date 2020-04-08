import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/authApi.service';
import { User } from 'src/app/Models/User';



@Component({
  selector: 'app-logon',
  templateUrl: '../../views/logon/logon.component.html',
  styleUrls: ['../../views/logon/logon.component.css']
})
export class LogonComponent implements OnInit {

  constructor(
    private apiService: AuthApiService, 
    private router: Router
    //public matDialog: MatDialog
    ) { }

  ngOnInit(): void {
    //Gets all users. Testing purposes only
    this.apiService.readUsers().subscribe((users: User[])=>{
      this.users = users;
      //console.log(this.users);
    })
  }

  Login(form){
    if(this.isValid()){
      this.user.user_id=null;
      this.user.email = form.value.email;
      this.user.password = form.value.password;

      //send to database
      this.apiService.login(this.user).subscribe((user: User)=>{
        this.apiService.setSession(user)
        if(this.apiService.isLoggedIn){
          console.log(localStorage.getItem('id_token'));
          console.log(localStorage.getItem('expires_at'));

          console.log('Redirecting...')
          this.router.navigateByUrl('dashboard');
        }else{
          
        };
      });
    }
  }

  ///TODO: Form Validation
  isValid(): Boolean{
    return true;
  }

  /*
    * Variables
  */
  users: User[];
  user: User = new User();
  //jwt: JwtModule;
}
