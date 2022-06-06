import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-project-property-type',
  templateUrl: './edit-project-property-type.component.html',
  styleUrls: ['./edit-project-property-type.component.scss']
})
export class EditProjectPropertyTypeComponent implements OnInit {
  EditProjectPropertyTypeForm!: FormGroup;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  projectPropertyTypeFeature:any;
  projectData: any;
  project: any;
  properties: any;
  propertyDetail: any;
  propertyType: any;
  units: any;
  disabled:boolean=true;
  propertyerr:string=""
  errorMsg: any;
  Area: number = 0
  Units: number = 0
  total_area: number = 0
  area1: number = 0
  Length: number = 0;
  Breadth: number = 0;
  area: number= 0;
  Totalarea: number= 0;
  unit: number= 0;
  Rate: number= 0;
  unit_area:number= 0;
  area_type:number= 0;
  projects: number= 0;
  projectp: any;

  constructor(public dialogRef: MatDialogRef<EditProjectPropertyTypeComponent>, private formbuilder:FormBuilder,private mainService:MainService,
    @Inject(MAT_DIALOG_DATA) public data: any, public toastr: ToastrService) { 
      this.EditProjectPropertyTypeForm = this.formbuilder.group({
        project:[this.data.projectName, Validators.required],
        propertytype: [this.data.propertyTypeName, Validators.required],
        units:[this.units, Validators.required],
        area_length:[this.data.area_length],
        area_breadth:[this.data.area_breadth],
        unit_area:[this.data.unit_area, Validators.required],
        area_type:[this.data.area_type, Validators.required],
        total_area:[this.data.total_area, Validators.required],
      }) 
    }

  ngOnInit(): void {
    //get feature
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    this.getProjects();
    // this.getPropertyTypes(); 
    this.mainService.getUser(this.userId).subscribe((res:any)=>{
      console.log(res);
      this.userData = res;
      this.properties = this.propertyDetail.propertyTypes;
      console.log(this.userData);
      
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      console.log( this.features );
      
      this.projectPropertyTypeFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Project Property Types';
      })
      console.log(this.projectPropertyTypeFeature);
      
    })
  
  }
  getProjects()
  {
    this.mainService.getProjects().subscribe((result)=>{
      this.projectData = result;
      console.log(this.projectData);
      this.project = this.projectData.projects;
      // this.projectp= this.projectData.project;
      
    });
  }
  // getPropertyTypes()
  // {
  //   this.mainService.getPropertyTypes().subscribe((result:any)=>{
  //     this.propertyDetail=result
  //     this.properties = this.propertyDetail.propertyTypes;
  //     this.project = this.projectData.projects;
  //     console.log(this.project);
      
  //   });
  // }
  submit(value:any){  
    this.mainService.updateprojectPropertyType(this.data.id,value).subscribe((result:any)=>{
      this.data = result;
      console.log(this.data);
      
      this.dialogRef.close(this.data);
      this.toastr.success(this.data.message)
    },
    err => {
      this.data = err;
      this.errorMsg = this.data.error.error.name;
      this.toastr.error(this.errorMsg)
     } )
    }
    close(){
      this.dialogRef.close();
    }
  }