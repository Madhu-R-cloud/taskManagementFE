import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';
import { SignInService } from 'src/app/services/sign-in.service';
import { ViewGetService } from 'src/app/services/view-get.service';
import { EditServiceService } from 'src/app/services/edit-service.service';
import { InsertEmpService } from 'src/app/services/insert-emp.service';
import { CreateComponent } from '../create/create.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { DownloadXlService } from 'src/app/services/download-xl.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  val:any;
  logindetails :any;
  det :any;
  viewdetails :any;
  item :any;
  name : any;
  userLoginName :any;
  userNameInsert :any;
  userId :any;
  id :any;
  userName :any;
  csvfile :any;
  searchText :any


  constructor(
    private InsertEmpService : InsertEmpService,
    private SignInService : SignInService,
    private ViewGetService : ViewGetService,
    public dialog: MatDialog,
    public EditServiceService : EditServiceService,
    public DownloadXlService : DownloadXlService
  ) { }

  public date = new Date();


  public  downloadXl(): void{

    this.DownloadXlService.downloadXl(this.userName).subscribe(response => {
    
      let fileName = `tasks${this.date}.xlsx`
      //  ?.split(';')[1].split('=')[1];

      let blob : Blob = response.body as Blob;

      let a = document.createElement('a');
      a.download=fileName
      a.href = window.URL.createObjectURL(blob);
      a.click();
       });
  }

  insertEmpForm: FormGroup = new FormGroup({}); 

  ngOnInit(): void {

    setTimeout(() => {
      this.userLoginName =  this.SignInService.logindet();
      this.userNameInsert = this.userLoginName.userName
       })
   
        this.SignInService.loginIddet();
        console.log('test login id',this.SignInService.loginIddet()); 
        this.userId =  this.SignInService.loginIddet();
        this.userName =this.userId.userName
       this.id = this.userId.id
       console.log('test id',this.id)

       this.ViewGetService.View(this.id).subscribe((data) => {
        this.det = data;
        this.name = data[0];
         console.log(this.name.userName)
         
         });
  }


  deleteTask(did:any) {
    if(confirm('Are you sure you want to delete') == true) {
    
      this.InsertEmpService.deleteCart(did).subscribe({
        next: (res) => {
    
          this.ViewGetService.View(this.id).subscribe((data) => {
            console.log(data)
            this.det = data;
            console.log(this.det.message, typeof(this.det))
            if(this.det.message != undefined) {
              this.det = []
            }
      });
     },
        error: (err) => {this.val = err.error.message},
        complete: () => {
         
          }
        });
    }
    }
    
    create() {
    
      const dialogRef = this.dialog.open(CreateComponent, {
        height: '430px',
         width: '1050px',
        
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        this.ViewGetService.View(this.id).subscribe((data) => {
          this.det = data;
    });
    
      });
    
    
    }
    
    editCreate(item : any) {
    
    item = item;
    this.EditServiceService.getIndex(item);
      const dialogRef = this.dialog.open(EditTaskComponent, {
        height: '430px',
         width: '1050px',
        
      })
    
     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.ViewGetService.View(this.id).subscribe((data) => {
        this.det = data;
    });
     });
    
    }

   
    
}
