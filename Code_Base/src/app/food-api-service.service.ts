import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodApiServiceService {

  PHP_API_SERVER = "http://localhost:80"

  constructor(private httpClient: HttpClient) { }

  createUser(token: any): Observable<string>{
    return this.httpClient.post<string>(`${this.PHP_API_SERVER}/foodApi/user.php?op=new`, token);
  }


}
