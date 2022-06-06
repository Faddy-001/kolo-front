import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-project-desc',
  templateUrl: './project-desc.component.html',
  styleUrls: ['./project-desc.component.scss']
})
export class ProjectDescComponent implements OnInit {
Id:any;
oneprojects:any;
oneproject:any;
projectDesc:any;


  constructor(public dialogRef: MatDialogRef<ProjectDescComponent>, private mainService:MainService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.Id=this.data.id
    
   }

  ngOnInit(): void {
    this.mainService.getProject(this.Id).subscribe((result)=>{
     this.oneprojects=result
     this.oneproject=this.oneprojects.project
     this.projectDesc=this.oneproject.description
    })
  }

  close(){
    this.dialogRef.close();
  }

}
