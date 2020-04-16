import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { User } from './Models/User';
import{ Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  PHP_API_SERVER = "http://localhost:80";

  constructor(private httpClient: HttpClient) { }

  readUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/Auth.php?op=all`);
  }

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/Auth.php?op=new`, user);
  }

  login(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/Auth.php?op=login`, user);
  }

  setSession(userResult) {
    //console.log(userResult.idToken);
    localStorage.setItem('id_token', userResult.idToken);
    localStorage.setItem("expires_at", userResult.expires_at);
  }

  logout() {
    var token = {
      id_token: localStorage.getItem('id_token')
    }
    this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/Auth.php?op=logout`, token).subscribe((token) =>{
      console.log(token);
    });
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    let d1 = new Date(localStorage.getItem('expires_at'));
    var d2 =  new Date(Date.now());

    if(d2<d1){
      //console.log("dates correct:", d1, d2)
      return true;
    }else{
      return false;
    }
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }  

}
