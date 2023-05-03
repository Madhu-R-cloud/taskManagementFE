import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {

  urlnewusers = '/api/approvallist/';
  urlApproval = '/api/approval/';

  constructor(private http : HttpClient) { }

  approveuser :any;
  
  adminApprove(): Observable<any>{
    return this.http.get(`${this.urlnewusers}`)
  }

  approve(data:any): Observable<any>{
    return this.http.put(`${this.urlApproval}`,data)
  }

  getUsers(approve : any){
    this.approveuser = approve;
  }

  returnUser(){
    return this.approveuser
  }
}
