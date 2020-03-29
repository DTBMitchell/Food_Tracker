import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Register(form){
    //console.log("register works")

    //check form validation!
    if(this.ValidateForm(form)){
      console.log("form validated!")

      //send to database
    }

  }

  //implement form validation
  private ValidateForm(form): boolean{
    return true;
  }

}
