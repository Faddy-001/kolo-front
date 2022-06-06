import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';



@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  editRoleForm!: FormGroup;
  roleId!: number;
  errorMsg: any;
  moduleRes:any;
  modules:any;
  leadFeature:any;
  isCreate:boolean=false;
  isRead:boolean=false;
  isUpdate:boolean=false;
  isDelete:boolean=false;
  isFullAccess:boolean=false;
  masterFeature:any=false;
  collectionFeature:any;
  featureArray:any=[];
  isLead:boolean=false;
  isMaster:boolean=false;
  isCollection:boolean=false;
  checked:boolean=false;
  features:any;
  module:any={};
  masterFeature2:any;
  moduleName:any;
  newMasterArr:any=[];
  newLeadArr:any=[];
  newCollectionArr:any=[];
  defaultleadArr:any=[];
  defaultMasterArr:any=[];
  defaultCollectionArr:any=[];
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  feature:any;
  roleFeature:any;

  constructor( private toastr: ToastrService, public dialogRef: MatDialogRef<EditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private mainService:MainService,
    private route:ActivatedRoute,private formbuilder: FormBuilder) { 
      this.editRoleForm = this.formbuilder.group({
        name:[data.name, Validators.required],
        description: [data.description]
      })
  }

  getCreate(e:any,id:number) {
    this.isCreate=e.checked;
    this.featureArray.map((data:any)=>{
        if(data.id == id){
          data.create = this.isCreate;
        }
      return data;
    })
  }
  
  getRead(e:any,id:number) {
    this.isRead=e.checked;
    this.featureArray.map((data:any)=>{
      if(data.id == id){
        data.read = this.isRead;
      }
      return data;
    }) 
  }
  
  getUpdate(e:any,id:number) {
    this.isUpdate = e.checked;
    this.featureArray.map((data:any)=>{
      if(data.id == id){
        data.update = this.isUpdate;
      }
      return data;
    }) 

  }
  
  getDelete(e:any,id:number) {
    this.isDelete = e.checked;
    this.featureArray.map((data:any)=>{
      if(data.id == id){
        data.delete = this.isDelete;
      }
      return data;
    }) 
  }
  
  getFullAccess(e:any,id:number){
    this.isFullAccess = e.checked;

    this.featureArray.map((data:any)=>{
      if(data.id == id){
        data.fullAccess = this.isFullAccess;
        data.create=this.isFullAccess;
        data.read=this.isFullAccess;
        data.update=this.isFullAccess;
        data.delete=this.isFullAccess;
      }
      return data;
    }) 
  }

  ngOnInit(): void {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;    
    this.mainService.getUser(this.userId).subscribe((res)=> { 
      this.userData = res;
      this.feature = this.userData.user.Role.Feature_Access_Permissions;
      this.roleFeature = this.feature.filter((data:any)=> {
        return data.Feature.name == 'Roles';
      })
    })
    this.features = this.data.features;
    this.moduleRes = this.data.module_permission;
    this.module= {
      lead:this.moduleRes.lead,
      master:this.moduleRes.master,
      collection:this.moduleRes.collection
    }
    
    if(this.module.master == true){
      this.isMaster = true;
    }
    if(this.module.lead == true){
      this.isLead = true;
    }
    if(this.module.collection == true){
      this.isCollection = true;
    }

    this.leadFeature = this.features.filter((x:any)=>{
     return x.Feature.Modules[0].name == 'Lead'
    })    
    
    this.masterFeature = this.features.filter((x:any)=>{
      return x.Feature.Modules[0].name == 'Master'
    })

    this.collectionFeature = this.features.filter((x:any)=>{
    return x.Feature.Modules[0].name == 'Collection'
    })
   
    this.mainService.getModules().subscribe((result)=>{
      this.moduleRes = result;
      this.modules = this.moduleRes.modules;
      
      const master = this.modules.filter((data:any)=>{
        return data.name == 'Master';
      })

      const lead = this.modules.filter((data:any)=>{
        return data.name == 'Lead';
      })
      
      const collection = this.modules.filter((data:any)=>{
        return data.name == 'Collection';
      })

      const leadFeature2 = lead.map((data:any)=>{
        return data.Features
      })
      
      leadFeature2[0].forEach((data:any)=> {
        this.newLeadArr.push({
          id:data.id,
          name:data.name,
          create:this.isCreate,
          read:this.isRead,
          delete:this.isDelete,
          update:this.isUpdate,
          fullAccess:this.isFullAccess
        })
        this.defaultleadArr.push({
          id:data.id,
          name:data.name,
          create:this.isCreate,
          read:this.isRead,
          delete:this.isDelete,
          update:this.isUpdate,
          fullAccess:this.isFullAccess
        })
      })
      
      this.newLeadArr.forEach((data:any)=>
        this.leadFeature.forEach((data2:any)=>{
          if(data.name == data2.Feature.name){
            data.create = data2.create;
            data.read = data2.read;
            data.update = data2.update;
            data.delete = data2.delete;
            data.fullAccess = data2.fullAccess;
          }
        })
      )

      const masterFeature2 = master.map((data:any)=>{
        return data.Features
      })

      masterFeature2[0].forEach((data:any)=>{
        this.newMasterArr.push({
          id:data.id,
          name:data.name,
          create:this.isCreate,
          read:this.isRead,
          delete:this.isDelete,
          update:this.isUpdate,
          fullAccess:this.isFullAccess
        })
        this.defaultMasterArr.push({
          id:data.id,
          name:data.name,
          create:this.isCreate,
          read:this.isRead,
          delete:this.isDelete,
          update:this.isUpdate,
          fullAccess:this.isFullAccess
        })
      })
        
      this.newMasterArr.forEach((data:any)=> 
        this.masterFeature.forEach((data2:any)=> {
          if(data.name == data2.Feature.name){
            data.create = data2.create;
            data.read = data2.read;
            data.update = data2.update;
            data.delete = data2.delete;
            data.fullAccess = data2.fullAccess;
          }
        })
      )
        
      //get final collection features array
      const collectionFeature2 = collection.map((data:any)=>{
        return data.Features            
      })

      collectionFeature2[0].forEach((data:any)=>{
        this.newCollectionArr.push({
          id:data.id,
          name:data.name,
          create:this.isCreate,
          read:this.isRead,
          delete:this.isDelete,
          update:this.isUpdate,
          fullAccess:this.isFullAccess
        })
        this.defaultCollectionArr.push({
          id:data.id,
          name:data.name,
          create:this.isCreate,
          read:this.isRead,
          delete:this.isDelete,
          update:this.isUpdate,
          fullAccess:this.isFullAccess
        })
      })

      this.newCollectionArr.forEach((data:any)=>
        this.collectionFeature.forEach((data2:any)=>{
          if(data.name == data2.Feature.name){
            data.create = data2.create;
            data.read = data2.read;
            data.update = data2.update;
            data.delete = data2.delete;
            data.fullAccess = data2.fullAccess;
          }
        })
      ) 
      this.featureArray = this.newLeadArr.concat(this.newMasterArr).concat(this.newCollectionArr);
    })
  }

 
  getFeature(name:any,e:any){
    this.moduleName = name; 

    if(e.target.checked == false && this.moduleName == 'lead'){
      this.isLead=false;
    }
    else if(e.target.checked == false && this.moduleName == 'master'){
      this.isMaster = false;
      
    }
    else if(e.target.checked == true && this.moduleName == 'lead'){
      this.isLead = true;
      
    }
    else if(e.target.checked == true && this.moduleName == 'master'){
      this.isMaster = true;
    }
    
    else if(e.target.checked == true && this.moduleName == 'collection'){
      this.isCollection=true;
    }
    else if(e.target.checked == false && this.moduleName == 'collection'){
      this.isCollection=false;
    }
  }

 

  finalFeatures:any=[];
  submit(value:any){
    this.finalFeatures = this.featureArray.filter((data:any)=>{
      return data.create == true || data.read == true || data.update == true || data.delete == true || data.fullAccess == true;
    })
    
    let roleData = {
      name:value.name,
      description:value.description,
      modulePermission:{
        lead:this.isLead,
        master:this.isMaster,
        collection:this.isCollection
      },
      featureAccessPermission:this.finalFeatures
    }

    this.mainService.updateRole(this.data.roleId,roleData).subscribe((result)=>{
      this.data = result;
      this.dialogRef.close(this.data);
      this.toastr.success(this.data.message)
    },
    err => {
      this.data = err;
      this.errorMsg = this.data.error.error.name;
      //this.dialogRef.close(this.errorMsg);
      this.toastr.error(this.errorMsg)
    })
  }

  close(){
    this.dialogRef.close();
  }

}
