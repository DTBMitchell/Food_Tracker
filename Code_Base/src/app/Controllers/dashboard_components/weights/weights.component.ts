import { Component, OnInit } from '@angular/core';
import { Weight } from 'src/app/Models/weight';
import { FoodApiServiceService } from 'src/app/food-api-service.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-weights',
  templateUrl: '../../../views/dashboard_components/weights/weights.component.html',
  styleUrls: ['../../../views/dashboard_components/weights/weights.component.css']
})
export class WeightsComponent implements OnInit {

  

  constructor(
    private foodApiService: FoodApiServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.foodApiService.readAllUserWeights().subscribe((weights: Weight[]) => {
      let dates = [];
      let weightInputs: number[] = [];

      //Format dates and push onto arrays
      weights.forEach(weight => {
        //Create new Date objects for table
        weight.date = new Date(weight.date);

        //Create seperate Date objects for chart
        dates.push(new Date(weight.date).toLocaleDateString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
        weightInputs.push(weight.weight)
      });

      //Send data to table
      this.weights=weights;

      //Send data to chart
      this.buildChart(dates, weightInputs);
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

  //Builds chart data to send to view
  buildChart(dates =[], weightInputs = []){
    //console.log(dates,weightInputs)
    this.chart.push(new Chart('canvas',{
      type: 'line',
      data: {
        labels: dates,
        datasets:[
          {
            data: weightInputs,
            borderColor: 'blue',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
      }
    }));
    
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
  chart = [];


  get newWeight() { return this.weightForm.get('newWeight'); }
  get newDate() { return this.weightForm.get('newDate'); }
  weightForm=this.fb.group({
    newWeight: [null, Validators.required],
    newDate: ['']
  });
}
