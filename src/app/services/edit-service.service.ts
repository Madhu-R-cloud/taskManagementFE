import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditServiceService {

  index :any;

  urledit = '/api/employeeupdate';


  constructor(private http : HttpClient) { }

  getIndex(item : any){

    this.index = item
    console.log('this is index',this.index)
  }
  returnIndex(){
    return this.index
  }

  editTask(data:any):Observable<any>{
    return this.http.put(`${this.urledit}`,data)
  }
}
