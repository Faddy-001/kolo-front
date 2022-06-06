import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  userVal:string="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteUserComponent>) {
    
   }

  ngOnInit(): void {
  }
  yes(){
this.userVal="yes"
this.close(this.userVal);

  }
  no(){
this.userVal="no"
this.close(this.userVal);
  }

  close(val:any){
    this.data=val;
    this.dialogRef.close(this.data);
    
  }

}
