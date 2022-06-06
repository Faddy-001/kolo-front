import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import * as $ from 'jquery';
import { MainService } from '../services/main.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteUserComponent } from '../delete-user/delete-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  userData: any;
  usersDetail: any = [];
  newUser: any
  name: any
  email: any
  gender: any
  phone: any
  department_id: any
  project_id: any
  role_id: any
  alternate_phone: any
  address: any
  image: any
  postal_code: any
  city: any
  state: any
  country: any
  id: any
  succMsg: any;
  newMsg: any;
  Dept: string = '';
  Project: string = '';
  Role: string = '';
  DefaultImg: string = "../../../assets/images/PngItem_1503945.png"
  data: any;
  showCrossicon: boolean = false;
  valueToSearch:any;
  p :number = 1;
  deactivateUser:any;
  activateUser:any;
  sdfs:string=''
  getPermission:any;
  logindata:any;
  userId:any;
  features:any;
  userFeature:any;
  totalRecords:number=0;
  perPageRecord:number=10;
  totalPages:number=0;
  ascIcon:boolean=true;
  desIcon:boolean=false;
  showName:boolean=true;
  showEmail:boolean=true;
  showGender:boolean=true;
  showPhone:boolean=true;
  showRole:boolean=true;
  showact:boolean=true;


  constructor(private mainService: MainService, public dialog: MatDialog, private toastr: ToastrService,private _location: Location) { }

  ngOnInit(): void {

    //get feature
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    if ( this.logindata.role == 'CRE'){
      this._location.back();
    }
    this.mainService.getUser(this.userId).subscribe((res:any)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.userFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Users';
      })
    })

    this.mainService.getUsers().subscribe((result) => {
      this.userData = result;
      this.totalRecords = this.userData.user.length;


      this.usersDetail = [];
      this.userData.user.forEach((data: any) => {
        this.usersDetail.push({
          id: data.id,
          name: data.name ? data.name : null,
          email: data.email ? data.email : null,
          gender: data.gender ? data.gender : null,
          phone: data.phone ? data.phone : null,
          department: data.Department ? data.Department.name : 'NA',
          project: data.Project ? data.Project.name : null,
          role: data.Role ? data.Role.name : null,
          alternate_phone: data.alternate_phone ? data.alternate_phone : '',
          is_active:data.is_active
        })

      });
    })

    if (window.innerWidth <= 1024) {
      this.showCrossicon = true
    }


  }
/*----------sorting---*/
sortName(asc:boolean)
{
  if(asc)
  {
    this.showName = false;
  }
  else
  {
    this.showName = true;
  }
  //this.usersDetail.sort((a:any,b:any) => a.name.localeCompare(b.name.rendered));
  // return a.name.rendered - b.name.rendered;
  this.usersDetail.sort(function (a:any, b:any) 
  {
    //return (a.name > b.name) ? 1 : -1;
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

sortEmail(asc:boolean)
{
  if(asc)
  {
    this.showEmail = false;
  }
  else
  {
    this.showEmail = true;
  }
  //this.usersDetail.sort((a:any,b:any) => a.email.localeCompare(b.email.rendered));
  this.usersDetail.sort(function (a:any, b:any) 
  {
    //return (a.email > b.email) ? 1 : -1;
    if(asc)
    {
      return (a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase()) ? 1 : -1;
    }
    else
    {
      return (a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase()) ? -1 : 1;
    }
  });
}

sortGender(asc:boolean)
{
  if(asc)
  {
    this.showGender = false;
  }
  else
  {
    this.showGender = true;
  }
  //this.usersDetail.sort((a:any,b:any) => a.gender.localeCompare(b.gender.rendered));
  this.usersDetail.sort(function (a:any, b:any) 
  {
    //return (a.gender > b.gender) ? 1 : -1;
    if(asc)
    {
      return (a.gender.toLocaleLowerCase() > b.gender.toLocaleLowerCase()) ? 1 : -1;
    }
    else
    {
      return (a.gender.toLocaleLowerCase() > b.gender.toLocaleLowerCase()) ? -1 : 1;
    }
  });
}

sortPhone(asc:boolean)
{
  if(asc)
  {
    this.showPhone = false;
  }
  else
  {
    this.showPhone = true;
  }
  //this.usersDetail.sort((a:any,b:any) => a.phone.localeCompare(b.phone.rendered));
  this.usersDetail.sort(function (a:any, b:any) 
  {
    //return (a.phone > b.phone) ? 1 : -1;
    if(asc)
    {
      return (a.phone > b.phone) ? 1 : -1;
    }
    else
    {
      return (a.phone > b.phone) ? -1 : 1;
    }
  });
}

sortRole(asc:boolean)
{
  if(asc)
  {
    this.showRole = false;
  }
  else
  {
    this.showRole = true;
  }
  //this.usersDetail.sort((a:any,b:any) => a.role.localeCompare(b.role.rendered));
  this.usersDetail.sort(function (a:any, b:any) 
  {
    //return (a.role > b.role) ? 1 : -1;
    if(asc)
    {
      return (a.role.toLocaleLowerCase() > b.role.toLocaleLowerCase()) ? 1 : -1;
    }
    else
    {
      return (a.role.toLocaleLowerCase() > b.role.toLocaleLowerCase()) ? -1 : 1;
    }
  });
}
sortActiveUser(asc:boolean)
{
  if(asc)
  {
    this.showact = false;
  }
  else
  {
    this.showact = true;
  }
  //this.usersDetail.sort((a:any,b:any) => a.role.localeCompare(b.role.rendered));
  this.usersDetail.sort(function (a:any, b:any) 
  {
    //return (a.role > b.role) ? 1 : -1;
    if(asc)
    {
      return (a.is_active > b.is_active) ? 1 : -1;
    }
    else
    {
      return (a.is_active > b.is_active) ? -1 : 1;
    }
  });
}
  deActivate(id:any,e:any){
    if(e.checked==true){
      this.sdfs = 'Deactivate'
      this.mainService.activateUser(id).subscribe((res)=>{
        this.activateUser = res;
        this.toastr.success(this.activateUser.message)
      })

    }
    else{
      this.sdfs = 'Activate'
      this.mainService.deActivateUser(id).subscribe((res)=>{
        this.deactivateUser = res;
        this.toastr.success(this.deactivateUser.message)
      })
    }
  }
  // Search(){
  //   if(this.valueToSearch == ''){
  //    this.ngOnInit();
  //   }
  //   else{
  //    this.usersDetail = this.usersDetail.filter((res:any)=>{
  //         return res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
  //        || res.email.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
  //        || res.gender.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
  //        || res.phone.toString().toLocaleLowerCase().match(this.valueToSearch.toString().toLocaleLowerCase())
  //        || res.department.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
  //        || res.project.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
  //        || res.role.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
  //        || res.alternate_phone.toString().toLocaleLowerCase().match(this.valueToSearch.toString().toLocaleLowerCase())

  //    })
  //   }
  //  }
  Search(){
    if(this.valueToSearch == ''){
     this.ngOnInit();
    }
    else{
     this.usersDetail = this.usersDetail.filter((res:any)=>{
          return res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
        //  || res.description.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase());
         || res.email.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.gender.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.phone.toString().toLocaleLowerCase().match(this.valueToSearch.toString().toLocaleLowerCase())

         || res.role.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())


     })
     this.p =1;
    }

   }

   projects:any;
  openDialog(id: any) {

    ///////
    this.mainService.getUser(id).subscribe((result) => {
      this.userData = result;
      this.newUser = this.userData.user
      this.id = this.newUser.id ? this.newUser.id : null
      this.name = this.newUser.name ? this.newUser.name : null
      this.email = this.newUser.email ? this.newUser.email : null
      this.gender = this.newUser.gender ? this.newUser.gender : null
      this.phone = this.newUser.phone ? this.newUser.phone : null
      this.address = this.newUser.Address.address ? this.newUser.Address.address : null
      this.postal_code = this.newUser.Address ? this.newUser.Address.postal_code : null
      this.city = this.newUser.Address ? this.newUser.Address.city : null
      this.state = this.newUser.Address ? this.newUser.Address.state : null
      this.country = this.newUser.Address ? this.newUser.Address.country : null
      //this.Dept = this.newUser.Department ? this.newUser.Department.name : null
      this.Role = this.newUser.Role ? this.newUser.Role.name : null
      //this.Project = this.newUser.Project ? this.newUser.Project.name : null
      //this.department_id = this.newUser.Department ? this.newUser.Department.id : null
      //this.project_id = this.newUser.Project ? this.newUser.Project.id : null
      this.role_id = this.newUser.Role ? this.newUser.Role.id : null
      this.alternate_phone = this.newUser.alternate_phone ? this.newUser.alternate_phone : null
      this.image = this.newUser.Image ? this.newUser.Image.src : ''
      this.projects= this.userData.projects;

      const dialogRef = this.dialog.open(EditUserComponent, {
        height: '600px',
        data: {
          id: this.id, name: this.name, email: this.email, gender: this.gender, phone: this.phone, address: this.address,
          // department: this.department_id, project: this.project_id, deptName: this.Dept, projectName: this.Project,
          role: this.role_id, alternate_phone: this.alternate_phone, image: this.image,
          postal_code: this.postal_code, city: this.city, state: this.state, country: this.country,  roleName: this.Role,
          projects:this.projects
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })
  }

  openDelete(val: any) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {},);
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.mainService.deleteUser(val).subscribe((res) => {
          this.data = res;
          this.toastr.success(this.data.message)
          this.ngOnInit()
        }, (err) => {
          console.log(err);
        })
      }
    });
  }
}
