import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InsertEmpService {

  urlemp = '/api/employeeinsert';
  urldelemp = '/api/employeedelete/';

  constructor(private http : HttpClient) { }

  insertEmp(data:any): Observable<any>{
    return this.http.post(`${this.urlemp}`,data)
  }

  deleteCart(dataId:any): Observable<any>{
    return this.http.get(`${this.urldelemp}`+dataId)
  
  }

  
}
