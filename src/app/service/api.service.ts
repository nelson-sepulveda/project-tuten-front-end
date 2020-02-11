import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) {}

   headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
     "Authorization": this.authService.getToken()
   }); 

   getAll() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get(url);
   }

}
