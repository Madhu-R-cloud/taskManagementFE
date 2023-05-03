import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewGetService {

  urlView = '/api/employeeview';

  constructor(private http : HttpClient) { }

  View(id: any): Observable<any>{
    return this.http.get(this.urlView+`/${id}`)
  }
  
}
