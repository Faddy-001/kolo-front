import { Component, OnInit, Inject } from '@angular/core';
import { AddOfferComponent } from './add-offer/add-offer.component';
import * as $ from 'jquery';
import { MainService } from '../services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewOfferComponent } from "./view-offer/view-offer.component";
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  offerData: any;
  offerDetail: any = [];
  knowWidth: any;
  name: any;
  number: any;
  id: any;
  type: any;
  benefit: any;
  start_date: any;
  end_date: any;
  counts: any;
  applicable_on_payment_type: any;
  applicable_on_project: any;
  applicable_on_property_type: any;
  applicable_on_property: any;
  data: any;
  showCrossicon: boolean = false;
  valueToSearch:any;
  p:number=1;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  offerFeature:any;
  totalRecords:number=0;
  perPageRecord:number=10;
  totalPages:number=0;
  product_description: any;
  product_price: any;
  ascIcon:boolean=true;
  desIcon:boolean=false;
  showName:boolean=true;
  showType:boolean=true;
  showBenefit:boolean=true;
  showCounts:boolean=true;
  showNum:boolean=true;

  constructor(private mainService: MainService, public dialog: MatDialog,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    
    this.mainService.getUser(this.userId).subscribe((res:any)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.offerFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Offers';
      })
    })

    this.mainService.getOffers().subscribe((result) => {
      this.offerDetail = [];
      this.offerData = result;
      this.totalRecords = this.offerData.offers.length;
      
      
      this.offerData.offers.forEach((data: any) => {
        switch (data.type) {
          case "Area Wise":
            data.benefit = "Rs " + data.benefit + " off sq/ft";
            break;
          case "Direct Discount(in Rs)":
            data.benefit = "Rs " + data.benefit + " Off";
            break;
          case "Direct Discount(in Percentage)":
            data.benefit = data.benefit + " % Off";
            break;
          case "Lucky Draw":
            data.benefit = "Coupon Number " + data.benefit;
            break;

          default:
            break;
        }
       
        this.offerDetail.push({
          number: data.number,
          id: data.id,
          name: data.name,
          type: data.type,
          benefit: data.benefit,
          product_price:data.product_price,
          product_description:data.product_description,
          start_date: data.start_date,
          end_date: data.end_date,
          counts: data.counts?data.counts:'',
          applicable_on_payment_type: data.applicable_on_payment_type,
          applicable_on_project: data.applicable_on_project,
          applicable_on_property_type: data.applicable_on_property_type,
          applicable_on_property: data.applicable_on_property,

        })
      });
    })

    if (window.innerWidth <= 1024) {
      this.showCrossicon = true
    }
  }

  /*----------sorting---*/

sortNum(asc:boolean)
{
  if(asc)
  {
    this.showNum = false;
  }
  else
  {
    this.showNum = true;
  }
  
  this.offerDetail.sort(function (a:any, b:any) 
  {
    //return (a.name > b.name) ? 1 : -1;
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
  
  this.offerDetail.sort(function (a:any, b:any) 
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

sortType(asc:boolean)
{
  if(asc)
  {
    this.showType = false;
  }
  else
  {
    this.showType = true;
  }
  
  this.offerDetail.sort(function (a:any, b:any) 
  {
    //return (a.name > b.name) ? 1 : -1;
    if(asc)
    {
      return (a.type.toLocaleLowerCase() > b.type.toLocaleLowerCase()) ? 1 : -1;
    }
    else
    {
      return (a.type.toLocaleLowerCase() > b.type.toLocaleLowerCase()) ? -1 : 1;
    }
  });
}

sortBenefit(asc:boolean)
{
  if(asc)
  {
    this.showBenefit = false;
  }
  else
  {
    this.showBenefit = true;
  }
  
  this.offerDetail.sort(function (a:any, b:any) 
  {
    //return (a.name > b.name) ? 1 : -1;
    if(asc)
    {
      return (a.benefit.toLocaleLowerCase() > b.benefit.toLocaleLowerCase()) ? 1 : -1;
    }
    else
    {
      return (a.benefit.toLocaleLowerCase() > b.benefit.toLocaleLowerCase()) ? -1 : 1;
    }
  });
}

sortCounts(asc:boolean)
{
  if(asc)
  {
    this.showCounts = false;
  }
  else
  {
    this.showCounts = true;
  }
  
  this.offerDetail.sort(function (a:any, b:any) 
  {
    //return (a.name > b.name) ? 1 : -1;
    if(asc)
    {
      return (a.counts > b.counts) ? 1 : -1;
    }
    else
    {
      return (a.counts > b.counts) ? -1 : 1;
    }
  });
}

  Search(){
    if(this.valueToSearch == ''){
     this.ngOnInit();
    }
    else{
     this.offerDetail = this.offerDetail.filter((res:any)=>{
          return res.name.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.type.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.number.toString().toLocaleLowerCase().match(this.valueToSearch.toString().toLocaleLowerCase())
         || res.benefit.toLocaleLowerCase().match(this.valueToSearch.toLocaleLowerCase())
         || res.counts.toString().toLocaleLowerCase().match(this.valueToSearch.toString().toLocaleLowerCase())
     })
    }
  
   }

  openViewForm(id:number){  
    
    this.mainService.getOffer(id).subscribe((result)=>{
     
      
      this.offerData = result;
    
      this.number = this.offerData.offer.number;
      this.id = this.offerData.offer.id;
      this.name = this.offerData.offer.name;
      this.type = this.offerData.offer.type;
      this.benefit = this.offerData.offer.benefit;
      this.product_description = this.offerData.offer.product_description,
      this.product_price = this.offerData.offer.product_price,
      this.start_date = this.offerData.offer.start_date;
      this.end_date = this.offerData.offer.end_date;
      this.counts = this.offerData.offer.counts;
      this.applicable_on_payment_type = this.offerData.offer.applicable_on_payment_type;
      this.applicable_on_project = this.offerData.offer.applicable_on_project?this.offerData.offer.applicable_on_project:'null';
      this.applicable_on_property_type = this.offerData.offer.applicable_on_property_type;
      this.applicable_on_property = this.offerData.offer.applicable_on_property;     

      const dialogRef = this.dialog.open(ViewOfferComponent,{
      width: '800px',
         data: {number:this.number,id:this.id, name:this.name,type:this.type, benefit:this.benefit,product_description:this.product_description,product_price:this.product_price,
          start_date:this.start_date,end_date:this.end_date,counts:this.counts,applicable_on_payment_type:this.applicable_on_payment_type,
          applicable_on_project:this.applicable_on_project,  applicable_on_property_type:this.applicable_on_property_type,
          applicable_on_property:this.applicable_on_property }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
    })
  
  }

  openDialog(e:any) {
      const dialogRef = this.dialog.open(ViewOfferComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }
  openDelete(val:any){
    const dialogRef = this.dialog.open(DeleteUserComponent,{ },);
    dialogRef.afterClosed().subscribe(result => {
      if(result=="yes"){
       this.mainService.deleteOffer(val).subscribe((res)=>{
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
