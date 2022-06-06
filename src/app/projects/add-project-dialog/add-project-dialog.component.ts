import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// declare var $: any;
import 'datatables.net';


@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.scss']
})
export class AddProjectDialogComponent implements OnInit {
  valueText:string="";
  addProjectForm!: FormGroup;
  disabled:boolean=true;
  public editor:any= ClassicEditor;
 name:string='';
 datar:any;
 config={

   toolbar: [ 'heading', '|', 'bold', 'italic' ] 
}
  errorMsg: any;

  constructor( public dialogRef: MatDialogRef<AddProjectDialogComponent>, private formbuilder: FormBuilder,
    private mainService:MainService, private toastr: ToastrService,  @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.addProjectForm = this.formbuilder.group({
        name:[null, Validators.required],
        sector:[null, Validators.required],
        description:[null],
        address:[null, Validators.required],
        total_area:[null,Validators.required],
        saleable:[null],
        nonsaleable:[null],
      })
    }

  ngOnInit(): void {
  }

  submit(value:any){
    
    this.mainService.addProject(value).subscribe((result)=>{
      this.data = result;
      this.dialogRef.close(this.data);
      this.toastr.success(this.data.message)
    },
    err => {
      this.data = err;
      this.errorMsg = this.data.error.error.name;
      this.dialogRef.close(this.errorMsg);
      this.toastr.error(this.errorMsg)
    })
    
  }

  close(){
    this.dialogRef.close();
  }


}
