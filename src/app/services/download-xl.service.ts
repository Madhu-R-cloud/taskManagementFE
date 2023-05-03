import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadXlService {

  urldownload = '/api/download';

  constructor(private http : HttpClient) { }

  downloadXl(id: any): Observable<any>{
    return this.http.get(this.urldownload+`/${id}`,{observe: 'response',responseType:'blob'})
  }

  
}
