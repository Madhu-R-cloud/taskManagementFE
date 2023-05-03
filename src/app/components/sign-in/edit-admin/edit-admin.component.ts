import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { InsertEmpService } from 'src/app/services/insert-emp.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { ViewGetService } from 'src/app/services/view-get.service';
import { EditServiceService } from 'src/app/services/edit-service.service';
import { AdminViewService } from 'src/app/services/admin-view.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  val :any;
  date : any;
  userName:any;
  dataId :any;
  taskToBeUpdated :any;
  adminViewEdit :any;
  getdata : any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<EditAdminComponent>,
  private InsertEmpService : InsertEmpService,
  private ViewGetService :ViewGetService,
  private EditServiceService :EditServiceService,
  private AdminViewService :AdminViewService) { }

  insertEmpForm: FormGroup = new FormGroup({}); 

  ngOnInit(): void {

    // this.EditServiceService.returnIndex();
    this.taskToBeUpdated  = this.EditServiceService.returnIndex();
    console.log("task to be updated", this.taskToBeUpdated);

    this.ViewGetService.View(sessionStorage.getItem('username')).subscribe((data) => {
      this.userName = data[0].userName
      this.data = data;

     this.PopulateForm(this.taskToBeUpdated)
      console.log("data at edit is",this.data)
      
      });

      this.AdminViewService.adminView().subscribe((data) => {
        this.adminViewEdit = data;
        this.data = data;
         this.PopulateForm(this.taskToBeUpdated)
      console.log("data at edit is",this.data)
     })

    this.insertEmpForm = new FormGroup({
      
      date : new FormControl(''),
      parentCrn : new FormControl(''),
      Crn : new FormControl(''),
      description : new FormControl(''),
      fromTime : new FormControl(''),
      toTime : new FormControl(''),
      status : new FormControl(''),
      comment : new FormControl(''),
      did: new FormControl(''),
      userName : new FormControl(''),
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
    let FormattedDate = val[2] + '-' +monthVal+ '-'+dateVal
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
      userName : this.getdata.userName

    })
  }

  empEdit() { 
    if(this.insertEmpForm?.get('date')?.value && this.insertEmpForm?.get('parentCrn')?.value &&
    this.insertEmpForm?.get('description')?.value && this.insertEmpForm?.get('fromTime')?.value && this.insertEmpForm?.get('toTime')?.value &&
    this.insertEmpForm?.get('status')?.value && this.insertEmpForm?.get('userName')?.value
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
        did :   this.getdata.did
        
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
