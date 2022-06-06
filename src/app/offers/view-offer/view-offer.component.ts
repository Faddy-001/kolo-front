import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { AddOfferComponent } from "../add-offer/add-offer.component";
import { ToastrService } from 'ngx-toastr';
import { EditOfferComponent } from "../edit-offer/edit-offer.component";
import { OffersComponent } from "../offers.component";
import * as $ from 'jquery';
import 'datatables.net';
// import * as moment from 'moment';


@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.scss']
})
export class ViewOfferComponent implements OnInit {
  knowWidth: any;
  offerData: any;
  offers: any = [];
  offerDetail: any = [];
  offerId: any;
  ViewOfferForm!: FormGroup;
  number: any;
  Id: any;
  ID: any;
  Number: any;
  Name: any;
  Type: any;
  Benefit: any;
  Start_date: any;
  End_date: any;
  Counts: any;
  Applicable_on_payment_type: any;
  Applicable_on_project: any;
  Applicable_on_property_type: any = [];
  Applicable_on_property: any;
  MyDateString!: string;
  showProperty: any;
  getPermission:any;
  logindata:any;
  userId:any;
  userData:any;
  features:any;
  offerFeature:any;
  ProductDesc: any;
  ProductPrice: any;
  productOffer:boolean=false;

  constructor(public dialogRef: MatDialogRef<OffersComponent>, public dialog: MatDialog, private formbuilder: FormBuilder,
    private mainService: MainService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    
    this.mainService.getUser(this.userId).subscribe((res)=>{
      this.userData = res;
      this.features = this.userData.user.Role.Feature_Access_Permissions;
      this.offerFeature = this.features.filter((data:any)=>{
        return data.Feature.name == 'Offers';
        
        
      })
    })

    this.ID = this.data.id;
    this.Number = this.data.number ? this.data.number : 'NA';
    this.Name = this.data.name ? this.data.name : 'NA';
    this.Type = this.data.type ? this.data.type : 'NA';
    
    
    switch (this.data.type) {
      case "Area Wise":
        this.Benefit = "Rs " + this.data.benefit + " off sq/ft";
        this.productOffer = false;
        break;
      case "Direct Discount(in Rs)":
        this.Benefit = "Rs " + this.data.benefit + " Off";
        this.productOffer = false;
        break;
      case "Product Giveaway":
        this.Benefit = this.data.benefit;
        this.ProductDesc = this.data.product_description;
        this.ProductPrice = this.data.product_price;
        this.productOffer = true;
        break;
      case "Direct Discount(in Percentage)":
        this.Benefit = this.data.benefit + " % Off";
        this.productOffer = false;
        break;
      case "Lucky Draw":
        this.Benefit = "Coupon Number " + this.data.benefit;
        this.productOffer = false;
        break;
      default:
        break;
    }
    this.Start_date = this.data.start_date ? this.data.start_date : 'NA';
    this.End_date = this.data.end_date ? this.data.end_date : 'NA';
    this.Counts = this.data.counts ? this.data.counts : 'For All';
    this.Applicable_on_payment_type = this.data.applicable_on_payment_type;
    if (this.Applicable_on_payment_type == null || this.Applicable_on_payment_type == '') {
      this.Applicable_on_payment_type = "Both"
    }
    //this.Applicable_on_project = this.data.applicable_on_project_id;
    this.Applicable_on_project =this.data.applicable_on_project.name;
    this.Applicable_on_property_type = this.data.applicable_on_property_type;
    this.Applicable_on_property = this.data.applicable_on_property;
    if(this.Applicable_on_property=='null' || this.Applicable_on_property=='')
    {
      this.showProperty='NA';
    }
  }
  close() {
    this.dialogRef.close();
  }
}


