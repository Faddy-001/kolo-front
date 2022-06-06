import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profession',
  templateUrl: './edit-profession.component.html',
  styleUrls: ['./edit-profession.component.scss']
})
export class EditProfessionComponent implements OnInit {
  editProfessionForm!: FormGroup;
  disabled:boolean=true;
  errorMsg: any;
  features:any;
  professionFeature:any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;

  constructor(public dialogRef: MatDialogRef<EditProfessionComponent>, private formbuilder:FormBuilder, public toastr: ToastrService, private mainService:MainService,
     @Inject(MAT_DIALOG_DATA) public data: any) { 
       this.editProfessionForm = this.formbuilder.group({
       name:[this.data.name, Validators.required],
       description: [this.data.description],
     
     }) 
  }

  ngOnInit(): void {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    
    this.mainService.getUser(this.userId).subscribe((res)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.professionFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Professions';
      })
    })
  }

  submit(value:any){
    this.mainService.updateProfession(this.data.id,value).subscribe((result)=>{
      this.data = result;
      this.dialogRef.close(this.data);
      this.toastr.success(this.data.message)
    }, err => {
      this.data = err;
      this.errorMsg = this.data.error.error.name;
      this.toastr.error(this.errorMsg)
    })
  }
  close(){
    this.dialogRef.close(this.data);
  }
}
