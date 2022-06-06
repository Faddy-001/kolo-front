import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-name-field',
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.scss']
})
export class NameFieldComponent implements OnInit {
  firstName: string = '';
  middleName: string = '';
  lastname: string = '';
  nameFieldsData: any;
  


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NameFieldComponent>) 
  {
    
  }

  ngOnInit(): void {  
   this.firstName=this.data.fNm;
   this.middleName=this.data.mNm;
   this.lastname=this.data.lNm;
  }

  close() {
    this.nameFieldsData = {
      fname: this.firstName,
      mname: this.middleName,
      lname: this.lastname
    }
    this.data = this.nameFieldsData;
    this.dialogRef.close(this.data);
  }
}
