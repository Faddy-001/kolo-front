import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.scss']
})
export class EditProjectDialogComponent implements OnInit {
  editProjectForm!: FormGroup;
  disabled:boolean=true;
  desc:any = null;
  public editor:any= ClassicEditor;
  config={
    toolbar: [ 'heading', '|', 'bold', 'italic' ] 
 }
  errorMsg: any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  projectFeature:any;

  constructor(public dialogRef: MatDialogRef<EditProjectDialogComponent>, private formbuilder:FormBuilder,
    private mainService:MainService,  private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) { 
      if (this.data.description) {
        let div = document.createElement("div");
        div.innerHTML = this.data.description;
        this.desc = div.textContent || div.innerText || "";
      }
    
      this.editProjectForm = this.formbuilder.group({
        name:[this.data.name, Validators.required],
        sector:[this.data.sector, Validators.required],
        total_area:[this.data.total_area, Validators.required],
        saleable:[this.data.saleable],
        nonsaleable:[this.data.nonsaleable],
        description: [this.desc],
        address: [this.data.address, Validators.required],
      })
     }

  ngOnInit(): void {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    
    this.mainService.getUser(this.userId).subscribe((res)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.projectFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Projects';
      })
    })
  }

  submit(value:any){
    this.mainService.updateProject(this.data.id,value).subscribe((result)=>{
      this.data = result;
      console.log(this.data);
      
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

