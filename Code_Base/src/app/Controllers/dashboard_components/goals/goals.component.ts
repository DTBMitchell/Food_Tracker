import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ControlContainer } from '@angular/forms';
import { FoodApiServiceService } from 'src/app/food-api-service.service';
import { Goal } from 'src/app/Models/goal'

@Component({
  selector: 'app-goals',
  templateUrl: '../../../views/dashboard_components/goals/goals.component.html',
  styleUrls: ['../../../views/dashboard_components/goals/goals.component.css']
})
export class GoalsComponent implements OnInit {

  constructor(
    private foodApiService: FoodApiServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.foodApiService.readAllUserGoals().subscribe((goals: Goal[]) => {
      this.goals=goals;
      //console.log(goals);
    });

    this.goalForm = new FormGroup({
      newGoal: new FormControl(this.goal.goal_weight, [
        Validators.required,
        Validators.min(40),
        Validators.max(1000)
      ])
    });
  }

  submitGoal(){
    if(this.goalForm.valid){
      this.goal.goal_weight = this.goalForm.value.newGoal;
      //console.log(this.goal.goal_weight);

      this.foodApiService.createGoal(this.goal).subscribe((goalReturn: Goal) => {
        this.goals.unshift(goalReturn);
      });
    this.goalForm.reset();
    }
  }

  goals: Goal[];
  goal: Goal = new Goal();


  get newGoal() { return this.goalForm.get('newGoal'); }
  goalForm=this.fb.group({
    newGoal: ['', Validators.required]
  });
}
