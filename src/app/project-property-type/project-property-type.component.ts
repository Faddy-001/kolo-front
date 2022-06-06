import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { MainService } from '../services/main.service';
import { AddProjectPropertyTypeComponent } from './add-project-property-type/add-project-property-type.component';
import { EditProjectPropertyTypeComponent } from './edit-project-property-type/edit-project-property-type.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-property-type',
  templateUrl: './project-property-type.component.html',
  styleUrls: ['./project-property-type.component.scss']
})
export class ProjectPropertyTypeComponent implements OnInit {
  animal: string='nikita';
  project: string='';
  propertytype:string='';
  projectData: any;
  projects: any;
  propertyDetail: any;
  propertyType: any;
  propertyData: any;
  properties: any;
  ptype: any;
  pp:any=[];
  newPPT:any=[];
  projectId: any;
  propertyTypeId: any;
  projectName: any;
  propertyTypeName: any;
  data: any;
  showCrossicon:any=false;
  valueToSearch:any;
  p: number =1;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  projectPropertyTypeFeature:any;
  totalRecords:number=0;
  perPageRecord:number=10;
  totalPages:number=0;
  ascIcon:boolean=true;
  desIcon:boolean=false;
  showProject:boolean=true;
  showPropertyType:boolean=true;
  showUnits:boolean=true;
  showAreaType:boolean=true;
  showArea:boolean=true;
  showNoOfProp:boolean=true;
  showTotalArea:boolean=true;


  constructor(public dialog: MatDialog, private mainService:MainService,public toastr: ToastrService) { }

  ngOnInit(): void {
         //get feature
         this.getPermission = localStorage.getItem('user_info')
         this.logindata = JSON.parse(this.getPermission)
         this.userId = this.logindata.id;
         
         this.mainService.getUser(this.userId).subscribe((res:any)=>{
           this.userData = res;
           this.features = this.userData.user.Role.Feature_Access_Permissions;
           this.projectPropertyTypeFeature = this.features.filter((data:any)=>{
             return data.Feature.name == 'Project Property Types';
           })       
         })

     this.mainService.getprojectPropertyTypes().subscribe(result=>{
       this.projectData = result;
       this.ptype=this.projectData.projectPropertyTypes;
       
       this.totalRecords = this.ptype.length;
       
       this.newPPT=[];
       this.ptype.forEach((data: any)=>{
         this.newPPT.push({         
           id: data.id,
           name: data.Project.name,
           property:data.PropertyType.name,
           units:data.units
         });
       });
       
     },err=>{   })

  if (window.innerWidth <= 1024) {
    this.showCrossicon = true
  }
 }

 Search(){
  if(this.valueToSearch == ''){
   this.ngOnInit();
  }
  else{
   this.newPPT = this.newPPT.filter((res:any)=>{
        return res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
       || res.property.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase());
   })
  }

 }
/*---sorting----*/
sortProject(asc:boolean)
 {
   if(asc)
   {
     this.showProject = false;
   }
   else
   {
     this.showProject = true;
   }
   this.newPPT.sort(function (a:any, b:any) 
   {
     
     //return a.name.localeCompare(b.name.rendered);
     if(asc)
     {
       return (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) ? 1 : -1;
     }
     else
     {
       return (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) ? -1 : 1;
     }
   });
}

sortPropertyType(asc:boolean)
{
  if(asc)
  {
    this.showPropertyType = false;
  }
  else
  {
    this.showPropertyType = true;
  }
  this.newPPT.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      return (a.property.toLocaleLowerCase() > b.property.toLocaleLowerCase()) ? 1 : -1;
    }
    else
    {
      return (a.property.toLocaleLowerCase() > b.property.toLocaleLowerCase()) ? -1 : 1;
    }
  });
}

sortAreaType(asc:boolean)
{
  if(asc)
  {
    this.showAreaType = false;
  }
  else
  {
    this.showAreaType = true;
  }
  this.newPPT.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      return (a.area_type > b.area_type) ? 1 : -1;
    }
    else
    {
      return (a.area_type > b.area_type) ? -1 : 1;
    }
  });
}

sortNoOfProperty(asc:boolean)
{
  if(asc)
  {
    this.showNoOfProp = false;
  }
  else
  {
    this.showNoOfProp = true;
  }
  this.newPPT.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      return (a.units > b.units) ? 1 : -1;
    }
    else
    {
      return (a.units > b.units) ? -1 : 1;
    }
  });
}

sortArea(asc:boolean)
{
  if(asc)
  {
    this.showArea = false;
  }
  else
  {
    this.showArea = true;
  }
  this.newPPT.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      return (a.unit_area > b.unit_area) ? 1 : -1;
    }
    else
    {
      return (a.unit_area > b.unit_area) ? -1 : 1;
    }
  });
}

sortTotalArea(asc:boolean)
{
  if(asc)
  {
    this.showTotalArea = false;
  }
  else
  {
    this.showTotalArea = true;
  }
  this.newPPT.sort(function (a:any, b:any) 
  {
    
    //return a.name.localeCompare(b.name.rendered);
    if(asc)
    {
      return (a.total_area > b.total_area) ? 1 : -1;
    }
    else
    {
      return (a.total_area > b.total_area) ? -1 : 1;
    }
  });
}
  openDialog(){
    const dialogRef = this.dialog.open(AddProjectPropertyTypeComponent,{
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.ngOnInit();
    });
  }

  EditProjectPropertyType(id:number){
    this.mainService.getprojectPropertyType(id).subscribe((result: any)=>{    
      this.projectId        = result.projectPropertyType.Project.id;
      this.propertyTypeId   = result.projectPropertyType.PropertyType.id;
      this.projectName      = result.projectPropertyType.Project.name;
      this.propertyTypeName = result.projectPropertyType.PropertyType.name;
      
     
        const dialogRef = this.dialog.open(EditProjectPropertyTypeComponent,{
      width: '500px',
      data: {projectId: this.projectId, projectName: this.projectName, propertyTypeId: this.propertyTypeId, propertyTypeName: this.propertyTypeName}
    });


    dialogRef.afterClosed().subscribe(result => {
       this.ngOnInit();
    });
    })
  }  

  openDelete(val:any){
    const dialogRef = this.dialog.open(DeleteUserComponent,{ },);
    dialogRef.afterClosed().subscribe(result => {
      if(result=="yes"){
       this.mainService.deleteprojectPropertyType(val).subscribe((res)=>{
         this.data = res;
         this.toastr.success(this.data.message)
         this.ngOnInit()   
       },(err)=>{
         console.log(err);
       })
      }      
    });
  }
}
