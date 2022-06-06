import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-profession',
  templateUrl: './add-profession.component.html',
  styleUrls: ['./add-profession.component.scss']
})
export class AddProfessionComponent implements OnInit {
  valueText:string="";
  addProfessionForm!: FormGroup;
  disabled:boolean=true;
  errorMsg: any;

  constructor(public dialogRef: MatDialogRef<AddProfessionComponent>,private formbuilder: FormBuilder, public toastr: ToastrService, private mainService:MainService,
   @Inject(MAT_DIALOG_DATA) public data: any) { 
     this.addProfessionForm = this.formbuilder.group({
    name:[null, Validators.required],
    description:[null],
  
  })
}

  ngOnInit(): void {}

  submit(value:any){
    this.mainService.addProfession(value).subscribe((result)=>{
     this.data = result;
     this.dialogRef.close(this.data);
     this.toastr.success(this.data.message)
    },
    err => {
      this.data = err;
      this.errorMsg = this.data.error.error.name;
      //this.dialogRef.close(this.errorMsg);
      this.toastr.error(this.errorMsg)
    })
  }

  save(){
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }
}
