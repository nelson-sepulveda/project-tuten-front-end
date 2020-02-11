import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getAllBooking() {
    let headers_: HttpHeaders = new HttpHeaders();
    headers_ = headers_.append('app', 'APP_BCK');
    headers_ = headers_.append('adminemail', 'testapis@tuten.cl');
    headers_ = headers_.append('token', 'testapis@tuten.cl1e40i6ae4ojampjpuquom4o3pg');
    headers_ = headers_.append('Accept', 'application/json');
    // console.log(headers_);

    const url = 'https://dev.tuten.cl:443/TutenREST/rest/user/contacto@tuten.cl/bookings?current=true';
    return this.http.get(url, {headers: headers_ }).pipe(map(data=> data)); 
  }

}
