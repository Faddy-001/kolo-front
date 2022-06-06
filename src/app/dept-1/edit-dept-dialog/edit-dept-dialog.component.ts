import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dept-dialog',
  templateUrl: './edit-dept-dialog.component.html',
  styleUrls: ['./edit-dept-dialog.component.scss']
})
export class EditDeptDialogComponent implements OnInit {
  disabled:boolean=true;

  constructor(public dialogRef: MatDialogRef<EditDeptDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
