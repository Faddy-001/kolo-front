import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-property-type',
  templateUrl: './edit-property-type.component.html',
  styleUrls: ['./edit-property-type.component.scss']
})
export class EditPropertyTypeComponent implements OnInit {
  editPropertyTypeForm: FormGroup;
  disabled:boolean=true;
  errorMsg: any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  propertyTypeFeature:any;


  constructor(public dialogRef: MatDialogRef<EditPropertyTypeComponent>, private formbuilder: FormBuilder,
    private mainService: MainService, @Inject(MAT_DIALOG_DATA) public data: any, public toastr: ToastrService) {
    this.editPropertyTypeForm = this.formbuilder.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description],
      area_type :[this.data.area_type]
    })

  }

  ngOnInit(): void {
        //get feature
        this.getPermission = localStorage.getItem('user_info')
        this.logindata = JSON.parse(this.getPermission)
        this.userId = this.logindata.id;
        
        this.mainService.getUser(this.userId).subscribe((res:any)=>{
          this.userData = res;
          this.features = this.userData.user.Role.Feature_Access_Permissions;
    
          this.propertyTypeFeature = this.features.filter((data:any)=>{
            return data.Feature.name == 'Property Types';
          })
        })
    
  }
  close(){
    this.dialogRef.close();
  }

  submit(value: any) {
      this.mainService.updatePropertyType(this.data.id, value).subscribe((result) => {
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

}
