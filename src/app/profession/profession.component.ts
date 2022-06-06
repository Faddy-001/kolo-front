import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProfessionComponent } from '../profession/add-profession/add-profession.component';
import { EditProfessionComponent } from './edit-profession/edit-profession.component';
import { MainService } from '../services/main.service';
import * as $ from 'jquery';
// import 'datatables.net';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.scss']
})
export class ProfessionComponent implements OnInit {
  animal: string='nikita';
  name: string='';
  description:string='';
  professionData: any;
  professionId!:number;
  professions: any;
  profession: any;
  knowWidth:any;
  data: any;
  showCrossicon:boolean=false;
  valueToSearch:any;
  p: number =1;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  professionFeature:any;
  totalRecords:number=0;
  perPageRecord:number=10;
  totalPages:number=0;
  ascIcon:boolean=true;
  desIcon:boolean=false;
  showName:boolean=true;
  showDesc:boolean=true;
  
 

  constructor(public dialog: MatDialog, private mainService:MainService,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    
    this.mainService.getUser(this.userId).subscribe((res:any)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.professionFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Professions';
      })
    })
    
    this.mainService.getProfessions().subscribe((result: any)=>{
      this.professionData = result;
      this.professions = this.professionData.professions;
      console.log(this.professions);
      
      this.totalRecords = this.professions.length;
    })

    this.knowWidth = $(window).width();
 
    if(this.knowWidth > 1024) {
      $('.showFooter').remove();
    } else {
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
      this.professions = this.professions.filter((res:any)=>{
        res.description == null ? res.description = "" : res.description;
        return res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
        || res.description.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase());
     })
    }
  
   }

  openDialog(){
    const dialogRef = this.dialog.open(AddProfessionComponent,{
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.ngOnInit();
    });
}

openEditForm(id:number){
  
  this.mainService.getProfession(id).subscribe((result)=>{
    this.professionData = result;
    this.name = this.professionData.profession.name;
    this.description = this.professionData.profession.description;
    this.professionData= this.professionData.profession.id;
    
    const dialogRef = this.dialog.open(EditProfessionComponent,{
      width: '500px',
      data: {id:this.professionData,name: this.name,description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  })

}
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
  this.professions = this.professions.sort(function(a:any,b:any){
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


sortDesc(asc:boolean)
{
 
  if(asc)
  {
    this.showDesc = false;
  }
  else
  {
    this.showDesc = true;
  }
  this.professions = this.professions.sort(function(a:any,b:any)
  {
    if(asc)
    {
      // if (a == null) 
      // {
      //   return 1;
      // }
      // if (b == null) 
      // {
      //   return -1;
      // }
      // if (a == b) 
      // {
      //   return 0;
      // }
      // return a[description] < b[prop] ? -1 : 1;
      if(a["description"] === null)
      {
          return Infinity;
      }
     else
     {
        return (a["description"]> b["description"]) ? 1 : -1;
     }
    }
    else
    {
      if(a["description"] === null)
      {
          return 0;
      }
     else
     {
        return (a["description"] > b["description"]) ? -1 : 1;
     }
      // if (a == null) 
      // {
      //   return 1;
      // }
    
      // if (b == null) 
      // {
      //   return -1;
      // }
    
      // if (a == b) 
      // {
      //   return 0;
      // }
      // return a[prop] < b[prop] ? 1 : -1;
    }
    
   
  })
  

}


openDelete(val:any){
  const dialogRef = this.dialog.open(DeleteUserComponent,{ },);
  dialogRef.afterClosed().subscribe(result => {
    if(result=="yes"){
     this.mainService.deleteProfession(val).subscribe((res)=>{
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



