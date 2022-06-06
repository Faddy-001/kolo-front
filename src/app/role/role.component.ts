import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import * as $ from 'jquery';
// import 'datatables.net';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { MainService } from '../services/main.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { MaterialModule } from '../material/material.module';
import { ToastrService } from 'ngx-toastr';

// export interface DialogData {
//   animal: string;
//   name: string;
// }


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleData:any;
  roles:any=[];
  roleName:any;
  roleId!: number;
  roleDesc:any;
  description:any='';
  knowWidth:any;
  animal: string='nikita';
  name: string='';
  newData:any;
  getRoleData:any;
  modalService: any;
  data: any;
  showCrossicon:boolean=false;
  valueToSearch:any;
  p:number = 1;
  isLead:any;
  isCollection:any;
  module_permission:any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  feature:any;
  roleFeature:any;
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
    
    this.mainService.getUser(this.userId).subscribe((res)=>{
      this.userData = res;
      this.feature = this.userData.user.Role.Feature_Access_Permissions;

      this.roleFeature = this.feature.filter((data:any)=>{
        return data.Feature.name == 'Roles';
      })
    })

    this.mainService.getRoles().subscribe((result)=>{
      this.roleData = result;
      this.roles = this.roleData.role;
      this.totalRecords = this.roles.length;
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
     this.roles = this.roles.filter((res:any)=>{
      res.description == null ? res.description = "" : res.description;
          return res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.description.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase());
     })
    }
  
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
  this.roles = this.roles.sort(function(a:any,b:any){
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
/*---sorting for description---*/
sortDesc(prop:string ,asc:boolean)
{
  if(asc)
  {
    this.showDesc = false;
  }
  else
  {
    this.showDesc = true;
  }
  this.roles = this.roles.sort(function(a:any,b:any){
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
  openDialog(){
    const dialogRef = this.dialog.open(AddRoleComponent,{
      width: '500px',
      // height:'800px',
      data: {}
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }



  features:any;
  feature_name:any=[];
  editPopup(id:number){
    this.mainService.getRole(id).subscribe((result)=>{
      this.getRoleData = result;
      this.name = this.getRoleData.role.name;
      this.description = this.getRoleData.role.description;
      this.roleId = this.getRoleData.role.id;
      this.module_permission = this.getRoleData.role.Module_Permission;
      this.features = this.getRoleData.role.Feature_Access_Permissions;
      this.features.forEach((data:any)=>{
      this.feature_name.push(data.Feature.name)
      })

      const dialogRef = this.dialog.open(EditRoleComponent,{
        width: '500px',
        data: {name:this.name,description:this.description,roleId:this.roleId,module_permission:this.module_permission,features:this.features},
        
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
       this.mainService.deleteRole(val).subscribe((res)=>{
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
