import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDescComponent } from '../../project-desc/project-desc.component';
import { ActivityLogComponent } from '../activity-log/activity-log.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AddCustomerComponent } from 'src/app/customers/add-customer/add-customer.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-prebooking',
  templateUrl: './prebooking.component.html',
  styleUrls: ['./prebooking.component.scss']
})
export class PrebookingComponent implements OnInit {
  selectedFile: any;
  filesToUpload: any = [];
  images: any = [];
  offerDetail: any;
  offerDetails: any = [];
  offerData: any = [];
  show_offer: string = 'none';
  urls = new Array<string>();
  propertytData: any;
  propertyNumber: any = [];
  PropertyAll: any = [];
  Property_price: any;
  Property_size: any;
  newProperties: any = [];
  noRecords: boolean = false;
  properties: any;
  propertyDetail: any = [];
  P_ID: any;
  Payment_type: any;
  Benefit: any;
  propertyId: any;
  offerPrice: any = "0.00";
  offerType: any;
  FinalPrice: any;
  showValue: any = [];
  TotalAreaPrice: any;
  Offer_Benefit: string = '';
  offerID: any = [];
  getFinalPrice: any = "0.00";
  prop_number: string = "";
  isProperty: boolean = false;
  number: any;
  offerId: any = [];
  OfferID: any=[];
  commitment_data: any;
  leadId: any;
  spanerr: boolean = false;
  viewOffers: boolean = true;
  ShowNotLead: string = "none";
  showBtn: string = "none";
  showPropertyDetail: string = "none";
  ShowNowBookLeadavaialble: string = "";
  ShowsaveforlaterBookLeadavaialble: string = ""
  ProjectId: any;
  Property_TypeId: any;
  NowPreBookingData: any;
  offerName: any;
  PreeBookingForm!: FormGroup;
  OfferBenefit: any;
  Full_Property_price: any;
  PropertyName: any;
  PropertyNumber: any;
  PropertyLength: any;
  PropertyBreadth: any;
  PropertySize: any;
  PropertyRatePerSqFt: any;
  PropertyDesc: any;
  PropertyProject: any;
  PropertyPropertyType: any;
  step = 0;
  type: any;
  checktype: boolean = false;
  showOfferName: any = [];
  appliedOffers: any = [];
  totalDiscount: any = 0;
  productGiveaway: any = '';
  router: any;
  errorMsg: any;
  errorShow: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<ActivityLogComponent>,
    private mainService: MainService, private route: Router, private formbuilder: FormBuilder, private toastr: ToastrService) {
    this.PreeBookingForm = this.formbuilder.group({
      search: [null, Validators.required],
      Payment_Type: [null, Validators.required]
    })

    this.leadId = data.id;
  }

  ngOnInit(): void {
    if (this.leadId == null || this.leadId == "") {
      this.ShowNotLead = "block";
      this.ShowNowBookLeadavaialble = "none";
      this.ShowsaveforlaterBookLeadavaialble = "none";
    }


  }

  commitDesc(e: any) {
    this.commitment_data = e.target.value;
  }

  setStep(index: number) {
    this.step = index;
  }

  showPropertyDetails() {
    this.showPropertyDetail = "block";
  }

  search_PropertyNo(e: any) {
    this.isProperty = true;
    this.newProperties = [];
    let searchData = e.target.value;
    if (searchData == '') {
      this.viewOffers = true;
      this.prop_number = '';
      this.isProperty = false;
      this.show_offer = "none";
      this.showBtn = "none";
      this.showPropertyDetail = "none";
      this.ngOnInit();
    }
    else {
      //  this.showBtn = "block"
      this.mainService.getSearchProperty(searchData).subscribe((result) => {
        this.properties = result
        this.propertyDetail = this.properties.properties;
        if (this.propertyDetail == '') {
          this.isProperty = false;
          this.noRecords = true;
          this.ngOnInit();
        }
        else {
          this.noRecords = false;
          this.propertyDetail.forEach((data: any) => {
            this.newProperties.push({
              id: data.id,
              number: data.number,
              project_id: data.Project.id,
              project_name: data.Project.name,
              property_type_id: data.property_type_id,
              property_name: data.name,
              Property_price: data.price,
              p_no: data.number,
            })
            this.P_ID = data.id;
            this.ProjectId = data.Project.id;
            this.Property_TypeId = data.property_type_id;
            // this.viewOffers = false;
          }
          )
        }
      })
    }
  }

  selected_prop(token: any) {
    this.isProperty = false;
    this.prop_number = token.number;

  }

  @HostListener('click') myClick() {
    this.isProperty = false;
  }

  GetPropertyPrice(e: any) {
    this.showBtn = "block";
    this.isProperty = false;
    this.prop_number = e.number;
    this.propertyId = e.id;
    this.mainService.getProperty(this.propertyId).subscribe(result => {
      this.propertytData = result;
      this.propertyNumber = this.propertytData;
      this.PropertyAll = this.propertyNumber.property;
      this.PropertyName = this.PropertyAll.name;
      this.PropertyNumber = this.PropertyAll.number;
      this.Full_Property_price = this.PropertyAll.price;
      this.PropertyLength = this.PropertyAll.length;
      this.PropertyBreadth = this.PropertyAll.breadth;
      this.PropertySize = this.PropertyAll.property_size;
      this.PropertyRatePerSqFt = this.PropertyAll.rate_per_sq_ft;
      this.PropertyDesc = this.PropertyAll.description;
      this.PropertyProject = this.PropertyAll.Project.name;
      this.PropertyPropertyType = this.PropertyAll.PropertyType.name;
      this.Property_price = this.PropertyAll.price;
      this.getFinalPrice=this.PropertyAll.price;
      //this.Property_price = Number(this.Property_price).toLocaleString('en-IN'),
        this.Property_size = this.PropertyAll.property_size;
    },
      err => {
        console.log(err);
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectDescComponent, {
      width: '300px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.ngOnInit();
    });
  }

  close() {
    this.dialogRef.close();
  }


  getImage(e: any) {
    for (let i = 0; i < e.target.files.length; i++) {

      let selectedFile = e.target.files[i];
      this.filesToUpload.push(selectedFile);
      var fileName = selectedFile.name;
      var ext = fileName.split('.').pop();
      let img = { url: '', name: fileName };
      var reader = new FileReader();
      switch (ext) {
        case 'jpg': case 'png': case 'jpeg': case 'gif': case 'webp':
          reader.onload = (e: any) => {
            img.url = e.target.result;
          }
          break;
        case 'docx':
          img.url = '../../assets/files-extension-imgs/doc-file.png';
          break;
        case 'xlsx':
          img.url = '../../assets/files-extension-imgs/excel-file.png';
          break;
        case 'pdf':
          img.url = '../../assets/files-extension-imgs/pdf-file.png';
          break;
        case 'ppt':
          img.url = '../../assets/files-extension-imgs/ppt-file.jpg';
          break;
        case 'zip': case 'zipx':
          img.url = '../../assets/files-extension-imgs/zip-file.png';
          break;
        default:
          img.url = '../../assets/files-extension-imgs/other-file.jpg';

      }

      this.images.push(img);
      reader.readAsDataURL(e.target.files[i]);

    }

  }

  deleteImg(index: number) {
    this.images.splice(index, 1)
    this.filesToUpload = Array.from(this.filesToUpload).filter(
      item => {
        return item != this.filesToUpload[index]
      })
  }


  deleteImage(url: any): void {
    this.urls = this.urls.filter((a) => a !== url);
  }

  getType(e: any) {
    this.Payment_type = e.value;
    if (this.Payment_type != null && this.prop_number == '') {
      this.viewOffers = true;
      this.ngOnInit();
    }
    else {
      this.viewOffers = false;
    }

  }

  showOffer() {
    if (this.prop_number == '' || this.prop_number == null) {
          this.spanerr = true
    }
    else {
      this.show_offer = "block";
      let applicableOfferData = this.P_ID;
      let paymentType = this.Payment_type;
      this.mainService.getapplicableOffers(applicableOfferData, paymentType).subscribe((result) => {
        this.offerDetail = [];
        this.offerData = result;
        console.log(this.offerData);
       
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
            case "Product Giveaway":
              data.benefit = data.benefit;
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
            start_date: data.start_date,
            end_date: data.end_date,
            counts: data.counts,
            applicable_on_payment_type: data.applicable_on_payment_type,
            applicable_on_project: data.applicable_on_project,
            applicable_on_property_type: data.applicable_on_property_type,
            applicable_on_property: data.applicable_on_property,
            checked: false
          })
        });
      })
    }
  }

  selectOffer(e: any, type: any) {
    this.OfferID = e.target.value;
    this.type = type;   
    this.mainService.getOffer(this.OfferID).subscribe((result) => {
      if (e.target.checked == true) {
        this.offerData = result;
        this.offerDetails = this.offerData.offer;
        this.offerPrice = Number(this.offerDetails.benefit).toLocaleString('en-IN');
        this.OfferBenefit = this.offerDetails.benefit;
        this.offerType = this.offerDetails.type;
        this.offerName = this.offerDetails.name;
        let priority = 0;
        this.showValue.push(e.target.value);
        if (this.offerType == "Direct Discount(in Rs)") {
          priority = 3;
        } else if (this.offerType == "Area Wise") {
          priority = 1;
        } else if (this.offerType == "Direct Discount(in Percentage)") {
          priority = 2;
        } else {
          priority = 4;
        }
        this.appliedOffers.push({
          name: this.offerName,
          type: this.offerType,
          benefit: this.OfferBenefit,
          priority: priority
        })
        this.appliedOffers.sort(function (a: any, b: any) {
          return a.priority - b.priority;
        })

        this.getFinalPrice = parseFloat(this.Full_Property_price);
        this.totalDiscount = 0; 
        this.productGiveaway = '';     
        for (let i = 0; i < this.appliedOffers.length; i++) {
          switch (this.appliedOffers[i].type) {
            case 'Area Wise':
              this.totalDiscount += (this.Property_size * parseFloat(this.appliedOffers[i].benefit));
              this.getFinalPrice -= (this.Property_size * parseFloat(this.appliedOffers[i].benefit));
              break;
            case 'Direct Discount(in Percentage)':
              this.totalDiscount += ((this.getFinalPrice / 100) * parseFloat(this.appliedOffers[i].benefit));
              this.getFinalPrice -= ((this.getFinalPrice / 100) * parseFloat(this.appliedOffers[i].benefit));
              break;
            case 'Direct Discount(in Rs)':
              this.totalDiscount += parseFloat(this.appliedOffers[i].benefit);
              this.getFinalPrice -= parseFloat(this.appliedOffers[i].benefit);
              break;
            case 'Product Giveaway':
              this.productGiveaway = this.appliedOffers[i].benefit;
              break;
            default:
              break;
          }
        }
      }
      else {
        var indexofID = this.showValue.map(function(f: any) { return f.name; }).indexOf(this.offerName);
        this.showValue.splice(indexofID, 1);
        this.offerData = result;
        this.offerDetails = this.offerData.offer;
        this.offerName = this.offerDetails.name;
        var index = this.appliedOffers.map(function(f: any) { return f.name; }).indexOf(this.offerName);
        this.appliedOffers.splice(index, 1);
        this.appliedOffers.sort(function (a: any, b: any) {
          return a.priority - b.priority;
        })

        this.getFinalPrice = parseFloat(this.Full_Property_price);
        this.totalDiscount = 0;
        this.productGiveaway = '';
        for (let i = 0; i < this.appliedOffers.length; i++) {
          switch (this.appliedOffers[i].type) {
            case 'Area Wise':
              this.totalDiscount += (this.Property_size * parseFloat(this.appliedOffers[i].benefit));
              this.getFinalPrice -= (this.Property_size * parseFloat(this.appliedOffers[i].benefit));
              break;
            case 'Direct Discount(in Percentage)':
              this.totalDiscount += ((this.getFinalPrice / 100) * parseFloat(this.appliedOffers[i].benefit));
              this.getFinalPrice -= ((this.getFinalPrice / 100) * parseFloat(this.appliedOffers[i].benefit));
              break;
            case 'Direct Discount(in Rs)':
              this.totalDiscount += parseFloat(this.appliedOffers[i].benefit);
              this.getFinalPrice -= parseFloat(this.appliedOffers[i].benefit);
              break;
            case 'Product Giveaway':
              this.productGiveaway = this.appliedOffers[i].benefit;
              break;
            default:
              break;
          }
        }
      }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ProceedtoBooking() {
    let addPreBook = {
      lead_id: this.leadId,
      property_id: this.propertyId,
      payment_type: this.Payment_type,
      commitment: this.commitment_data,
      offer: this.showValue,
      finalized_property_price: this.getFinalPrice
    }
    this.NowPreBookingData = {
      ProjectId: this.ProjectId,
      PropertyId: addPreBook.property_id,
      PaymentType: addPreBook.payment_type,
      Offer: addPreBook.offer,
      Commitment: addPreBook.commitment,
      FinalPropertyPrice: addPreBook.finalized_property_price,
      PropertyTypeId: this.Property_TypeId,
      PropertyNumber: this.prop_number,
      OfferName: this.offerName

    }
    this.data = this.NowPreBookingData;
    this.dialogRef.close(this.data);
    // this.route.navigateByUrl('/layout/customer');
  }


  saveData() {
    let addPreBook = {
      lead_id: this.leadId,
      property_id: this.propertyId,
      payment_type: this.Payment_type,
      commitment: this.commitment_data,
      offer: this.showValue,
      finalized_property_price: this.getFinalPrice
    }
    const formData = new FormData();
    formData.append('lead_id', addPreBook.lead_id);
    formData.append('property_id', addPreBook.property_id);
    formData.append('payment_type', addPreBook.payment_type);
    formData.append('commitment', addPreBook.commitment);
    formData.append('offer', addPreBook.offer);
    formData.append('finalized_property_price', addPreBook.finalized_property_price);
    for (let img of this.filesToUpload) {
      formData.append('commitment_image', img);
    }
    this.mainService.addPreBooking(formData).subscribe((result) => {
      this.data = result;
      this.toastr.success(this.data.message);
      this.route.navigateByUrl('layout/customer/add-customer');
      this.dialogRef.close(this.data.message);
    }, err => {
        console.log(err);
        this.errorShow = err;
        this.errorMsg = this.errorShow;
        this.toastr.error(this.errorMsg);
    })
  }

}
// this.mainService.addcustomer(value).subscribe(result => {

//   this.customerResult = result;
//   this.toastr.success(this.customerResult.message);
  
//   this.router.navigate(['layout/customer']);

// }, err => {
//   console.log(err);
//   this.errorShow = err;
//   this.errorMsg = this.errorShow;
//   this.toastr.error(this.errorMsg);
// })


