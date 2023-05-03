import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';
import { ActiveUserService } from 'src/app/services/active-user.service';
import { AdminViewService } from 'src/app/services/admin-view.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {

  empdetails : any;
  employeeFilter : any;
  inactivelist : any;

  constructor(
    private ActiveUserService : ActiveUserService,
    private AdminViewService : AdminViewService ) { }

    insertEmpForm: FormGroup = new FormGroup({}); 


  ngOnInit(): void {

    this.insertEmpForm = new FormGroup({
      userName : new FormControl(''),
    });


    this.AdminViewService.inactiveFilter().subscribe((details) => {
      this.inactivelist = details.list;
    });
    console.log(this.inactivelist);


    this.ActiveUserService.inactive().subscribe((details) => {
      this.empdetails = details;
    });
  console.log(this.empdetails);


  }


  selectEmployee() {
    
    let userName = this.insertEmpForm.controls.userName.value;

   

   this.AdminViewService.inactiveFilterApi(userName).subscribe((filterUser) => {
     this.employeeFilter = filterUser;
    console.log('filter',this.employeeFilter);
 });
}
}
