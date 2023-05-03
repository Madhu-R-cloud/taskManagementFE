import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActiveUserService } from 'src/app/services/active-user.service';
import { AdminViewService } from 'src/app/services/admin-view.service';
@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActiveUserComponent implements OnInit {

  newUsers: any;
  approveuser: any;
  activeuser: any;
  employeeNames: any
  isChecked = true;
  userForm: FormGroup | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ActiveUserComponent>,
    private ActiveUserService: ActiveUserService,
    private AdminViewService: AdminViewService
  ) { 
    this.userForm = new FormGroup({});
  }

  ngOnInit(): void {

    this.AdminViewService.adminViewName().subscribe((names) => {
      this.employeeNames = names.list;
      this.activeuser = names.isActive
    });

    this.getListOfUsers();
    

  }

  getListOfUsers() {
    this.ActiveUserService.listOfUsers().subscribe((data) => {
      this.newUsers = data.list;
    });
  }

  toggleUser(userName: any, event: MatSlideToggleChange) {
    let data = {
      username: userName,
      value: event.checked.toString(),
    }
    this.ActiveUserService.active(data).subscribe((filterUser) => {
      this.getListOfUsers();
    });;
  }

  denied(item: any, element: any, text: any) {
    item = item;
    console.log(item);
    let data = {
      username: item,
      value: 'false',
    }
    this.ActiveUserService.active(data).subscribe((filterUser) => {

    });;

    element.textContent = text;
    element.disabled = true;
  }

  cancle() {
    this.dialogRef.close();
  }
}
