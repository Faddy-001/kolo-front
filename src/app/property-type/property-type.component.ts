import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { MainService } from '../services/main.service';
import { AddPropertyTypeComponent } from './add-property-type/add-property-type.component';
import { EditPropertyTypeComponent } from './edit-property-type/edit-property-type.component';
import { ToastrService } from 'ngx-toastr';
import { LOADIPHLPAPI } from 'dns';

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.scss']
})
export class PropertyTypeComponent implements OnInit {
  propertyDetail: any;
  propertyType: any;
  newProperty: any = [];
  propertyData: any;
  name: any;
  desc: any;
  id: any;
  data: any;
  showCrossicon: boolean = false;
  knowWidth: any;

  valueToSearch:any;
  p :number = 1;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  propertyTypeFeature:any;
  totalRecords:number=0;
  perPageRecord:number=10;
  totalPages:number=0;
  area_type: any;
  area: any;
  ascIcon:boolean=true;
  desIcon:boolean=false;
  showName:boolean=true;
  showDesc:boolean=true;
  showArea:boolean=true;
  


  constructor(public dialog: MatDialog, private mainService: MainService, public toastr: ToastrService) { }

  ngOnInit(): void {

    //get feature
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;

    this.mainService.getUser(this.userId).subscribe((res:any)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;

      this.propertyTypeFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Property Types';
      })
    })

    this.mainService.getPropertyTypes().subscribe(result => {
      this.propertyDetail = result
      console.log(this.propertyDetail);

      this.propertyType = this.propertyDetail.propertyTypes;

      this.totalRecords = this.propertyType.length;


      this.newProperty = [];
      this.propertyType.forEach((data: any) => {
        this.newProperty.push({
          id: data.id,
          name: data.name,
          description: data.description,
          area_type:data.area_type,
          project: data.Projects
        });
      });

    }, err => {
      console.log(err);
    })


    // this.knowWidth = $(window).width();
    // if (window.innerWidth <= 900)
    // {
    //   this.showCrossicon = true;
    // }
    if (window.innerWidth <= 1024)
    {
      this.showCrossicon = true
    }
  }


  /*----------sorting----*/
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
    this.newProperty.sort(function (a:any, b:any) 
    {
      
      //return a.name.localeCompare(b.name.rendered);
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

sortDesc(asc:boolean)
{
  console.log(this.propertyType);
  
  if(asc)
  {
    this.showDesc = false;
  }
  else
  {
    this.showDesc = true;
  }
  this.newProperty.sort(function (a:any, b:any) 
  {
    //return (a.description < b.description) ? 1 : -1;
    if(asc)
      {
        if(a.description === null)
        {
            return Infinity;
        }
       else
       {
           return (a.description > b.description) ? 1 : -1;
       }
      }
      else
      {
        if(a.description === null)
        {
           return Infinity;
         }
         else
        {
          return (a.description > b.description) ? -1 : 1;
        }
      }
  });
}

sortAreaType(asc:boolean)
{
  if(asc)
  {
    this.showArea = false;
  }
  else
  {
    this.showArea = true;
  }
  
  this.newProperty.sort(function (a:any, b:any) 
  {
    //return (a.name > b.name) ? 1 : -1;
    if(asc)
    {
      return (a.area_type.toLocaleLowerCase() > b.area_type.toLocaleLowerCase()) ? 1 : -1;
    }
    else
    {
      return (a.area_type.toLocaleLowerCase() > b.area_type.toLocaleLowerCase()) ? -1 : 1;
    }
  });
}
  Search(){
    if(this.valueToSearch == ''){
     this.ngOnInit();
    }
    else{
     this.newProperty = this.newProperty.filter((res:any)=>{
      res.description == null ? res.description = "" : res.description;
          return res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.description.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase());
     })
     this.p = 1;
    }

   }

  openDialog() {
    const dialogRef = this.dialog.open(AddPropertyTypeComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

  editPropertyType(id: number) {
    this.mainService.getPropertyType(id).subscribe((result: any) => {
      this.propertyData = result;
      this.propertyType = this.propertyData.propertyType
      this.name = this.propertyType.name;
      this.area_type = this.propertyType.area_type
      this.desc = this.propertyType.description;
      this.id = this.propertyData.propertyType.id;
      const dialogRef = this.dialog.open(EditPropertyTypeComponent, {
        width: '500px',
        data: { name: this.name, description: this.desc, area_type:this.area_type,  id: this.id }
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
        this.mainService.deletePropertyType(val).subscribe((res) => {
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
