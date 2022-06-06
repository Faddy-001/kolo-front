import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  projectData:any;
  projects:any;
  roleData:any;
  roles:any;
  id:any;
  deptsData:any
  depts:any
  selectedFile:any=[];
  filesToUpload:any=[];
  extension:any
  extensionErr:any
  imageData:any
  showExtError:any
  Id:any;
  UserPreviousImage:any
  succMsg:any;
  newMsg:any;
  edit:boolean=false;
  Name:string=''
  Email:any;
  Gender:string=''
  Phone:any;
  Address:any;
  PostalCode:any
  City:string=''
  State:string=''
  Country:string=''
  Department:string=''
  Project:any=[];
  AlterNatemobile:any;
  Role:string=''
  projectId:any;
  newDepts:any=[];
  disabledept: boolean = true;
  // DefaultImg:string="../../../assets/images/PngItem_1503945.png"
  DefaultImg:string="assets/images/PngItem_1503945.png"
  getPermission:any;
  logindata:any;
  userId:any;
  features:any;
  userFeature:any;
  userData:any;
  isAddDisabled:boolean=false
  isField:boolean=false;
  projectIdIndex: any=[0];
  projectIdIndexName:any=[0];
  errorMsg: any;
  errorShow: any;


  constructor(public dialogRef: MatDialogRef<EditUserComponent>, private formbuilder:FormBuilder,
    private mainService:MainService,  private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.UserPreviousImage=this.data.image?this.data.image:this.DefaultImg;
      this.Id=this.data.id
      this.editUserForm= this.formbuilder.group({
        name:[],
        email: [],
        gender: [],
        phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        address:this.formbuilder.group({
           address:[],
           postal_code: [],
           city: [],
           state: [],
           country: [],
      }),
      projects:this.formbuilder.array([]),
        role_id: [],
        alternate_phone: [],
      })
    }
  
    patchForm() {
      this.editUserForm.patchValue({
        name:this.data.name,
        email: this.data.email,
        gender: this.data.gender,
        phone: this.data.phone,
        address:this.editUserForm.controls['address'].patchValue({
           address:this.data.address,
           postal_code: this.data.postal_code,
           city: this.data.city,
           state: this.data.state,
           country: this.data.country,      
        }),
        role_id: this.data.role,
        alternate_phone: this.data.alternate_phone,
      })
      this.setExpenseCategories()
    }

    setExpenseCategories() {
      this.mainService.getProjects().subscribe(async (result:any)=>{
        this.projectData = result;
        this.projects = this.projectData.projects;
        let control = <FormArray>this.editUserForm.controls.projects;
        
        const mapped = this.data.projects.map((data:any)=>{
          data.departments = [data.departments]
          return data
        })
     
        mapped.forEach((item:any,i:any)=>{
          control.push(this.formbuilder.group({
            id: [item.id, Validators.required],
            departments: [item.departments[0], Validators.required]
          })) 
                   
          this.projectIdIndex[i] = this.projects.map(function(f:any) { return f.id; }).indexOf(item.id);
          this.projectIdIndexName[i] = this.projects.map(function(f:any) { return f.name; }).indexOf(item.name);         
        })
      })  
    }
  
    projectDepts(): FormArray {
      return this.editUserForm.get('projects') as FormArray;
    }

    newFields(i: any = 0): FormGroup {
      return this.formbuilder.group({
        id: [[Validators.required]],
        departments: [Validators.required]
      })
    }

    count=0;
    removeField(i: number){
      this.projectDepts().removeAt(i);  
      this.count--;
      if(this.count<this.projects.length-1){
      this.isAddDisabled=false
      }
    }

    addProject(){
      this.count++;
      this.isField=true; 
  
      const control = this.editUserForm.controls.projects;
      
      this.projectIdIndex.push(this.projectDepts().length)
  
      this.projectDepts().push(this.newFields(this.projectDepts().length));
     
     if(this.count==this.projects.length-1){
       this.isAddDisabled=true
     }  
    }

  ngOnInit(): void {
    this.patchForm();
    //get feature
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    
    this.mainService.getUser(this.userId).subscribe((res:any)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions; 
      this.userFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Users';
      })
    })
    
    this.Name=this.data.name
    this.Email=this.data.email;
    this.Gender=this.data.gender;
    this.Phone=this.data.phone;
    this.Address=this.data.address;
    this.PostalCode=this.data.postal_code;
    this.City=this.data.city;
    this.State=this.data.state;
    this.Country=this.data.country;
    this.Department=this.data.deptName;
    this.Project=this.data.projects;
    this.projectId=this.data.project
    this.Role=this.data.roleName;
    this.AlterNatemobile=this.data.alternate_phone;
  //  console.log(this.Project);
   
   if(this.Project!=null){
    this.disabledept=false;
   }
    
    //  console.log(this.editUserForm.get('image')?.value);
     
     //projects api
    this.mainService.getProjects().subscribe((result:any)=>{
      this.projectData = result;
      this.projects = this.projectData.projects;
    })
    //roles api
    this.mainService.getRoles().subscribe((result:any)=>{
      this.roleData = result;
      this.roles = this.roleData.role;
      });
      //dept api
    this.mainService.getDeprtments().subscribe(res=>{
      this.deptsData = res;
      this.depts = this.deptsData.department;          
      this.newDepts= this.deptsData.department;  
      this.depts = this.newDepts.filter((department:any)=>{
        return department.Project.id ==  this.projectId
      })
    });
  }


  showMsg() {
    if (this.disabledept == true) {
      $("#deptErr").fadeIn();
    }
  }
  GetProject(e:any,i:number){
  //   this.disabledept = false;
  //   $("#deptErr").fadeOut();
  //   console.log(e.value);
  //   this.depts = this.newDepts.filter((department:any)=>{
  //   return department.Project.id == e.value;
  // })
  if(e.value != undefined){
    this.disabledept = false;
    $("#deptErr").fadeOut();
    let id = parseInt(e.value);
    this.projectIdIndex[i] = this.projects.map(function(f:any) { return f.id; }).indexOf(id);
  }
}
  
  userImage(event:any){
    this.selectedFile = event.target.files[0];
    this.filesToUpload.push(this.selectedFile);
    var fileName = this.selectedFile.name;
    this.extension = fileName.split('.').pop();
    var reader = new FileReader();

    if(this.extension == 'png' || this.extension == 'jpg' || this.extension == 'jpeg' || this.extension == 'gif' || this.extension == 'webp')
    {
      reader.onload = (e:any) =>{
        $('#blah').attr('src', e.target.result);
      } 
      reader.readAsDataURL(this.selectedFile); // convert to base64 string
      this.extensionErr = false;      
    }
    else {
      this.showExtError = "Couldn't set profile photo.";
      this.extensionErr = true;
    }
  }
  deleteImg(){
    this.selectedFile = undefined;
    $('#blah').attr('src', 'assets/images/PngItem_1503945.png');
  }

  editUser(){
   this.edit=true;
  }

  submit(value:any)
  {
   const formData = new FormData();
   formData.append('name', value.name);
   formData.append('email', value.email);
   formData.append('gender', value.gender);
   formData.append('phone', value.phone);
   formData.append('alternate_phone', value.alternate_phone);
   formData.append('role_id', value.role_id);
   formData.append('projects', JSON.stringify(value.projects));
   formData.append('address', JSON.stringify(value.address));
   if(this.selectedFile.length == 0 ){
    formData.append('profile_image','');
  }
  else{
    if(this.extension == 'png' || this.extension == 'jpg' || this.extension == 'jpeg' || this.extension == 'gif' || this.extension == 'webp'){
    formData.append('profile_image',this.selectedFile);

  }
}
// return 0;
this.mainService.update_user(this.Id,formData).subscribe(res=>{
  // this.succMsg=res;
  this.data = res;
  this.dialogRef.close(this.data);
  this.newMsg=this.data.message;
  this.toastr.success(this.newMsg)
  
},
err=>{
  console.log(err);
  this.errorShow=err;
      this.errorMsg=this.errorShow.error.error.email?this.errorShow.error.error.email:this.errorShow.error.error.phone;
      this.toastr.error(this.errorMsg);
})
  }
}
