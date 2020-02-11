import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/service/api.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface BookInterface2 {
  bookingId?: number,
  firstName?: string,
  lastname?: string,
  bookingTime?: number,
  streetAddress?: string,
  bookingPrice?: number
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  constructor(private route: Router, private Api: HttpClient) { }

  displayedColumns: string[] = ['BookingID', 'Cliente', 'Fecha Creacion', 'Direccion', 'Precio'];
  exampleDatabase: ExampleHttpDatabase | null;
  data_user = {}
  dataTable: BookInterface2[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this.Api);
    merge(this.paginator)
      .pipe(
        startWith({}),
        switchMap(()=>{
          this.isLoadingResults = true;
          return this.exampleDatabase.getAllBooking().subscribe(data => this.dataTable = data);
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => console.log(data));
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      
    } else {
      this.route.navigate(['/user/login'])
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }
}


export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getAllBooking() {
    let userStorage = JSON.parse(localStorage.getItem('currentUser'));
    let headers_: HttpHeaders = new HttpHeaders();
    headers_ = headers_.append('app', 'APP_BCK');
    headers_ = headers_.append('adminemail', 'testapis@tuten.cl');
    headers_ = headers_.append('token', userStorage.sessionTokenBck);
    headers_ = headers_.append('Accept', 'application/json');
    // console.log(headers_);

    const url = 'https://dev.tuten.cl:443/TutenREST/rest/user/contacto@tuten.cl/bookings?current=true';
    return this._httpClient.get(url, {headers: headers_ }).pipe(map(data=> data)); 
  }
}
