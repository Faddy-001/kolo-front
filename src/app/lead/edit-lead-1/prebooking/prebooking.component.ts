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
  offerPrice: any;
  offerType: any;
  FinalPrice: any;
  showValue: any = [];
  TotalAreaPrice: any;
  Offer_Benefit: string = '';
  offerID: any = [];
  getFinalPrice: any;
  prop_number: string = "";
  isProperty: boolean = false;
  number: any;
  offerId: any = [];
  OfferID: any;
  commitment_data: any;
  leadId: any;
  spanerr: boolean = false;
  ShowNotLead: string = "none";
  ShowNowBookLeadavaialble: string = "";
  ShowsaveforlaterBookLeadavaialble: string = ""
  ProjectId: any;
  Property_TypeId: any;
  NowPreBookingData: any;
  offerName: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<ActivityLogComponent>,
    private mainService: MainService, private formbuilder: FormBuilder, private toastr: ToastrService) {

    this.leadId = data.id;
  }

  ngOnInit(): void {
    console.log(this.leadId);
    if (this.leadId == null || this.leadId == "") {
      this.ShowNotLead = "block";
      this.ShowNowBookLeadavaialble = "none";
      this.ShowsaveforlaterBookLeadavaialble = "none";
    }

  }

  commitDesc(e: any) {
    this.commitment_data = e.target.value;
    console.log(this.commitment_data);

  }

  search_PropertyNo(e: any) {

    console.log(this.P_ID);

    this.isProperty = true;

    this.newProperties = [];
    let searchData = e.target.value;
    // console.log(searchData);
    if (searchData == '') {
      this.prop_number = '';
      this.isProperty = false;
      this.show_offer = "none";
      this.ngOnInit();
    }
    else {

      this.mainService.getSearchProperty(searchData).subscribe((result) => {
        this.properties = result;

        console.log(this.properties);
        this.propertyDetail = this.properties.properties;
        console.log(this.propertyDetail);

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
          }
          )
          console.log(this.newProperties);



        }
      })
    }
  }

  selected_prop(token: any) {
    this.isProperty = false;
    console.log(token);
    console.log(token.number);
    this.prop_number = token.number;

  }

  @HostListener('click') myClick() {
    this.isProperty = false;
  }

  GetPropertyPrice(e: any) {
    this.isProperty = false;
    console.log(e);
    console.log(e.number);
    this.prop_number = e.number;
    this.propertyId = e.id;
    this.mainService.getProperty(this.propertyId).subscribe(result => {
      this.propertytData = result;
      this.propertyNumber = this.propertytData;
      this.PropertyAll = this.propertyNumber.property;
      this.Property_price = this.PropertyAll.price;
      console.log(this.Property_price);

      this.Property_size = this.PropertyAll.property_size;
      console.log(this.Property_size);
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
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  close() {
    this.dialogRef.close();
  }


  getImage(e: any) {
    console.log(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {

      let selectedFile = e.target.files[i];
      console.log(selectedFile);
      this.filesToUpload.push(selectedFile);
      console.log(this.filesToUpload);


      var fileName = selectedFile.name;
      var ext = fileName.split('.').pop();
      let img = { url: '', name: fileName };
      console.log(img);

      var reader = new FileReader();
      console.log(reader);


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
      console.log(this.images);

      reader.readAsDataURL(e.target.files[i]);

    }

  }

  deleteImg(index: number) {
    console.log(index);
    this.images.splice(index, 1)
    this.filesToUpload = Array.from(this.filesToUpload).filter(
      item => {
        return item != this.filesToUpload[index]
      })
    console.log(this.images);

  }


  deleteImage(url: any): void {
    this.urls = this.urls.filter((a) => a !== url);
  }

  getType(e: any) {
    this.Payment_type = e.value;
    // console.log((this.Payment_type));

  }

  showOffer() {
    console.log(this.prop_number);
    if (this.prop_number == '' || this.prop_number == null) {
      // alert("Please Select Property!!")
      this.spanerr = true
    }
    else {
      console.log(this.prop_number);

      this.show_offer = "block";
      let applicableOfferData = this.P_ID;
      let paymentType = this.Payment_type;
      this.mainService.getapplicableOffers(applicableOfferData, paymentType).subscribe((result) => {
        this.offerDetail = [];
        this.offerData = result;
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
        console.log(this.offerDetail);

        $(function () {
          $("#example").DataTable();
        });

        $("#example").DataTable().destroy();

      })
    }
  }

  selectOffer(e: any) {
    this.OfferID = e.target.value;
    console.log(this.OfferID);
    this.mainService.getOffer(this.OfferID).subscribe((result) => {
      if (e.target.checked == true) {
        this.offerData = result;
        this.offerDetails = this.offerData.offer;
        this.offerPrice = this.offerDetails.benefit;
        this.offerType = this.offerDetails.type;
        this.offerName=this.offerDetails.name;
        console.log(this.offerName);
        this.showValue.push(this.OfferID);
        console.log(this.showValue);

        switch (this.offerType) {
          case "Area Wise":
            if (this.showValue.length > 1) {
              console.log(this.getFinalPrice);
            }
            else {
              this.TotalAreaPrice = this.offerPrice * this.Property_size;
              console.log(this.TotalAreaPrice);
              this.getFinalPrice = this.Property_price - this.TotalAreaPrice;
            }
            break;
          case "Product Giveaway":
            if (this.showValue.length > 1) {
              this.getFinalPrice = this.getFinalPrice;
              console.log(this.getFinalPrice);
              this.Offer_Benefit = "Product Giveaway" + ' ' + this.offerPrice;
            }
            else {
              this.getFinalPrice = this.Property_price;
              this.Offer_Benefit = "Product Giveaway" + ' ' + this.offerPrice;
            }


            break;
          case "Direct Discount(in Rs)":
            let applicableOfferData = this.P_ID;
            let paymentType = this.Payment_type;

            if (this.showValue.length > 1) {

              this.getFinalPrice = this.getFinalPrice - this.offerPrice
              console.log(this.getFinalPrice);

            }
            else {
              this.getFinalPrice = this.Property_price - this.offerPrice;
              console.log(this.getFinalPrice);
            }

            break;
          case "Direct Discount(in Percentage)":
            if (this.showValue.length > 1) {
              this.getFinalPrice = (this.getFinalPrice * this.offerPrice) / 100;
              console.log(this.getFinalPrice);

            }
            else {
              this.TotalAreaPrice = (this.offerPrice * this.Property_price) / 100;
              console.log(this.TotalAreaPrice);
              this.getFinalPrice = this.TotalAreaPrice;
              this.getFinalPrice = this.getFinalPrice;
            }

            break;

          default:
            break;
        }
      }
      else {
        var index = this.showValue.indexOf(this.OfferID)
        if (index >= 0) {
          this.showValue.splice(index, 1)
        }
        this.getFinalPrice = '';
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
      offer: this.OfferID,
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
      PropertyNumber:this.prop_number,
      OfferName:this.offerName

    }
    console.log(this.propertyNumber);
    console.log(this.prop_number);   
    console.log(this.NowPreBookingData);
    
    this.data = this.NowPreBookingData;
    this.dialogRef.close(this.data);
  }


  saveData() {
    let addPreBook = {
      lead_id: this.leadId,
      property_id: this.propertyId,
      payment_type: this.Payment_type,
      commitment: this.commitment_data,
      offer: this.OfferID,
      finalized_property_price: this.getFinalPrice
    }
     // console.log(addPreBook);
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
      console.log(result);
      this.data = result;
      this.toastr.success(this.data.message);
      this.dialogRef.close(this.data.message);
    })
  }

}



