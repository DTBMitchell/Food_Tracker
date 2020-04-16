import { Component, OnInit } from '@angular/core';
import { Weight } from 'src/app/Models/weight';
import { FoodApiServiceService } from 'src/app/food-api-service.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Chart } from 'chart.js';

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
      let dates = [];
      let weightInputs: number[] = [];
      let dataArray = [];
      let sumY = 0.0;

      //Format dates and push onto arrays
      weights.forEach(weight => {
        //Create new Date objects for table
        weight.date = new Date(weight.date);

        //Create seperate Date objects for chart
        dates.push(new Date(weight.date).toLocaleDateString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
        weightInputs.push(weight.weight);
        dataArray.push(
          {
            x: (new Date(weight.date)).toLocaleDateString(),
            y: weight.weight
          });

          sumY += Number(weight.weight);
      });

      let n = dataArray.length;
      let trendPoints = [
        {
          x: dataArray[n-1].x,
          y: dataArray[n-1].y
        },
        {
          x: dataArray[0].x,
          y: sumY/n
        }
      ]

      //Send data to table
      this.weights=weights;

      //Send data to chart
      this.buildChart(dataArray, trendPoints);
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
  buildChart(dataArray = [], trendPoints = []){
    //console.log(dates,weightInputs)
    this.chart.push(new Chart('canvas',{
      type: 'scatter',
      data: {
        datasets:[{
          label: 'Weight Entries',
          data: dataArray,
          pointBackgroundColor: 'blue',
          backgroundColor: 'blue',
          borderColor:'blue'
        },
        {
          label: 'Average Weight Trend',
          data: trendPoints,
          pointBackgroundColor: 'yellow',
          type: 'line',
          borderColor: 'green',
          backgroundColor: 'yellow',
          fill: 'none',
        }
      ],
      },
      options: {
        legend: {
          display: true,

        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            type: 'time',
            ticks: {
              autoSkip: true,
            },
            time:{
              unit: 'day',
              unitStepSize: 1,
              displayFormats: {
                day: 'MMM DD'
              }
            },
            distribution: 'series'
          }]
        },
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
