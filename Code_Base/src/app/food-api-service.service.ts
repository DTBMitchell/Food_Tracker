import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goal } from 'src/app/Models/goal';
import { Weight } from 'src/app/Models/weight';

@Injectable({
  providedIn: 'root'
})
export class FoodApiServiceService {

  PHP_API_SERVER = "http://localhost:80"

  constructor(private httpClient: HttpClient) { }

  createUser(token: any): Observable<string>{
    return this.httpClient.post<string>(`${this.PHP_API_SERVER}/foodApi/user.php?op=new`, token);
  }

  createGoal(goal: Goal): Observable<Goal>{
    var token = {
      id_token: localStorage.getItem('id_token'),
      goal_weight: goal.goal_weight
    }
    return this.httpClient.post<Goal>(`${this.PHP_API_SERVER}/foodApi/weight.php?op=post-goal`, token);
  }

  createWeight(weight: Weight): Observable<Weight>{
    var token = {
      id_token: localStorage.getItem('id_token'),
      weight_entry: weight
    }
    return this.httpClient.post<Weight>(`${this.PHP_API_SERVER}/foodApi/weight.php?op=post-weight`, token);
  }

  readAllUserGoals(): Observable<Goal[]>{
    var token = {
      id_token: localStorage.getItem('id_token')
    }
    return this.httpClient.post<Goal[]>(`${this.PHP_API_SERVER}/foodApi/weight.php?op=get-goals`, token);
  }

  readAllUserWeights(): Observable<Weight[]>{
    var token = {
      id_token: localStorage.getItem('id_token')
    }
    return this.httpClient.post<Weight[]>(`${this.PHP_API_SERVER}/foodApi/weight.php?op=get-weights`, token);
  }


}
