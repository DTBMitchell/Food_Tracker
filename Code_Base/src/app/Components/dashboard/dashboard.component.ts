import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Policy } from '../../Models/policy';
import { User } from '../../Models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  policies: Policy[];
  selectedPolicy: Policy = { id: null, number: null, amount: null};

  users: User[];
  selectedUser: User = new User();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.readPolicy().subscribe((policies: Policy[])=>{
      this.policies = policies;
      console.log(this.policies);
    })
      this.apiService.readUsers().subscribe((users: User[])=>{
        this.users = users;
        console.log(this.users);
    })
  }

  createOrUpdatePolicy(form){
    if(this.selectedPolicy && this.selectedPolicy.id){
      form.value.id = this.selectedPolicy.id;
      this.apiService.updatePolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy updated" , policy);
      });
    }
    else{
      console.log("Sent Data: ", form.value)
      this.apiService.createPolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy created, ", policy);
      });
    }

  }

  selectPolicy(policy: Policy){
    this.selectedPolicy = policy;
  }

  deletePolicy(id){
    this.apiService.deletePolicy(id).subscribe((policy: Policy)=>{
      console.log("Policy deleted, ", policy);
    });
  }

  

}
