import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
  id:number;
  leadLogs:any=[];
  leadLog:any=[];
  newleadLog:any=[];
  nikks:boolean=false

  constructor(public dialogRef: MatDialogRef<ActivityLogComponent>,private mainService: MainService,private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    
    this.id=data.id
    
   }

  ngOnInit(): void {
    this.newleadLog=[];
    this.mainService.getLead(this.id).subscribe((result)=>{
      this.leadLogs=result
      this.leadLog=this.leadLogs.lead.Lead_Logs

      this.leadLog.forEach((data:any) => {
        this.newleadLog.push({
          crename:data.CRE.name,
          Remark:data.remark,
          createDate:data.createdAt,
          FollowUpDate:data.follow_up_date,
          ExpectedVDate:data.expected_visit_date
        })
      });   
    },(err)=>{
      console.log(err);
    })  
  }
  close(){
    this.dialogRef.close();
  }
}
