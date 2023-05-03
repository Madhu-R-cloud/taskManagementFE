import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  errormessage :any;
  successmessage :any;
  val:any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<SignUpComponent>,
  public fb : FormBuilder,
  private SignUpService :SignUpService
   ) { }

   signinForm: FormGroup = new FormGroup({}); 

  ngOnInit(): void {

    this.signinForm = new FormGroup({
      firstName : new FormControl(''),
      lastName : new FormControl(''),
      email : new FormControl(''),
      designation : new FormControl(''),
      userName : new FormControl(''),
      password : new FormControl(''),
      mobileNumber : new FormControl(''),
      otp : new FormControl(''),

    });

  }

  signUp() { 
    if(this.signinForm?.get('firstName')?.value && this.signinForm?.get('lastName')?.value && this.signinForm?.get('email')?.value &&
    this.signinForm?.get('designation')?.value && this.signinForm?.get('userName')?.value && this.signinForm?.get('password')?.value &&
    this.signinForm?.get('mobileNumber')?.value && this.signinForm?.get('otp')?.value
    ){
      let data = {  
        firstName : this.signinForm?.get('firstName')?.value,
        lastName : this.signinForm?.get('lastName')?.value,
        email : this.signinForm?.get('email')?.value,
        designation : this.signinForm?.get('designation')?.value,
        userName : this.signinForm?.get('userName')?.value,
        password : this.signinForm?.get('password')?.value,
        mobileNumber : this.signinForm?.get('mobileNumber')?.value,
        otp : this.signinForm?.get('otp')?.value
        
}
     
      this.SignUpService.signUp(data).subscribe({
         next: (res) => {},
         error: (err) => {this.val = err.error.message},
         complete: () => {
          if(confirm('SignUp Successful, please wait for the admin to Approve') == true)
          this.dialogRef.close();
           }
}

)} 
   }

   cancle(){
    this.dialogRef.close();
  }

}
