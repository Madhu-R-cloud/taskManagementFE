import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { InsertEmpService } from 'src/app/services/insert-emp.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { ViewGetService } from 'src/app/services/view-get.service';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  val :any;
  userName: any;
  userLoginName : any;
  userNameInsert :any;
  userIdInsert : any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<CreateComponent>,
  private InsertEmpService : InsertEmpService,
  private SignInService : SignInService,
  private ViewGetService :ViewGetService,
  private router: Router
  ) { }

  insertEmpForm: FormGroup = new FormGroup({}); 

  ngOnInit(): void {

    setTimeout(() => {
      this.userLoginName =  this.SignInService.logindet();
      this.userNameInsert = this.userLoginName.userName
      this.userIdInsert = this.userLoginName.id
       console.log('userNameInsert', this.userIdInsert);  
       },1000)
       
   
    
    this.ViewGetService.View(sessionStorage.getItem('username')).subscribe((data) => {
     this.userName = data[0].userName
      console.log("created username", this.userName)
      
      });

    this.insertEmpForm = new FormGroup({
      date : new FormControl(''),
      parentCrn : new FormControl(''),
      Crn : new FormControl(''),
      description : new FormControl(''),
      fromTime : new FormControl(''),
      toTime : new FormControl(''),
      status : new FormControl(''),
      comment : new FormControl(''),
      // userName : new FormControl(''),
});
  }

  empInsert() { 
    if(this.insertEmpForm?.get('date')?.value && this.insertEmpForm?.get('parentCrn')?.value && this.insertEmpForm?.get('description')?.value && this.insertEmpForm?.get('fromTime')?.value && this.insertEmpForm?.get('toTime')?.value &&
    this.insertEmpForm?.get('status')?.value
    ){
      let data = {  
        date : this.insertEmpForm?.get('date')?.value,
        parentCrn : this.insertEmpForm?.get('parentCrn')?.value,
        Crn : this.insertEmpForm?.get('Crn')?.value,
        description : this.insertEmpForm?.get('description')?.value,
        fromTime : this.insertEmpForm?.get('fromTime')?.value,
        toTime : this.insertEmpForm?.get('toTime')?.value,
        status : this.insertEmpForm?.get('status')?.value,
        comment : this.insertEmpForm?.get('comment')?.value,
        userName : this.userLoginName.userName,
      
        
    
}
      
      this.InsertEmpService.insertEmp(data).subscribe({
         next: (res) => {this.userNameInsert = this.userLoginName.userName
          this.userIdInsert = this.userIdInsert.id
          },
         error: (err) => {this.val = err.error.message},
         complete: () => {
          if(this.val== this.val){
            this.dialogRef.close();
            
}

           }
}

)} 
}

cancle(){
  this.dialogRef.close();
}
}
