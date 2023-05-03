import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewGetService } from 'src/app/services/view-get.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  pass: any;
  user: any;
  value: any;
  userId :any;

  signinForm: FormGroup = new FormGroup({});

  constructor( 
    public dialog: MatDialog,
    private SignInService : SignInService,
    private ViewGetService :ViewGetService,
    private router: Router) {
    
   }

  ngOnInit(): void {

    this.signinForm = new FormGroup({
      username : new FormControl(''),
      password : new FormControl('')
    });
  }

  loginSuccess() { 
    
    if(this.signinForm?.get('username')?.value && this.signinForm?.get('password')?.value){
      let data = {
        username : this.signinForm?.get('username')?.value,
        password : this.signinForm?.get('password')?.value

      }
      this.SignInService.signIn(data).subscribe({

        next: (res) => {  
          
          if(data.username != 'Admin' && data.password != 'Admin*@123'){
          this.router.navigate(['/sign-in/MainPage'])
        }else {
          this.router.navigate(['/sign-in/Admin'])

        }
          this.SignInService.logindetails(res.userName);
          
          sessionStorage.setItem('username', data.username);
          this.user = ""

  
       },
        
        error: (err) => {this.user = err.error.message},
        complete:() => { if(this.user){

        }},
        
      }) 
     
      
      console.log(data)
    }
  }

  openDialog() {

    const dialogRef = this.dialog.open(SignUpComponent, {
      height: '600px',
       width: '700px',
      
    })

 
}
resetPassword() {

  const dialogRef = this.dialog.open(ResetPasswordComponent, {
    height: '370px',
     width: '500px',
    
  })

}
}
