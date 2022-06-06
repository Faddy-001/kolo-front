import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-delete-dept-dialog',
  templateUrl: './delete-dept-dialog.component.html',
  styleUrls: ['./delete-dept-dialog.component.scss']
})
export class DeleteDeptDialogComponent implements OnInit {
  deleteDeptForm: FormGroup;
  project: any;
  projectData:  any;

  constructor(public dialogRef: MatDialogRef<DeleteDeptDialogComponent>,private formbuilder: FormBuilder,
     private mainService:MainService,
     @Inject(MAT_DIALOG_DATA) public data: any) { this.deleteDeptForm = this.formbuilder.group({
      name:[''],
      description:[''],
      project_id:['']
    }) 
  }

  ngOnInit(): void {
    // this.mainService.getProjects().subscribe((result)=>{
    //   this.projectData = result;
    //   this.project = this.projectData.projects;
    //   console.log(this.project);
    // })
  }
  
  done(value: any){
    this.mainService.deleteDepartment(this.data.id)
    .subscribe((result)=>{
      this.data = result;
    this.dialogRef.close(this.data);
    
    })
  }


  close(){
    this.dialogRef.close();
  }

}
