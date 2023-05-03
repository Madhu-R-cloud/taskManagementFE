import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';
import { ApproveService } from 'src/app/services/approve.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  newUsers : any;
  approveuser : any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<ApproveComponent>,
    private ApproveService : ApproveService,
  ) { }

  ngOnInit(): void {

    this.approveuser = this.ApproveService.returnUser();

    
    this.ApproveService.adminApprove().subscribe((data) => {
      this.newUsers = data;
   });
  }

  approve(item : any, element:any, text:any) {
        
    item = item;
    console.log(item);
    let data = {
      userName : item,
      verified : 'approved',
    }
    this.ApproveService.approve(data).subscribe((filterUser) => {
  
  });;
  
  element.textContent = text;
  element.disabled = true;
}

denied(item : any, element:any, text:any) {
        
  item = item;
  console.log(item);
  let data = {
    userName : item,
    verified : 'denied',
  }
  this.ApproveService.approve(data).subscribe((filterUser) => {

});;

element.textContent = text;
element.disabled = true;

}

  // approve(){
   
  //   let data = {

  //     userName: this.newUsers.userName,
  //     verified : 'approved',
  //   }
  //   this.ApproveService.approve(data).subscribe({
  //     next: (res) => {},
  //     error: (err) => {},
  //     complete: () => {}

  //   }) 
   
  // }
  cancle(){
  
      this.dialogRef.close();
    
  }
}
