import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-editname-field',
  templateUrl: './editname-field.component.html',
  styleUrls: ['./editname-field.component.scss']
})
export class EditnameFieldComponent implements OnInit {
  firstName:string='';
  middleName:string='';
  lastname:string='';
  nameFieldsData:any;
   id:any;
   leadsData:any;
  leadData:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditnameFieldComponent>, private mainService: MainService) { 
    this.id=data.id
    this.firstName=data.fname
    this.middleName=data.mname
    this.lastname=data.lname
    // this.mainService.getLead(this.id).subscribe((res)=>{  
    //  this.leadsData=res
    //  this.leadData=this.leadsData.lead
    //  this.firstName=this.leadData.first_name
    //  this.middleName=this.leadData.middle_name
    //  this.lastname=this.leadData.last_name

    // },err=>{
    //   console.log(err);
      
    // })
    
  }

  ngOnInit(): void {
  }

  close(){
    
    this.nameFieldsData = {
      fname: this.firstName,
      mname:this.middleName,
      lname:this.lastname
    }
    this.data = this.nameFieldsData;
    this.dialogRef.close(this.data);
  }

}
