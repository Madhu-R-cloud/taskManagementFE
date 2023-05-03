import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminDeleteService {

  urldelemp = '/api/employeedelete/';

  constructor(private http : HttpClient) { }

  deleteCart(dataId:any): Observable<any>{
    return this.http.get(`${this.urldelemp}`+dataId)
  
  }
}
