import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  urlSignUp = '/api/signup';

  constructor(private http : HttpClient) { }

  signUp(data:any): Observable<any>{
    return this.http.post(`${this.urlSignUp}`,data)
  }
}
