import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UserInterface } from '../models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string){
    let headers_: HttpHeaders = new HttpHeaders();
    headers_ = headers_.append('app', 'APP_BCK');
    headers_ = headers_.append('password', password);
    headers_ = headers_.append('Accept', 'application/json');

    // const url = 'https://dev.tuten.cl:443/TutenREST/rest/user/testapis@tuten.cl';
    const url = `https://dev.tuten.cl:443/TutenREST/rest/user/${email}`;
    return this.http.put(url, { }, {headers: headers_ }).pipe(map(data=> data)); 
  }

  setUser(user: Object) {
    console.log(user);
    let user_data = JSON.stringify(user);
    console.log(user_data);
    localStorage.setItem("currentUser", user_data);
    this.setToken(user_data)
  }

  setToken(token) {
    localStorage.setItem("accessToken",token)
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(){
    let user_data = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_data)){
      let userExist = JSON.parse(user_data)
      return userExist;
    }
    return null;
  }

  logoutUser() {
    localStorage.getItem('accessToken');
  }

}
