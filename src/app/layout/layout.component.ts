import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import * as $ from 'jquery';
import { MainService } from '../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { EditUserComponent } from "../user/edit-user/edit-user.component";
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  userData:any;
  usersDetail:any=[];
  newUser:any
  name:any
  email:any
  gender:any
  phone:any
  department_id:any
  project_id:any
  role_id:any
  alternate_phone:any
  address:any
  image:any
  postal_code:any
  city:any
  state:any
  country:any
  id:any
  succMsg:any;
  newMsg:any;
  Dept:string='';
  Project:string='';
  Role:string='';
  value:any;
  user: any;
  getId:any;
  getPermission:any;
  logindata:any;
  userId:any;
  showName:any;
  hideDev: boolean = false;
  isShow:boolean = true;
 
  //DefaultImg='../../assets/images/avtar-image.png';
  DefaultImg='assets/images/avtar-image.png';
 
 
  
    constructor( private auth: AuthenticationService, 
      private router: Router, private mainService: MainService, public dialog: MatDialog, private toastr: ToastrService) {
 }

  activeButton:any
  activateClass(event:any){
    this.activeButton = event;
  }

  features:any;
  ngOnInit(): void {
    this.loadJsFile("assets/scripts/main.js");
   
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    this.auth.LoginUser(this.userId)

    this.mainService.getUser(this.userId).subscribe((result) => {
      this.userData = result;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      console.log(this.features);
      
      this.name = this.userData;
      console.log(this.name);
      
      this.showName = this.userData.user.name;
      this.Role = this.userData.user.Role.name; 
      if(this.userData.user.Image==null)
      {
        this.image=this.DefaultImg
      }
      else
      {
        this.image = this.userData.user.Image.src?this.userData.user.Image.src:null;
      }
   });

  }
  
  public loadJsFile(url:any) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

  Logout(){
    localStorage.clear();
  	this.auth.signout().subscribe(
  		(data)=>{
        this.router.navigateByUrl('/login');
  		},
  		(error)=>{
        localStorage.clear();
        this.router.navigateByUrl('/login');
  			console.log(error);
  		}
	)
  }

  toggleDisplay() {
    if(this.isShow == true)
    {
      this.isShow = false;
    }
    else
    {
      this.isShow = true;
    }
    
    // console.log(this.isShow);
    
  }
openDialog(){
  this.getPermission=localStorage.getItem('user_info')
  this.logindata=JSON.parse(this.getPermission)
  this.userId = this.logindata.id;
  this.mainService.getUser(this.userId ).subscribe((result)=>{
    this.userData = result;
    this.newUser=this.userData.user
    this.id=this.newUser.id?this.newUser.id:null
    this.name=this.newUser.name?this.newUser.name:null
    this.email=this.newUser.email?this.newUser.email:null
    this.gender=this.newUser.gender?this.newUser.gender:null
    this.phone=this.newUser.phone?this.newUser.phone:null
    this.address=this.newUser.Address?this.newUser.Address.address:null
    this.postal_code=this.newUser.Address?this.newUser.Address.postal_code:null
    this.city=this.newUser.Address?this.newUser.Address.city:null
    this.state=this.newUser.Address?this.newUser.Address.state:null
    this.country=this.newUser.Address?this.newUser.Address.country:null
    this.Dept=this.newUser.Department?this.newUser.Department.name:null
    this.Role=this.newUser.Role?this.newUser.Role.name:null
    this.Project=this.newUser.Project?this.newUser.Project.name:null
    this.department_id=this.newUser.Department?this.newUser.Department.id:null
    this.project_id=this.newUser.Project?this.newUser.Project.id:null
    this.role_id=this.newUser.Role?this.newUser.Role.id:null
    this.alternate_phone=this.newUser.alternate_phone?this.newUser.alternate_phone:null
    this.image=this.newUser.Image?this.newUser.Image.src:this.DefaultImg
    const dialogRef = this.dialog.open(EditUserComponent,{
      data: {
        id: this.id,name:this.name,email:this.email,gender:this.gender,phone:this.phone,address:this.address,
        department:this.department_id,project:this.project_id,role:this.role_id,alternate_phone:this.alternate_phone,image:this.image,
        postal_code:this.postal_code,city: this.city,state:this.state, country:this.country, deptName:this.Dept, projectName:this.Project, roleName:this.Role
      }
    },);
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  })
}
}
