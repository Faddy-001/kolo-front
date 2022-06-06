import { Component, OnInit, Inject } from '@angular/core';
import { AddDeptDialogComponent } from './add-dept-dialog/add-dept-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditDeptDialogComponent } from './edit-dept-dialog/edit-dept-dialog.component';
import { MainService } from '../services/main.service';
import { MaterialModule } from '../material/material.module';
import { DeleteDeptDialogComponent } from './delete-dept-dialog/delete-dept-dialog.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
// import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { OrderPipe } from 'ngx-order-pipe';



@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {
  animal: string = 'nikita';
  name: string = '';
  knowWidth: any;
  deptData: any;
  departments: any;
  description: string = '';
  deptId!: number;
  projectData: any;
  departmentData: any;
  deptDetail: any = [];
  project: any;
  projectName: any;
  projectId: any;
  delete: any = [];
  modalService: any;
  closeResult: string | undefined;
  dialogRef: any;
  data: any;
  Showicon: string = "none";
  showCrossicon: boolean = false;
  valueToSearch:any;
  order: string = 'name';
  reverse: boolean = false;
  sortedCollection:any=[];
  p: number = 1;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  deptFeature:any;
  totalRecords:number=0;
  perPageRecord:number=10;
  totalPages:number=0;
  showName:boolean=true;
  ascIcon:boolean=true;
  desIcon:boolean=false;
  showProject:boolean=true;
  showDesc:boolean=true;
  
  constructor(public dialog: MatDialog, public mainService: MainService, public toastr: ToastrService, private orderPipe: OrderPipe) {
    this.sortedCollection = orderPipe.transform(this.deptDetail, 'name');
  }

  setOrder(value: string) 
  {
    
    
    if (this.order === value) 
    {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
  ngOnInit(): void {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    
    this.mainService.getUser(this.userId).subscribe((res:any)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.deptFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Departments';
      })
    })

    this.mainService.getDeprtments().subscribe((res:any) => {
      this.deptData = res;
      this.departments = this.deptData.department;
      this.totalRecords = this.departments.length;
      this.deptDetail = [];
      this.departments.forEach((data: any) => {
        this.deptDetail.push({
          id: data.id ? data.id : null,
          name: data.name ? data.name : null,
          project: data.Project ? data.Project.name : null,
          description: data.description ? data.description : null

        })


      });
    },
      (err:any) => {

      })




    this.knowWidth = $(window).width();

    if (this.knowWidth > 1024) {
      $('.showFooter').remove();

    }
    else {
      $('.showHeader').remove();
    }

    if (window.innerWidth <= 1024) {
      this.showCrossicon = true
    }

  }

  // Search(){
  //  if(this.valueToSearch == ''){
  //   this.ngOnInit();
  //  }
  //  else{
  //   this.deptDetail = this.deptDetail.filter((res:any)=>{
  //        return res.project.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase()) 
  //       || res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
  //       || res.description.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase());
  //   })
  //  }
 
  // }
  Search(){
    if(this.valueToSearch == ''){
     this.ngOnInit();
    }
    else{
     this.deptDetail = this.deptDetail.filter((res:any)=>{
      res.description == null ? res.description = "" : res.description;
      return res.project.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
        //  || res.description.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase());
         || res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.description.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase());
        
        
       
     })
    }
  
   }


  addDeptModal(): void {
    const dialogRef = this.dialog.open(AddDeptDialogComponent, {
      width: '500px',
      data: {}
    });


    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();

    });

  }

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
  //this.deptDetail.sort((a:any,b:any) => a.name.localeCompare(b.name.rendered));
  this.deptDetail.sort(function (a:any, b:any) 
  {
    // return (a.name > b.name) ? 1 : -1;
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
  //this.deptDetail.sort((a:any,b:any) => a.project.localeCompare(b.project.rendered));
  this.deptDetail.sort(function (a:any, b:any) 
  {
    if(asc)
    {
      return (a.project.toLocaleLowerCase() > b.project.toLocaleLowerCase()) ? 1 : -1;
    }
    else
    {
      return (a.project.toLocaleLowerCase() > b.project.toLocaleLowerCase()) ? -1 : 1;
    }
    
  });
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
  //this.deptDetail.sort((a:any,b:any) => a.description.localeCompare(b.description.rendered));
  this.deptDetail.sort(function (a:any, b:any) 
  {
    // if(asc)
    // {
    //   return (a.description > b.description) ? 1 : -1;
    // }
    // else
    // {
    //   return (a.description > b.description) ? -1 : 1;
    // }
      return a.description.localeCompare(b.description.rendered);

  });
}

  editDeptModal(id: number) {
    this.mainService.getDepartment(id).subscribe((result: any) => {
      this.departmentData = result;
      this.name = this.departmentData.department.name ? this.departmentData.department.name : null;
      this.description = this.departmentData.department.description ? this.departmentData.department.description : null;
      this.deptId = this.departmentData.department.id ? this.departmentData.department.id : null;
      this.project = this.departmentData.department.Project ? this.departmentData.department.Project.name : null;
      this.projectId = this.departmentData.department.Project ? this.departmentData.department.Project.id : null;
      const dialogRef = this.dialog.open(EditDeptDialogComponent, {
        width: '500px',
        data: { name: this.name, description: this.description, id: this.deptId, project: this.project, projectId: this.projectId }
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
        this.mainService.deleteDepartment(val).subscribe((res:any) => {
          this.data = res;
          this.toastr.success(this.data.message)
          this.ngOnInit()
        }, (err:any) => {
           console.log(err);
        })
      }

    });
  }

}