import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { User } from '../../Models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm= this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    //pass_conf: ['', Validators.required],
    birthday: ['', Validators.required]
  });

  //registrationForm = new FormControl('');

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registerNewUser(){
    //console.log("register works")

    //check form validation!
    if(this.ValidateForm()){
      console.log("form validated!")
      this.user.user_id=null;
      this.user.first_name = this.registrationForm.value.first_name;      
      this.user.last_name = this.registrationForm.value.last_name;
      this.user.email = this.registrationForm.value.email;
      this.user.password = this.registrationForm.value.password;
      this.user.birthday = this.registrationForm.value.birthday;

      //send to database
      //console.log(this.user);
      this.apiService.createUser(this.user).subscribe((userReturn: User)=>{
        userReturn.password = this.user.password;
        this.apiService.login(userReturn);
        console.log(localStorage.getItem('id_token'));
        console.log(localStorage.getItem('expires_at'));
      });
    }

  }

  //implement form validation
  private ValidateForm(): boolean{
    return true;
  }


  user: User = new User();

}
