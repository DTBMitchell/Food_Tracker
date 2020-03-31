import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './Models/User';
import{ Observable } from 'rxjs';
import * as moment from "moment";
import { tap, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://localhost:80";

  constructor(private httpClient: HttpClient) { }

  //Begin Non-template functions
  readUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/Auth.php?op=all`);
  }

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/Auth.php?op=new`, user);
  }

  login(user: User){
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/Auth.php?op=login`, user).subscribe((user: User)=>{
      this.setSession(user);
    });
  }

  private setSession(userResult) {
    localStorage.setItem('id_token', userResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(userResult.expires_at));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      return moment(expiration);
  } 
  

}
