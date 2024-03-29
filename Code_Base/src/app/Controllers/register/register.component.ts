import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/authApi.service';
import { User } from 'src/app/Models/User';
import { FoodApiServiceService } from 'src/app/food-api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: '../../views/register/register.component.html',
  styleUrls: ['../../views/register/register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm= this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    pass_conf: ['', Validators.required]
  });

  //registrationForm = new FormControl('');

  constructor(
    private apiService: AuthApiService, 
    private foodApiService: FoodApiServiceService,
    private fb: FormBuilder, private router: Router
    ) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      first_name: new FormControl(this.user.first_name, [
        Validators.required
      ]
      ),
      last_name: new FormControl(this.user.first_name, [
        Validators.required
      ]
      ),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      password: new FormControl(this.user.password, [
        Validators.required
      ]),
      password_conf: new FormControl(this.password_conf, [
        Validators.required
      ])
    });
  }

  registerNewUser(){
    //check form validation!
    if(this.registrationForm.valid && (this.registrationForm.value.password === this.registrationForm.value.password_conf)){
      //console.log("form validated!")
      this.user.user_id=null;
      this.user.first_name = this.registrationForm.value.first_name;      
      this.user.last_name = this.registrationForm.value.last_name;
      this.user.email = this.registrationForm.value.email;
      this.user.password = this.registrationForm.value.password;
      

      //send to database
      //console.log(this.user);
      this.apiService.createUser(this.user).subscribe((userReturn)=>{

        //console.log(userReturn);
        userReturn.password = this.user.password;

        this.apiService.login(userReturn).subscribe((loginUser) =>{

          this.apiService.setSession(loginUser);

          

          if(this.apiService.isLoggedIn){
            console.log(localStorage.getItem('id_token'));
            var token = {
              id_token: localStorage.getItem('id_token')
            };
            this.foodApiService.createUser(token).subscribe((st) =>{
              console.log(st);
            });
            

            console.log('Redirecting...');
            this.router.navigateByUrl('dashboard');
          }else{
            
          };
        });
      });
    }else{
      console.log(["Error", "Form Invalid"]);
    }

  }

  //implement form validation
  get first_name() { return this.registrationForm.get('first_name'); }
  get last_name() { return this.registrationForm.get('last_name'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get password_conf() { return this.registrationForm.get('password_conf'); }
  get birthday() { return this.registrationForm.get('birthday'); }

  user: User = new User();
  password_confirm: string = '';

}
