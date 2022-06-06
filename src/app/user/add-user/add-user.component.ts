import { Component, OnInit , Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,FormArray } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
  
})
export class AddUserComponent  implements OnInit {
  valueText:string="";
  hide = true;
  addUserForm:FormGroup;
  roleData:any;
  roles:any;
  projectData:any;
  projects:any;
  pinCode!: number;
  pinValue!: number;
  postalCodes:any;
  cityValue:string='';
  stateValue:string='';
  countryValue:string='';
  postalCodeData:any=[];
  postOffice:any;
  postalError:boolean = false;
  postalMsg:string='';
  selectedFile:any;
  filesToUpload: any = [];
  extension:any;
  putValue:string='';
  address:any= [];
  succMsg:any;
  newMsg:any;
  deptData:any;
  departments:any=[];
  newDepts:any=[];
  disabledept: boolean = true;
  disabled:boolean=true;
  isField:boolean=false;
  projectIdIndex: any=[0];
  isAddDisabled:boolean=false
  errorMsg: any;
  errorShow: any;
  errorMsg1: any;


  constructor( private formbuilder: FormBuilder, private mainService:MainService, private route:Router, private toastr: ToastrService) { 
    // this.projectIdIndex.push(0)
    this.addUserForm = this.formbuilder.group({
      name:[null,Validators.required],
      email:['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gender:[null,Validators.required],
      phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      alternate_phone:[null, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      role_id:[null,Validators.required],
      projects:this.formbuilder.array([this.newFields()]),
      password:[null,Validators.required],
      address:this.formbuilder.group({
        address:[null,Validators.required],
        postal_code:[null,Validators.required],
        city:[null],
        state:[null],
        country:[null]
      })
    })
  }

  onChange(value:number){
    this.mainService.getPostalCodes(value).subscribe((result)=>{
      this.postalCodes = result;
      this.postOffice = this.postalCodes[0].PostOffice;
      if(this.postalCodes[0].Status == 'Success') {
        this.postalError = false;
        this.postalCodeData=[];
        this.postalCodes.forEach((data:any)=>{
          this.postalCodeData.push({
            Message: data['Message'],
            Status: data['Status'],
            City: data['PostOffice'][0]['District'],
            State: data['PostOffice'][0]['State'],
            Country: data['PostOffice'][0]['Country'],
            Pincode: data['PostOffice'][0]['Pincode'],
          });
        })
        this.addUserForm.get(['address','city'])?.setValue(this.postalCodeData[0].City);
        this.addUserForm.get(['address','state'])?.setValue(this.postalCodeData[0].State);
        this.addUserForm.get(['address','country'])?.setValue(this.postalCodeData[0].Country);
      }
      else if(this.postalCodes[0].Status == 'Error'){
        this.postalMsg = this.postalCodes[0].Message;
        this.postalError = true;
        this.addUserForm.get(['address','city'])?.setValue('');
        this.addUserForm.get(['address','state'])?.setValue('');
        this.addUserForm.get(['address','country'])?.setValue('');
      }
      else {
        this.postalError = false;
      }
    })
  }

  projectDepts(): FormArray {
    return this.addUserForm.get('projects') as FormArray;
  }

  getFilterGroupAtIndex(index:any) {
    return (<FormGroup>this.projectDepts().at(index));
  }
  
  newFields(i: any = 0): FormGroup {
    return this.formbuilder.group({
      id: [i,Validators.required],
      departments: [,Validators.required]
    })
  }

  count=0;
  addProject() {
    this.count++;
    
    this.isField=true; 

    const control = this.addUserForm.controls.projects;

    this.projectIdIndex.push(this.projectDepts().length)

    this.projectDepts().push(this.newFields(this.projectDepts().length));
   
   if(this.count==this.projects.length-1){     
     this.isAddDisabled=true
   }
    
  }

  removeField(i: number){
    this.projectDepts().removeAt(i);  
    this.count--;
    if(this.count<this.projects.length-1){
    this.isAddDisabled=false
    }
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  ngOnInit(): void {
    this.getRoles();
    this.getProjects();
    // this.getDept();
  }

  logMessage(value:any){
    console.log(value);    
  }

  getRoles(){
    this.mainService.getRoles().subscribe((result)=>{
      this.roleData = result;
      this.roles = this.roleData.role;
    });
  }

  getProjects() {
    this.mainService.getProjects().subscribe(result=>{
      this.projectData = result;
      this.projects = this.projectData.projects; 
    },
    err=>{
      console.log(err);
    })
  }



  showMsg() {
    if (this.disabledept == true) {
      $("#deptErr").fadeIn();
    }
  }


  GetProject(e:any,i:number) {
    if(e.value != undefined){
        this.disabledept = false;
        $("#deptErr").fadeOut();
        let id = parseInt(e.value);
        this.projectIdIndex[i] = this.projects.map(function(f:any) { return f.id; }).indexOf(id);
      }
  }

  userImage(e:any) {
  this.selectedFile = e.target.files[0];
  this.filesToUpload.push(this.selectedFile);
  var fileName = this.selectedFile.name;
  this.extension = fileName.split('.').pop();
  var reader = new FileReader();
  if(this.extension == 'jpg' || this.extension == 'png' || this.extension == 'jpeg' || this.extension == 'gif' || this.extension == 'webp')
    {
      reader.onload = (e:any) =>{
        $('#blah').attr('src', e.target.result);
      
      }
    }
    reader.readAsDataURL(this.selectedFile); // convert to base64 string
  }
  deleteImg(){
    this.selectedFile = undefined;
    $('#blah').attr('src', 'assets/images/PngItem_1503945.png');
  }

  submit(value:any) {
   // value.customer.lead_id == null || value.customer.lead_id == "" ? delete value.customer.lead_id : true;
    value.alternate_phone==null? delete value.alternate_phone : true;
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('email', value.email);
    formData.append('gender', value.gender);
    formData.append('phone', value.phone);
    if (value.alternate_phone) {
    formData.append('alternate_phone', value.alternate_phone);      
    }
    formData.append('role_id', value.role_id);
    formData.append('projects', JSON.stringify(value.projects));
    formData.append('password', value.password);
    formData.append('address', JSON.stringify(value.address));
    formData.append('profile_image',this.selectedFile);
    
    this.mainService.addUser(formData).subscribe(result=>{
      this.succMsg=result
      this.newMsg=this.succMsg.message
      this.toastr.success(this.newMsg)
      this.route.navigateByUrl('/layout/master/user');
    },
    err=> {
      console.log(err); 
      this.errorShow=err;
      this.errorMsg=this.errorShow.error.error.email?this.errorShow.error.error.email:this.errorShow.error.error.phone;
      this.toastr.error(this.errorMsg);
    })
  }
}

