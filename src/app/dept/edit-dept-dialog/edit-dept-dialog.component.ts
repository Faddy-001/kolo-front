import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-dept-dialog',
  templateUrl: './edit-dept-dialog.component.html',
  styleUrls: ['./edit-dept-dialog.component.scss']
})
export class EditDeptDialogComponent implements OnInit {
  editDeptForm: FormGroup;
  projectData: any;
  projects: any;
  disabled:boolean=true;
  errorMsg: any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  deptFeature:any;

  constructor(public dialogRef: MatDialogRef<EditDeptDialogComponent>, private formbuilder:FormBuilder,
               private mainService:MainService,@Inject(MAT_DIALOG_DATA) public data: any, public toastr: ToastrService ) { 
      this.editDeptForm = this.formbuilder.group({
        name:[this.data.name, Validators.required],
        description: [this.data.description],
        project_id: [this.data.projectId, Validators.required],
      })
    }

  ngOnInit(): void {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    
    this.mainService.getUser(this.userId).subscribe((res)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.deptFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Departments';
      })    
    })

    this.mainService.getProjects().subscribe((result)=>{
      this.projectData = result;
      this.projects = this.projectData.projects;
    })
  }

  submit(value:any){
    this.mainService.updateDepartment(this.data.id,value)
    .subscribe((result)=>{
      this.data = result;
      this.dialogRef.close(this.data);
      this.toastr.success(this.data.message)
    },
    err => {
      this.data = err;
      this.errorMsg = this.data.error.error.name;
      this.toastr.error(this.errorMsg)
    })
  }

  close(){
    this.dialogRef.close();
  }

}
