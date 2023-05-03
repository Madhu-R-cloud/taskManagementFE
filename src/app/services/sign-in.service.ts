import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  login : any;

  loginId :any;
  
  urlSignin = '/api/signin';
  
  constructor(private http : HttpClient) {

   }

   signIn(data:any): Observable<any>{
    return this.http.post(`${this.urlSignin}`,data)
  }
  
  logindet(){
    
    return this.login;
    
  }
 
  loginIddet(){
    return this.loginId;
  }
  
  logindetails(userName:any){
    this.login = userName;
    this.loginId =userName;
    console.log('service file data',this.login);
  }

  // loginID(id:any){
    
  //   this.loginId = id;

  // }
  
}
