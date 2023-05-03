import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {

  urlnewusers = '/api/userGet';
  urlActive = '/api/status';
  urlInactive = '/api/inactive';


  constructor(private http : HttpClient) { }

  
  approveuser :any;
  
  listOfUsers(): Observable<any>{
    return this.http.get(`${this.urlnewusers}`)
  }

  active(data:any): Observable<any>{
    return this.http.put(`${this.urlActive}`,data)
  }

  getUsers(approve : any){
    this.approveuser = approve;
  }

  returnUser(){
    return this.approveuser
  }

  inactive(): Observable<any>{
    return this.http.get(`${this.urlInactive}`)
  }
}
