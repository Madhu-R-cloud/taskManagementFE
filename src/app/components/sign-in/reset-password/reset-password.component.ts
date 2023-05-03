import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user :any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private ForgotPasswordService : ForgotPasswordService,
    public dialog: MatDialog,
  ) { }

  signinForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      Phone : new FormControl(''),
      otp : new FormControl(''),
      newpasscode : new FormControl(''),
      confirmpasscode : new FormControl('')


    });
  }


  reset() { 
    
    if(this.signinForm?.get('Phone')?.value && this.signinForm?.get('otp')?.value &&
    this.signinForm?.get('newpasscode')?.value && this.signinForm?.get('confirmpasscode')?.value){
      let data = {
        Phone : this.signinForm?.get('Phone')?.value,
        otp : this.signinForm?.get('otp')?.value,
        newpasscode : this.signinForm?.get('newpasscode')?.value,
        confirmpasscode : this.signinForm?.get('confirmpasscode')?.value



      }
      
      this.ForgotPasswordService.forgotPassword(data).subscribe({
        next: (res) => {this.user=""},
        error: (err) => {this.user = err.error.message
        },
        complete:() => {
          if(this.user==this.user){
          {  
            if(confirm('Your Password changed successfully') == true)
            this.dialogRef.close();

          }
        }
      }
      }) 
  
      
      console.log(data)
    }
  }

  cancle(){
    this.dialogRef.close();
  }
}
