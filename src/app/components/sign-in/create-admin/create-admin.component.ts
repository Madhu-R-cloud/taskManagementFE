import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { InsertEmpService } from 'src/app/services/insert-emp.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { ViewGetService } from 'src/app/services/view-get.service';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';
import { AdminViewService } from 'src/app/services/admin-view.service';
@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  val :any;
  userName: any;
  userLoginName : any;
  userNameInsert :any;
  adminView :any;
  adminViewName :any;
  userIdInsert :any;
  selecteduser : any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<CreateAdminComponent>,
  private InsertEmpService : InsertEmpService,
  private SignInService : SignInService,
  private ViewGetService :ViewGetService,
  private AdminViewService:AdminViewService,
  private router: Router) { }

  insertEmpForm: FormGroup = new FormGroup({}); 

  ngOnInit(): void {

    this.AdminViewService.adminView().subscribe((data) => {
      this.adminView = data;
   })

    setTimeout(() => {
      this.userLoginName =  this.SignInService.logindet();
      this.userNameInsert = this.userLoginName.userName
       console.log('userNameInsert', this.userNameInsert);  
       },1000)
   
      

       this.AdminViewService.adminViewName().subscribe((data) => {
        this.adminViewName = data.list;
     })
    
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
      userName : new FormControl(''),
      
});
  }

  // selectname(){

  //   this.selecteduser = this.insertEmpForm.controls.selecteduser.value


  //   this.AdminViewService.adminViewName().subscribe((data) => {
  //     this.adminViewName = data.list;
  //  })
  // }
  empInsert() { 
    if(this.insertEmpForm?.get('date')?.value && this.insertEmpForm?.get('parentCrn')?.value &&
    this.insertEmpForm?.get('description')?.value && this.insertEmpForm?.get('fromTime')?.value && this.insertEmpForm?.get('toTime')?.value &&
    this.insertEmpForm?.get('status')?.value &&  this.insertEmpForm?.get('userName')?.value 
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
        userName : this.insertEmpForm?.get('userName')?.value,
        
        
    
}
this.InsertEmpService.insertEmp(data).subscribe({
  next: (res) => {
    this.AdminViewService.adminView().subscribe((data) => {
     
   })

    // this.userNameInsert = this.userLoginName.userName
   
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
