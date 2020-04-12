import { Component, OnInit } from '@angular/core';
import { Weight } from 'src/app/Models/weight';
import { FoodApiServiceService } from 'src/app/food-api-service.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-weights',
  templateUrl: '../../../Views/dashboard_components/weights/weights.component.html',
  styleUrls: ['../../../Views/dashboard_components/weights/weights.component.css']
})
export class WeightsComponent implements OnInit {

  constructor(
    private foodApiService: FoodApiServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.foodApiService.readAllUserWeights().subscribe((weights: Weight[]) => {
      this.weights=weights;
    });

    this.weightForm = new FormGroup({
      newWeight: new FormControl(this.weight.weight, [
        Validators.required,
        Validators.min(40),
        Validators.max(1000)
      ]),
      newDate: new FormControl(this.weight.date, [
        //Validators.required
      ])
    });

  }

  submitEntry(){
    if(this.weightForm.valid){
      if(this.weightForm.value.newDate == null || this.weightForm.value.newDate == ""){
        this.weight.date = new Date(Date.now());
      }
      this.weight.weight = this.weightForm.value.newWeight;

      this.foodApiService.createWeight(this.weight).subscribe((foo) =>{
        this.weights.unshift(foo);
      });
      this.weightForm.reset();
    }
  }

  weights: Weight[];
  weight: Weight = new Weight();

  get newWeight() { return this.weightForm.get('newWeight'); }
  get newDate() { return this.weightForm.get('newDate'); }
  weightForm=this.fb.group({
    newWeight: [null, Validators.required],
    newDate: ['']
  });
}
