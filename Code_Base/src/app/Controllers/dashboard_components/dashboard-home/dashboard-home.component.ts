import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { Weight } from 'src/app/Models/weight';
import { FoodApiServiceService } from 'src/app/food-api-service.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: '../../../Views/dashboard_components/dashboard_home/dashboard-home.component.html',
  styleUrls: ['../../../Views/dashboard_components/dashboard_home/dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor(
    private foodApiService: FoodApiServiceService
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
  }


  //Builds chart data to send to view
  buildChart(dates =[], weightInputs = []){
    //console.log('Dates: ', dates, 'Weights: ',weightInputs)
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


  weights: Weight[];
  weight: Weight = new Weight();
  chart = [];

}
