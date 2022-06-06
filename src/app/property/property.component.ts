import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { AddPropertyComponent } from './add-property/add-property.component';
import * as $ from 'jquery';
// declare var $: any;
import 'datatables.net';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { ToastrService } from 'ngx-toastr';
import { FilterPropertyComponent } from './filter-property/filter-property.component';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  propertyData: any;
  propertyDetail: any = [];
  properties: any = [];
  Propertynumber: any;
  ProjectName: any;
  Length: any;
  Breadth: any;
  PropertyName: any;
  Total_Area: any;
  Rate_per_sq_ft: any;
  Description: any;
  Price: any;
  id: any;
  ProjectId: any;
  Property_Type_Name: any;
  Property_Type_Id: any;
  image: any;
  DefaultImg: string = "../../../assets/images/PngItem_1503945.png"
  newProperty: any=[];
  status: any;
  data: any;
  showCrossicon: boolean = false;
  knowWidth: any;
  valueToSearch: any;
  p: number= 1;
  selectedindex: any;
  Project: any;
  PropertyType: any;
  noRecords: boolean = false;
  Properties: any;
  PropertyDetails:any=[];
  shwHeader: boolean = true;
  isClass: string = "";
  toShow: boolean = false;
  isHide: any = 'none';
  showExpBtn: any = 'none';
  howExpBtn: string = 'sfsf';
  shwFooter: boolean = false;
  pageCounts: any;
  pageCount: any;
  selectedProject: any;
  selectedProperty: any;
  selectedStatus: any;
  selectedBooked:any;
  selectedPreBooked:any;
  selectedRegistered:any;
  selectedStock:any;
  selectedProperty_checked:any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  propertiesFeature:any;
  totalRecords:number=0;
  perPageRecord:number=10;
  totalPages:number=0;
  ascIcon:boolean=true;
  desIcon:boolean=false;
  showProject:boolean=true;
  showPropertyType:boolean=true;
  showPropertyNo:boolean=true;
  showPropertyName:boolean=true;
  showTotalArea:boolean=true;
  showTotalAmt:boolean=true;
  showStatus:boolean=true;

 


  constructor(public dialog: MatDialog, private mainService: MainService, public toastr: ToastrService) { }

  ngOnInit(): void {

    //get feature
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;

    this.mainService.getUser(this.userId).subscribe((res:any)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.propertiesFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Properties';
      })
    })

    this.propertyDetail = [];
    this.mainService.getProperties().subscribe((result) => {
      this.propertyDetail = [];
      this.propertyData = result;
      //console.log(this.propertyData.properties.length);
      this.totalRecords = this.propertyData.properties.length;

      this.propertyData.properties.forEach((data: any) => {
        this.propertyDetail.push({
          id: data.id,
          projectID: data.project_id?data.project_id:'-',
          projectName: data.Project?data.Project.name:'-',
          PropertytName: data.PropertyType.name,
          PropertyID: data.PropertyType.id,
          name: data.name,
          number: data.number,
          length: data.length,
          breadth: data.breadth,
          description: data.description,
          // price: (this.Ratepersq_ft).toLocaleString('en-IN');data.price,
          price:Number(data.price).toLocaleString('en-IN'),
          property_size: data.property_size,
          rate_per_sq_ft: data.rate_per_sq_ft,
          status: data.status,
        })
      });
    })

    this.knowWidth = $(window).width();

    if (this.knowWidth > 1024) {
      this.shwFooter = false;
      this.shwHeader = true;
    }
    else {
     this.shwHeader = false;
     this.shwFooter = true;
    }

    if (window.innerWidth <= 1024) {
      this.showCrossicon = true
    }
  }

  openFilter() {
    const dialogRef = this.dialog.open(FilterPropertyComponent, {
      width: '500px',
      data: {project:this.selectedProject,propertyType:this.selectedProperty,status:this.selectedStatus,booked:this.selectedBooked,
      prebooked:this.selectedPreBooked,registered:this.selectedRegistered,stock:this.selectedStock,property_checked:this.selectedProperty_checked}
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.selectedBooked=data.Booked,
        this.selectedPreBooked=data.PreBooked,
        this.selectedRegistered=data.Registered,
        this.selectedStock=data.Stock,
        this.selectedProject = data.Project;
        this.selectedProperty = data.PropertyType;
        this.selectedStatus = data.Status;
        this.selectedProperty_checked=data.Property_checked;
        this.noRecords = false;
        this.Properties = data.result;
        this.PropertyDetails = this.Properties.properties ? this.Properties.properties : null;
        if (this.PropertyDetails == '') {
          this.noRecords = true;
        }
        this.propertyDetail = [];
         this.PropertyDetails.forEach((data: any) => {
          this.propertyDetail.push({
            id: data.id,
            projectID: data.Project.id,
            projectName: data.Project.name,
            PropertytName: data.PropertyType.name,
            PropertyID: data.PropertyType.id,
            name: data.name,
            number: data.number,
            length: data.length,
            breadth: data.breadth,
            description: data.description,
            price: data.price,
            property_size: data.property_size,
            rate_per_sq_ft: data.rate_per_sq_ft,
            status: data.status,
          })
        }
        )
      }
    });

  }

/*-----------sorting---*/
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
   this.propertyDetail.sort(function (a:any, b:any) 
   {
     
     //return a.name.localeCompare(b.name.rendered);
     if(asc)
     {
       return (a.projectName.toLocaleLowerCase() > b.projectName.toLocaleLowerCase()) ? 1 : -1;
     }
     else
     {
       return (a.projectName.toLocaleLowerCase() > b.projectName.toLocaleLowerCase()) ? -1 : 1;
     }
   });
}

sortPropertyType(asc:boolean)
 {
   if(asc)
   {
     this.showPropertyType = false;
   }
   else
   {
     this.showPropertyType = true;
   }
   this.propertyDetail.sort(function (a:any, b:any) 
   {
     
     //return a.name.localeCompare(b.name.rendered);
     if(asc)
     {
       return (a.PropertytName.toLocaleLowerCase() > b.PropertytName.toLocaleLowerCase()) ? 1 : -1;
     }
     else
     {
       return (a.PropertytName.toLocaleLowerCase() > b.PropertytName.toLocaleLowerCase()) ? -1 : 1;
     }
   });
}

sortPropertyNo(asc:boolean)
 {
   if(asc)
   {
     this.showPropertyNo = false;
   }
   else
   {
     this.showPropertyNo = true;
   }
   this.propertyDetail.sort(function (a:any, b:any) 
   {
     
     //return a.name.localeCompare(b.name.rendered);
     if(asc)
     {
       return (a.number > b.number) ? 1 : -1;
     }
     else
     {
       return (a.number > b.number) ? -1 : 1;
     }
   });
}

sortPropertyName(asc:boolean)
 {
   if(asc)
   {
     this.showPropertyName = false;
   }
   else
   {
     this.showPropertyName = true;
   }
   this.propertyDetail.sort(function (a:any, b:any) 
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

sortTotalArea(asc:boolean)
 {
   if(asc)
   {
     this.showTotalArea = false;
   }
   else
   {
     this.showTotalArea = true;
   }
   this.propertyDetail.sort(function (a:any, b:any) 
   {
     
     //return a.name.localeCompare(b.name.rendered);
     if(asc)
     {
       return (a.property_size > b.property_size) ? 1 : -1;
     }
     else
     {
       return (a.property_size > b.property_size) ? -1 : 1;
     }
   });
}

sortTotalAmt(asc:boolean)
 {
   if(asc)
   {
     this.showTotalAmt = false;
   }
   else
   {
     this.showTotalAmt = true;
   }
   this.propertyDetail.sort(function (a:any, b:any) 
   {
     
     //return a.name.localeCompare(b.name.rendered);
     if(asc)
     {
       return (a.price > b.price) ? 1 : -1;
     }
     else
     {
       return (a.price > b.price) ? -1 : 1;
     }
   });
}

sortStatus(asc:boolean)
 {
   if(asc)
   {
     this.showStatus = false;
   }
   else
   {
     this.showStatus = true;
   }
   this.propertyDetail.sort(function (a:any, b:any) 
   {
     
     //return a.name.localeCompare(b.name.rendered);
     if(asc)
     {
       return (a.status.toLocaleLowerCase() > b.status.toLocaleLowerCase()) ? 1 : -1;
     }
     else
     {
       return (a.status.toLocaleLowerCase() > b.status.toLocaleLowerCase()) ? -1 : 1;
     }
   });
}
  Search() {
    // console.log(this.valueToSearch);

    if(this.valueToSearch == ''){
      this.ngOnInit();
     }
     else{
      this.propertyDetail = this.propertyDetail.filter((res: any) => {

        return res.projectName.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
          || res.PropertytName.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
          || res.number.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
          || res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
          || res.property_size.toString().toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
          || res.price.toString().toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
          || res.status.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
      })
      // this.propertyDetail = property;
      this.p = 1;
      this.totalRecords = this.propertyDetail.length;

    }
  }

  openViewForm(id: number) {
    this.mainService.getProperty(id).subscribe((result) => {
      this.propertyData = result;
      this.id = this.propertyData.property.id;
      this.Propertynumber = this.propertyData.property.number;
      this.Length = this.propertyData.property.length;
      this.Breadth = this.propertyData.property.breadth;
      this.PropertyName = this.propertyData.property.name;
      this.Total_Area = this.propertyData.property.property_size;
      this.Rate_per_sq_ft = this.propertyData.property.rate_per_sq_ft;
      this.Description = this.propertyData.property.description;
      this.Price = this.propertyData.property.price;
      this.ProjectName = this.propertyData.property.Project.name;
      this.ProjectId = this.propertyData.property.Project.id;
      this.Property_Type_Name = this.propertyData.property.PropertyType.name;
      this.Property_Type_Id = this.propertyData.property.PropertyType.id;
      this.status = this.propertyData.property.status;
      this.image = this.propertyData.property.Images;
      // this.image=this.newProperty.Image?this.newProperty.Image.src:this.DefaultImg;
      this.image = this.propertyData.property.Images;

      const dialogRef = this.dialog.open(ViewPropertyComponent, {
        // width: '800px',
        height: '700px',
        data: {
          ID: this.id,
          propertynumber: this.Propertynumber, length: this.Length, breadth: this.Breadth,
          propertyname: this.PropertyName, totalarea: this.Total_Area, rate: this.Rate_per_sq_ft,
          price: this.Price, description: this.Description, project_name: this.ProjectName,
          project_id: this.ProjectId, property_type_name: this.Property_Type_Name,
          property_type_id: this.Property_Type_Id, image: this.image, status: this.status
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddPropertyComponent, {
      width: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

  openDelete(val: any) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {},);
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.mainService.deleteProperty(val).subscribe((res) => {
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






