import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project-property-type',
  templateUrl: './add-project-property-type.component.html',
  styleUrls: ['./add-project-property-type.component.scss']
})
export class AddProjectPropertyTypeComponent implements OnInit {
  valueText:string="";
  AddProjectPropertyTypeForm!: FormGroup;
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
  // Totalarea: number= 0;
 
  constructor(public dialogRef: MatDialogRef<AddProjectPropertyTypeComponent>,private formbuilder: FormBuilder, private mainService:MainService, 
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,private route: Router) {
      this.AddProjectPropertyTypeForm = this.formbuilder.group({
        project_id:[null, Validators.required],
        propertyType_id:[null, Validators.required],
        units:[null, Validators.required],
        area_length:[null],
        area_breadth:[null],
        unit_area:[null, Validators.required],
        area_type:[null, Validators.required],
        total_area:[null, Validators.required],
    
    })
   }

  ngOnInit(): void 
  {
    this.getProjects();
    this.getPropertyTypes();  
  }

  getProjects()
  {
    this.mainService.getProjects().subscribe((result)=>{
      this.projectData = result;
      this.project = this.projectData.projects;
    });
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 45|| charCode > 57)) {
      return false;
    }
    return true;

  }
  Unit(e: any)
   {
    this.Totalarea = 0;
    this.units = Number(e.target.value);
    this.Totalarea = this.units * this.area;
    console.log( this.Totalarea);
    
    this.AddProjectPropertyTypeForm.get('total_area')?.setValue(this.Totalarea);
   }
   getTotalArea(e: any)
   {
     this.units = 0;
     this.Totalarea = Number(e.target.value);
     this.unit= Number(this.Totalarea / this.area);
     this.AddProjectPropertyTypeForm.get('units')?.setValue(this.unit);
   }

  getArea()
  {
    this.Length = Number((<HTMLInputElement>document.getElementById("area_length")).value);
    this.Breadth = Number((<HTMLInputElement>document.getElementById("area_breadth")).value);
    this.total_area = this.Length * this.Breadth;
    this.area = this.total_area;
    console.log(this.area);
    this.AddProjectPropertyTypeForm.get('unit_area')?.setValue(this.area);
   
  }
  unitArea() {
    this.AddProjectPropertyTypeForm.get('total_area')?.setValue(null);
    this.AddProjectPropertyTypeForm.get('units')?.setValue(null);
  }
   getPropertyTypes()
  {
    this.mainService.getPropertyTypes().subscribe((result:any)=>{
      this.propertyDetail=result
      this.properties = this.propertyDetail.propertyTypes;
      this.project = this.projectData.projects;
    });
  }

  submit(value:any){
    console.log(value);
    this.mainService.addprojectPropertyType(value).subscribe((result)=>{
    this.dialogRef.close(this.data);
    this.data = result;
    console.log(this.data);
    
    this.toastr.success(this.data.message)
    this.route.navigateByUrl('/layout/master/project_property_type');

  },
  err=>{
    console.log(err)
    this.data = err;
    console.log(this.data.error.message);
    this.errorMsg=this.data.error.message;
    this.toastr.error(this.errorMsg)
  })
}

  save(){
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

}