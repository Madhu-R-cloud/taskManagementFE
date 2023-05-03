import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';
import { InsertEmpService } from 'src/app/services/insert-emp.service';
import { SignInService } from 'src/app/services/sign-in.service';
import { ViewGetService } from 'src/app/services/view-get.service';
import { EditServiceService } from 'src/app/services/edit-service.service';
import { CreateAdminComponent } from '../create-admin/create-admin.component';
import { EditAdminComponent } from '../edit-admin/edit-admin.component';
import { AdminViewService } from 'src/app/services/admin-view.service';
import { AdminDeleteService } from 'src/app/services/admin-delete.service';
import {MatIconModule} from '@angular/material/icon';
import { ApproveComponent } from '../approve/approve.component';
import { ActiveUserComponent } from '../active-user/active-user.component';
import { DownloadXlService } from 'src/app/services/download-xl.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  val:any;
  logindetails :any;
  det :any;
  viewdetails :any;
  item :any;
  name : any;
  userLoginName :any;
  userNameInsert :any;
  adminView : any;
  adminViewName :any;
  employeeNames :any;
  employeeFilter :any;
  dataSource: any;
  searchText :any

  constructor(
    private InsertEmpService : InsertEmpService,
    private SignInService : SignInService,
    private ViewGetService : ViewGetService,
    public dialog: MatDialog,
    public EditServiceService : EditServiceService,
    private AdminViewService:AdminViewService,
    public DownloadXlService : DownloadXlService,
    private AdminDeleteService :AdminDeleteService
  ) { }

  public date = new Date();

  public  downloadXl(): void{
    let userName = this.insertEmpForm.controls.userName.value;

    this.DownloadXlService.downloadXl(userName).subscribe(response => {
    
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

    this.dataSource = this.adminView

    this.insertEmpForm = new FormGroup({
      userName : new FormControl(''),
    });

  
  this.AdminViewService.adminViewName().subscribe((names) => {
    this.employeeNames = names.list;
  
});
    this.AdminViewService.adminView().subscribe((data) => {
     this.adminView = data;
  })

  this.AdminViewService.adminViewName().subscribe((data) => {
    this.adminViewName = data.list;
 })
   
       this.ViewGetService.View(sessionStorage.getItem('username')).subscribe((data) => {
        this.det = data;
        this.name = data[0];
         
         });
   
  }

  deleteTask(did:any) {
    if(confirm('Are you sure you want to delete') == true) {
    
      this.InsertEmpService.deleteCart(did).subscribe({
        next: (res) => {
    
          this.AdminViewService.adminView().subscribe((data) => {
            console.log(data)
            this.adminView = data;
            console.log(this.det.message, typeof(this.det))
            if(this.adminView.message != undefined) {
              this.adminView = []
            }
      });
     },
        error: (err) => {this.val = err.error.message},
        complete: () => {
         
          }
        });
    }
    }
    
    
    approve() {
        
          const dialogRef = this.dialog.open(ApproveComponent, {
            height: '400px',
             width: '350px',
            
          })
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.AdminViewService.adminView().subscribe((data) => {
              this.adminView = data;
           })
        
          });
        
        
        }
        
        
    activeUser() {
        
          const dialogRef = this.dialog.open(ActiveUserComponent, {
            height: '470px',
             width: '650px',
            
          })
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.AdminViewService.adminView().subscribe((data) => {
              this.adminView = data;
           })
        
          });
        
        
        }
        
    
    
        editCreate(item : any) {
        
        item = item;
        this.EditServiceService.getIndex(item);
          const dialogRef = this.dialog.open(EditAdminComponent, {
            height: '430px',
             width: '1050px',
            
          })
         dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          this.AdminViewService.adminView().subscribe((data) => {
            this.adminView = data;
         })
         });
        }
    
    
        
  selectEmployee() {
    
           let userName = this.insertEmpForm.controls.userName.value;
    
          
    
          this.AdminViewService.adminViewFilter(userName).subscribe((filterUser) => {
            this.employeeFilter = filterUser;
           console.log('filter',this.employeeFilter);
        });
      }
    


      gettabledetails(): void {
    
        this.dataSource = this.adminView
        console.log(this.dataSource);
      }



      viewAllTask(){
         this.AdminViewService.adminView().subscribe((data) => {
     this.adminView = data;
  })

      }


      

      filearray : any=[
        
      ];

      filedownload(){
        for(let i=0;i<this.adminView.length;i++){
          var fdata;
          var newArray = [];
          for(fdata in this.adminView[i]){
           newArray.push(fdata);
          }
          break;
        }
        this.filearray.push(newArray);
        for(let i=0;i<this.adminView.length; i++){
          this.filearray.push(Object.values(this.adminView[i]))
          }
        var csvfile = "";
        this.filearray.forEach((rowItem : any , rowIndex : any) =>{
        rowItem.forEach((columnItem : any , columnIndex : any) =>{
            csvfile += columnItem + '.,'

          })
            csvfile += "\n";
        });
        csvfile = "data:application/csv, " + encodeURIComponent(csvfile);
        var csv = document.createElement("A");
        csv.setAttribute("href", csvfile);
        csv.setAttribute("download","dataXL.csv");
        document.body.appendChild(csv);
        csv.click();
        this.filearray = [];
      }

      create() {
        
        const dialogRef = this.dialog.open(CreateAdminComponent, {
          height: '430px',
           width: '1050px',
          
        })
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          this.AdminViewService.adminView().subscribe((data) => {
            this.adminView = data;
         })
      
        });
      
      
      }

      
 
}
