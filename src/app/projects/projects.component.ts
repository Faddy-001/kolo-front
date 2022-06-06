import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddProjectDialogComponent } from "./add-project-dialog/add-project-dialog.component";
import { EditProjectDialogComponent } from "./edit-project-dialog/edit-project-dialog.component";
import { MainService } from '../services/main.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

import * as $ from 'jquery';
// declare var $: any;
// import 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';





@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  valueToSearch:any;
  
  // dtOptions: DataTables.Settings = {};
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  pageCounts: any;
  newLeads: any = [];
  name: string='';
  description:string='';
  address:string='';
  knowWidth:any;
  projectData:any;
  projects:any=[];
  projectId!: number;
  data: any; 
  showCrossicon:boolean=false;
  p: number=1;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  projectFeature:any;
  sector: any;
  sortedCollection:any=[];
  totalRecords:number=0;
  perPageRecord:number=10;
  totalPages:number=0;
  total_area: any;
  saleable: any;
  nonsaleable: any;
  ascIcon:boolean=true;
  desIcon:boolean=false;
  showName:boolean=true;
  showSector:boolean=true;
  showDesc:boolean=true;
  showAdd:boolean=true;
  showTotalArea:boolean=true;
  showSaleable:boolean=true;
  showNonSaleable:boolean=true;
  

  constructor(public dialog: MatDialog, private mainService:MainService,public toastr: ToastrService,public auth:AuthenticationService) {
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
   
    
    this.mainService.getProjects().subscribe((result)=>{
      this.projectData = result;
      console.log(this.projectData);
      
      this.projects = this.projectData.projects;
      this.totalRecords = this.projects.length;
      
      this.totalPages=Math.ceil(this.totalRecords/this.perPageRecord);
      console.log(this.totalPages);
    })

    this.knowWidth = $(window).width();
  
    if(this.knowWidth > 1024){
      $('.showFooter').remove();
      
    }
    else{
      $('.showHeader').remove();
    }

    if(window.innerWidth<=1024){
      this.showCrossicon=true
    }
  }

  Search(){
    if(this.valueToSearch == ''){
     this.ngOnInit();
    }
    else{
     this.projects = this.projects.filter((res:any)=>{   
      res.description == null ? res.description = "" : res.description;   
          return res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.sector.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.address.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
     })
    } 
   }
  


  openDialog(){
    const dialogRef = this.dialog.open(AddProjectDialogComponent,{
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
/*---sorting for name---*/
sortName(prop:string ,asc:boolean)
{
  if(asc)
  {
    this.showName = false;
  }
  else
  {
    this.showName = true;
  }
  this.projects = this.projects.sort(function(a:any,b:any){
    let x = a[prop].toLowerCase();
    let y = b[prop].toLowerCase();
    if(asc)
    {
      return (x>y)?1 : ((x<y) ?-1:0);
      //return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);

    }
    else
    {
      return (y>x)?1 : ((y<x) ?-1:0);
     // return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
    }
  })
}

/*---sorting for sector---*/
sortSector(prop:string ,asc:boolean)
{
  if(asc)
  {
    this.showSector = false;
  }
  else
  {
    this.showSector = true;
  }
  this.projects = this.projects.sort(function(a:any,b:any){
    let x = a[prop].toLowerCase();
    let y = b[prop].toLowerCase();
    if(asc)
    {
      return (x>y)?1 : ((x<y) ?-1:0);
      //return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);

    }
    else
    {
      return (y>x)?1 : ((y<x) ?-1:0);
     // return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
    }
  })
}
/*-----sorting description------*/
sortDescrip(prop:string ,asc:boolean)
{
  if(asc)
  {
    this.showDesc = false;
  }
  else
  {
    this.showDesc = true;
  }
  this.projects = this.projects.sort(function(a:any,b:any){
    let x = a[prop].toLowerCase();
    let y = b[prop].toLowerCase();
    if(asc)
    {
      return (x>y)?1 : ((x<y) ?-1:0);
      //return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);

    }
    else
    {
      return (y>x)?1 : ((y<x) ?-1:0);
     // return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
    }
  })
}
/*----address sorting-------*/
sortAddress(prop:string ,asc:boolean)
{
  if(asc)
  {
    this.showAdd = false;
  }
  else
  {
    this.showAdd = true;
  }
  this.projects = this.projects.sort(function(a:any,b:any){
    let x = a[prop].toLowerCase();
    let y = b[prop].toLowerCase();
    if(asc)
    {
     
      return (x>y)?1 : ((x<y) ?-1:0);
      //return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);

    }
    else
    {
      return (y>x)?1 : ((y<x) ?-1:0);
     // return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
    }
  })
}
/*----total area sorting-------*/
sortTotalArea(prop:string ,asc:boolean)
{
  if(asc)
  {
    this.showTotalArea = false;
  }
  else
  {
    this.showTotalArea = true;
  }
  this.projects = this.projects.sort(function(a:any,b:any){
    let x = a[prop]
    let y = b[prop]
    if(asc)
    {
     
      return (x>y)?1 : ((x<y) ?-1:0);
      //return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);

    }
    else
    {
      return (y>x)?1 : ((y<x) ?-1:0);
     // return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
    }
  })
}
/*----saleable sorting-------*/
sortSaleable(prop:string ,asc:boolean)
{
  if(asc)
  {
    this.showSaleable = false;
  }
  else
  {
    this.showSaleable = true;
  }
  this.projects = this.projects.sort(function(a:any,b:any){
    let x = a[prop]
    let y = b[prop]
    if(asc)
    {
     
      return (x>y)?1 : ((x<y) ?-1:0);
      //return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);

    }
    else
    {
      return (y>x)?1 : ((y<x) ?-1:0);
     // return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
    }
  })
}
/*----non saleable sorting-------*/
sortNonSaleable(prop:string ,asc:boolean)
{
  if(asc)
  {
    this.showNonSaleable = false;
  }
  else
  {
    this.showNonSaleable = true;
  }
  this.projects = this.projects.sort(function(a:any,b:any){
    let x = a[prop]
    let y = b[prop]
    if(asc)
    {
     
      return (x>y)?1 : ((x<y) ?-1:0);
      //return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);

    }
    else
    {
      return (y>x)?1 : ((y<x) ?-1:0);
     // return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
    }
  })
}
  openEditForm(id:number){
    this.mainService.getProject(id).subscribe((result)=>{
      this.projectData = result;
      console.log( this.projectData);
      
      this.name = this.projectData.project.name;
      this.sector = this.projectData.project.sector;
      this.total_area = this.projectData.project.total_area,
      this.saleable = this.projectData.project.saleable,
      this.nonsaleable = this.projectData.project.nonsaleable,
      this.description = this.projectData.project.description;
      this.address = this.projectData.project.address;
      this.projectId= this.projectData.project.id;
      
      const dialogRef = this.dialog.open(EditProjectDialogComponent,{
        width: '500px',
        data: {id:this.projectId,name: this.name, sector: this.sector, total_area:this.total_area,saleable:this.saleable,nonsaleable:this.nonsaleable, description: this.description, address: this.address}
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
        this.mainService.deleteProject(val).subscribe((res)=>{
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
