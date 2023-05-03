import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  urlPassword = '/api/forgotpassword';


  constructor(private http : HttpClient) { }

  forgotPassword(data:any): Observable<any>{
    return this.http.post(`${this.urlPassword}`,data)
  }
}
