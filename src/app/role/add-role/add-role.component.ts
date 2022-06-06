import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from '../../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  disabled:boolean=true;
  errorMsg: any;
  moduleRes:any;
  modules:any;
  masterFeature:any;
  moduleData:any=[];
  leadFeature:any;
  collectionFeature:any;
  isLead:boolean=false;
  isMaster:boolean=false;
  isCollection:boolean=false;
  isCreate:boolean=false;
  isRead:boolean=false;
  isUpdate:boolean=false;
  isDelete:boolean=false;
  isFullAccess:boolean=false;
  checked:boolean=false;
  featureArray:any=[];
  addRoleForm!: FormGroup;
  roleName:any;
  roleDesc:any;
  feaId:any;

  constructor( private toastr: ToastrService, public dialogRef: MatDialogRef<AddRoleComponent>,
    @Inject(MAT_DIALOG_DATA,) public data: any, private formbuilder: FormBuilder, private mainService:MainService) { 
      this.addRoleForm = this.formbuilder.group({
        name:[null, Validators.required],
        description:[null],
        full:[]
      })
  }
 
  getName(e:any){
    this.roleName = e.target.value;
  }

  getDesc(e:any){
    this.roleDesc = e.target.value;
  }
   
  getCreate(e:any,id:number){
    this.isCreate=e.checked;
    this.featureArray.map((data:any)=>{
      if(data.id == id){
        data.create = this.isCreate;
      }
      return data;        
    })          
  }

  getRead(e:any,id:number){
    this.isRead=e.checked;
    this.featureArray.map((data:any)=>{
      if(data.id == id){
        data.read = this.isRead;
      }
      return data;
    }) 
  }

  getUpdate(e:any,id:number){
    this.isUpdate = e.checked;
    this.featureArray.map((data:any)=>{
      if(data.id == id){
        data.update = this.isUpdate;
      }
      return data;
    })       
  }

  getDelete(e:any,id:number){
    this.isDelete = e.checked;
    this.featureArray.map((data:any)=>{
      if(data.id == id){
        data.delete = this.isDelete;
      }
      return data;
    }) 
  }

  getFullAccess(e:any,id:number) {
    this.feaId = id;
    this.isFullAccess = e.checked;
    this.featureArray.map((data:any)=> {
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

  moduleID:any;
  leadFeatureArr:any=[];
  masterFeatureArr:any=[];
  collectionFeatureArr:any=[];

  ngOnInit(): void {
    this.mainService.getModules().subscribe((result)=> {
      this.moduleRes = result;
      this.modules = this.moduleRes.modules;    
      this.moduleData=[];
      this.leadFeatureArr=[];
      this.masterFeatureArr=[];
      this.collectionFeatureArr=[];
      this.modules.forEach((data:any)=> {  
        switch(data.name) {
            case 'Lead':
              this.leadFeature = data.Features;
              this.leadFeature.forEach((data:any)=> {
                this.leadFeatureArr.push({
                  id:data.id,
                  name:data.name,
                  create:this.isCreate,
                  read:this.isRead,
                  update:this.isUpdate,
                  delete:this.isDelete,
                  fullAccess:this.isFullAccess,
                  Module_id:data.Module_Feature.module_id
                })
              })
              break;
            case 'Master':
              this.masterFeature = data.Features;
              this.masterFeature.forEach((data:any)=> {
                this.masterFeatureArr.push({
                  id:data.id,
                  name:data.name,
                  create:this.isCreate,
                  read:this.isRead,
                  update:this.isUpdate,
                  delete:this.isDelete,
                  fullAccess:this.isFullAccess,
                  Module_id:data.Module_Feature.module_id
                })
              })
              break;            
            case 'Collection':
              this.collectionFeature = data.Features;
              this.collectionFeature.forEach((data:any)=> {
                this.collectionFeatureArr.push({
                  id:data.id,
                  name:data.name,
                  create:this.isCreate,
                  read:this.isRead,
                  update:this.isUpdate,
                  delete:this.isDelete,
                  fullAccess:this.isFullAccess,
                  Module_id:data.Module_Feature.module_id
                })
              })
              break;
          }

        this.moduleData.push({
          id:data.id?data.id:null,
          name:data.name?data.name:null        
        })       
      })
      this.featureArray = this.masterFeatureArr.concat(this.leadFeatureArr).concat(this.collectionFeatureArr);
    })
  }

  moduleName:any;
  getLeadFeature(name:any,e:any) {
    this.moduleName = name;     
    if(e.target.checked == false && this.moduleName == 'Lead') {
      this.isLead=false;
    }
    else if(e.target.checked == false && this.moduleName == 'Master') {
      this.isMaster = false;
    }
    else if(e.target.checked == true && this.moduleName == 'Lead') {
      this.isLead = true;
    }
    else if(e.target.checked == true && this.moduleName == 'Master') {
      this.isMaster = true;
    }
    else if(e.target.checked == true && this.moduleName == 'Collection') {
      this.isCollection=true;
    }
    else if(e.target.checked == false && this.moduleName == 'Collection') {
      this.isCollection=false;
    }
  }

  finalFeatures:any;
  submit(value:any){
    this.finalFeatures =  this.featureArray.filter((data:any)=>{
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

    this.mainService.addRole(roleData).subscribe((result)=>{
     this.data = result;
     this.dialogRef.close(this.data);
     this.toastr.success(this.data.message)
    },
    err => {
      this.data = err;
      this.errorMsg = this.data.error.error.name;
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
