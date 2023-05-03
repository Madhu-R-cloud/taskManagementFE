import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { InsertEmpService } from 'src/app/services/insert-emp.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { ViewGetService } from 'src/app/services/view-get.service';
import { EditServiceService } from 'src/app/services/edit-service.service';
import { SignInService } from 'src/app/services/sign-in.service';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  val :any;
  date : any;
  userName:any;
  dataId :any;
  taskToBeUpdated :any;
  getdata : any = [];
  userId : any;
  id : any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<EditTaskComponent>,
  private InsertEmpService : InsertEmpService,
  private ViewGetService :ViewGetService,
  private SignInService :SignInService,
  private EditServiceService :EditServiceService) { }

  insertEmpForm: FormGroup = new FormGroup({}); 

  ngOnInit(): void {

    this.EditServiceService.returnIndex();
    
    this.taskToBeUpdated  = this.EditServiceService.returnIndex();
    console.log("task to be updated", this.taskToBeUpdated);

    this.SignInService.loginIddet();
    console.log('test login id',this.SignInService.loginIddet()); 
    this.userId =  this.SignInService.loginIddet();
   this.id = this.userId.id
   console.log('test id',this.id)

    this.ViewGetService.View(this.id).subscribe((data) => {
      this.userName = data[0].userName
      this.data = data;

     this.PopulateForm(this.taskToBeUpdated)
      console.log("data at edit is",this.data)
      
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
      did: new FormControl('')
      // userName : new FormControl(''),
});

  }

  formatingdate(){
    let val = this.data[0].date.split('/')
    let dateVal = '03';
    let monthVal;
    console.log(val)
    if (val[1] < 10) {
        monthVal = "0"+val[1]
    } else {
      monthVal = val[1]
    }
    if (val[0] < 10) {
      dateVal = "0"+val[0]
    }else {
      dateVal = val[0]
    }
    let FormattedDate = val[4] + '-' +monthVal+ '-'+dateVal
    return FormattedDate
    }

    formatetime(){
      let start =  this.data[0].formTime.split(':')
      let end = this.data[0].toTime.split(':')

      
    }

  PopulateForm(taskToBeUpdate: any) {
    for(let i = 0;i < this.data.length ; i++){
      if(this.data[i].did == taskToBeUpdate)
        {
          this.getdata = this.data[i]
          console.log('getdata',this.getdata)
        }
      }
      console.log('parent CRN',this.getdata.parentCrn);



    this.insertEmpForm.patchValue({
      date:  this.getdata.date,
      parentCrn: this.getdata.parentCrn,
      Crn : this.getdata.Crn,
      description : this.getdata.description,
      fromTime : this.getdata.fromTime,
      toTime : this.getdata.toTime,
      status : this.getdata.status,
      comment : this.getdata.comment,
      // userName : this.data[0].userName

    })
  }

  empEdit() { 
    if(this.insertEmpForm?.get('date')?.value && this.insertEmpForm?.get('parentCrn')?.value &&
    this.insertEmpForm?.get('description')?.value && this.insertEmpForm?.get('fromTime')?.value && this.insertEmpForm?.get('toTime')?.value &&
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
        userName : this.userName,
        did :  this.getdata.did
        
}
   console.log("data sent in the edit form", data)   
      this.EditServiceService.editTask(data).subscribe({
        next: (res) => {
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
