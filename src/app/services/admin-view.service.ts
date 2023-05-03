import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminViewService {

  urlView = '/api/adminview';
  urlViewName = '/api/user';

  urlViewFilter = '/api/filter/';

  urlInactiveFilter = '/api/inactiveuser';

  urlinactFilter = '/api/filterinactive/';



  constructor(private http : HttpClient) { }

  adminView(): Observable<any>{
    return this.http.get(`${this.urlView}`)
  }

  adminViewName(): Observable<any>{
    return this.http.get(`${this.urlViewName}`)
  }

  adminViewFilter(userName :any): Observable<any>{
    return this.http.get(`${this.urlViewFilter}`+ userName)
  }
  inactiveFilterApi(userName :any): Observable<any>{
    return this.http.get(`${this.urlinactFilter}`+ userName)
  }

  inactiveFilter(): Observable<any>{
    return this.http.get(`${this.urlInactiveFilter}`)
  }
}
