import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-dept-dialog',
  templateUrl: './add-dept-dialog.component.html',
  styleUrls: ['./add-dept-dialog.component.scss']
})
export class AddDeptDialogComponent implements OnInit {
  valueText:string="";
  addDeptForm: FormGroup;
  projectData:any;
  project:any;
  disabled:boolean=true;
  content = '<h3>HTML Test</h3>';
  errorMsg: any;

  constructor(public dialogRef: MatDialogRef<AddDeptDialogComponent>,private formbuilder: FormBuilder, 
    public toastr: ToastrService, private mainService:MainService,
     @Inject(MAT_DIALOG_DATA) public data: any) {
      this.addDeptForm = this.formbuilder.group({
        name:[null, Validators.required],
        description:[null],
        project_id:[null, Validators.required]
      })
     }

  ngOnInit(): void {
    this.mainService.getProjects().subscribe((result)=>{
      this.projectData = result;
      this.project = this.projectData.projects;
    })
 
  }

  submit(value:any){
    this.mainService.addDept(value).subscribe(res=> {
      this.data = res;
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
