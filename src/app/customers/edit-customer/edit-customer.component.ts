import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { NameFieldComponent } from 'src/app/lead/add-lead/name-field/name-field.component';
import { ViewPreBookingsComponent } from 'src/app/lead/edit-lead/view-pre-bookings/view-pre-bookings.component';
import { PrebookingComponent } from 'src/app/lead/edit-lead/prebooking/prebooking.component';
import { EditnameFieldComponent } from 'src/app/lead/edit-lead/editname-field/editname-field.component';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  show_paymentOptions: string = "none";
  show_ChequeDetails: string = "none";
  show_transacation: string = "none";
  row2Col:number=4;
  fName:string='';
  mName:string='';
  lName:string='';
  fsName:string='';
  msName:string='';
  lsName:string='';
 id:any=this.route.snapshot.params['id'];
 editCustomerForm:any=FormGroup;
 panelOpenState = false;
 step = 0;
 State: string = "";
 City: string = "";
 Country: string = "";
 postalError: boolean = false;
 postalMsg: string = ''
 PostalCode: string = "";
 Address: string = "";
 P_PostalCode: string = "";
 P_Address: string = "";
 P_State: string = "";
 P_City: string = "";
 P_Country: string = "";
 S_PostalCode: string = "";
 S_Address: string = "";
 S_State: string = "";
 S_City: string = "";
 S_Country: string = "";
 P_pinCode!: number;
  P_pinValue!: number;
  DocumentName: any;
  docLength: any = 0;
  City1: string = "";
  Country1: string = "";
  State1: string = "";
  SC_pinValue!: number;
  SP_pinValue!: number;
  PostalCode1: string = "";
  Address1: string = "";
  PreBookingCommitment: any;
  PreBookingPaymentType: any;
  PreBookingOfferName: any;
  PropertyNumber: any;
  PaymentVia: any;
  PayVia: any;
  showChequeInfo: string = "none";
  showTransactionNumber: string = "none";
  showPreBooking: string = "none";
  isLead: boolean = false;
  LeadData: any;
  noRecords: boolean = false;
  FirstName: any;
  MiddleName: any;
  LastName: any;
  LeadName: any;
  Phone: any;
  Leads: any;
  nameString: any;
  dialogValue: any;
  FullName: any;
  postalCodes: any;
  cityValue: string = '';
  stateValue: string = '';
  countryValue: string = '';
  postalCodeData: any = [];
  postOffice: any;
  filesToUpload: any = [];
  images = new Array();
  imagesURL = new Array();
  Sec_fName: string = '';
  Sec_mName: string = '';
  Sec_lName: string = '';
  SecondaryFullName: any;
  P_postalCodes: any;
  P_cityValue: string = '';
  P_stateValue: string = '';
  P_countryValue: string = '';
  P_postalCodeData: any = [];
  P_postOffice: any;
  P_postalError: boolean = false;
  P_postalMsg: string = ''
  Prebookings: any = [];
  PrebookingData: any;
  prebookings: any = [];
  newPrebookingData: any = [];
  PreBookingId: any;
  PreBook: any;
  Prebooking: any;
  PropertyDetails: any;
  ProjectDetails: any;
  Project_Id: any;
  PropertyId: any;
  PropertyTypeId: any;
  FinalizedPrice: any;
  PreBookingOfferId: any;
  NewPreBookString: any;
  PaymentViaTypeId: any;
  PaymentViaTypeName: any;
  filesToUploadSecondary: any = [];
  imagesSecondary = new Array();
  values: any = [];
  Customer:any;
  newCus:any=[]
  currentAddress:any={}
  permanentAddress:any={}
  ScurrentAddress:any={}
  SpermanentAddress:any={}

  
  customerDocuments= [
    {
      images : this.filesToUpload 
    },
    {
      images: this.filesToUploadSecondary
    }
  ]
  customerResult: any;
  mainService: any;
  toastr: any;
  errorShow: any;
  errorMsg: any;
  updatedCustomer: any;
  editCustomer: any;
  editCustomers: any;

  constructor(private formbuilder: FormBuilder, public dialog: MatDialog, private router:Router, private route: ActivatedRoute,
    private mainservice:MainService) {
      this.editCustomerForm = this.formbuilder.group({
        customer: this.formbuilder.group({
          lead_id: [null, Validators.required],
          first_name: [null, Validators.required],
          middle_name: [null],
          last_name: [null],
          gender: [null],
          email: [null, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
          phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          alternate_phone: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          document: this.formbuilder.group({
            type: [null],
            number: [null],
          }),
  
  
          current_address: this.formbuilder.group({
            address: [null, Validators.required],
            postal_code: [null],
            city: [null],
            state: [null],
            country: [null]
          }),
  
          permanent_address: this.formbuilder.group({
            address: [null, Validators.required],
            postal_code: [null],
            city: [null],
            state: [null],
            country: [null]
          }),
  
        }),
  
        secondaryContact: this.formbuilder.group({
          first_name: [null, Validators.required],
          middle_name: [null],
          last_name: [null],
          gender: [null],
          email: [null, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
          phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          alternate_phone: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          relation_with_customer: [null],
          document: this.formbuilder.group({
            type: [null],
            number: [null],
          }),
  
          current_address: this.formbuilder.group({
            address: [null],
            postal_code: [null],
            city: [null],
            state: [null],
            country: [null]
          }),
  
          permanent_address: this.formbuilder.group({
            address: [null],
            postal_code: [null],
            city: [null],
            state: [null],
            country: [null]
          }),
        }),
  
        property: this.formbuilder.group({
          project_id: [null],
          property_type_id: [null],
          property_id: [null],
          payment_type: [null],
          commitment: [null],
          offer: [null],
          finalized_property_price: [null]
        }),
  
        payment: this.formbuilder.group({
          booking_amount: ['0.00', null],
          booking_date: [null],
          payment_via: this.formbuilder.group({
            id: [null],
            name: [null],
          }),
          type: [null],
          number: [null],
          cheque_submission_date: [null],
          transaction_id: [null],
        }),
      })
     }

  ngOnInit(): void {
    // console.log(this.editCustomerForm.get(['customer','document']).value);
    
    this. GetPaymentVia();
    this.mainservice.getCustomer(this.id).subscribe((res:any)=>{
      console.log(this.id);
      
      this.Customer=res
      this.newCus=this.Customer.customer
      console.log(this.newCus,this.newCus.Addresses);
      this.newCus.Addresses.forEach((data:any,index:any=0) => {
          if(data.address_type=="Current"){
          this.currentAddress.id=data.id
          this.currentAddress.address=data.address
          this.currentAddress.city=data.city
          this.currentAddress.address_type=data.address_type
          this.currentAddress.state=data.state
          this.currentAddress.country=data.country
          this.currentAddress.postal_code=data.postal_code 
        }
     else{
      this.permanentAddress.id=data.id
      this.permanentAddress.address=data.address
      this.permanentAddress.city=data.city
      this.permanentAddress.address_type=data.address_type
      this.permanentAddress.state=data.state
      this.permanentAddress.country=data.country
      this.permanentAddress.postal_code=data.postal_code
     }
     
      });
//  console.log(this.currentAddress,this.permanentAddress, this.currentAddress.address);
this.newCus.Secondary_Contact.Addresses.forEach((data:any,index:any=0) => {
  if(data.address_type=="Current"){
  this.ScurrentAddress.id=data.id
  this.ScurrentAddress.address=data.address
  this.ScurrentAddress.city=data.city
  this.ScurrentAddress.address_type=data.address_type
  this.ScurrentAddress.state=data.state
  this.ScurrentAddress.country=data.country
  this.ScurrentAddress.postal_code=data.postal_code 
}
else{
this.SpermanentAddress.id=data.id
this.SpermanentAddress.address=data.address
this.SpermanentAddress.city=data.city
this.SpermanentAddress.address_type=data.address_type
this.SpermanentAddress.state=data.state
this.SpermanentAddress.country=data.country
this.SpermanentAddress.postal_code=data.postal_code
}

});
// console.log(this.ScurrentAddress,this.SpermanentAddress, this.newCus.Secondary_Contact.Addresses);
       this.fName=this.newCus.first_name
       this.lName=this.newCus.last_name
       this.mName=this.newCus.middle_name
       this.fsName=this.newCus.Secondary_Contact.first_name
       this.lsName=this.newCus.Secondary_Contact.last_name
       this.msName=this.newCus.Secondary_Contact.middle_name
       
      this.editCustomerForm = this.formbuilder.group({
        customer: this.formbuilder.group({
          lead_id: [this.newCus.id, Validators.required],
          first_name: [null, Validators.required],
          middle_name: [null],
          last_name: [null],
          gender: [this.newCus.gender],
          email: [this.newCus.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
          phone: [this.newCus.phone, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          alternate_phone: [this.newCus.alternate_phone, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          document: this.formbuilder.group({
            type: [null],
            number: [null],
          }),
  
  
          current_address: this.formbuilder.group({
            address: [ this.currentAddress.address, Validators.required],
            postal_code: [this.currentAddress.postal_code],
            city: [this.currentAddress.city],
            state: [this.currentAddress.state],
            country: [this.currentAddress.country]
          }),
  
          permanent_address: this.formbuilder.group({
            address: [this.permanentAddress.address, Validators.required],
            postal_code: [this.permanentAddress.postal_code],
            city: [this.permanentAddress.city],
            state: [this.permanentAddress.state],
            country: [this.permanentAddress.country]
          }),
  
        }),
  
        secondaryContact: this.formbuilder.group({
          first_name: [null, Validators.required],
          middle_name: [null],
          last_name: [null],
          gender: [this.newCus.Secondary_Contact.gender],
          email: [this.newCus.Secondary_Contact.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
          phone: [this.newCus.Secondary_Contact.phone, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          alternate_phone: [this.newCus.Secondary_Contact.alternate_phone, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          relation_with_customer: [this.newCus.Secondary_Contact.relation_with_customer],
          document: this.formbuilder.group({
            type: [null],
            number: [null],
          }),
  
          current_address: this.formbuilder.group({
            address: [this.ScurrentAddress.address],
            postal_code: [this.ScurrentAddress.postal_code],
            city: [this.ScurrentAddress.city],
            state: [this.ScurrentAddress.state],
            country: [this.ScurrentAddress.country]
          }),
  
          permanent_address: this.formbuilder.group({
            address: [this.SpermanentAddress.address],
            postal_code: [this.SpermanentAddress.postal_code],
            city: [this.SpermanentAddress.city],
            state: [this.SpermanentAddress.state],
            country: [this.SpermanentAddress.country]
          }),
        }),
  
        property: this.formbuilder.group({
          project_id: [null],
          property_type_id: [null],
          property_id: [null],
          payment_type: [null],
          commitment: [null],
          offer: [null],
          finalized_property_price: [null]
        }),
  
        payment: this.formbuilder.group({
          booking_amount: ['0.00', null],
          booking_date: [null],
          payment_via: this.formbuilder.group({
            id: [null],
            name: [null],
          }),
          type: [null],
          number: [null],
          cheque_submission_date: [null],
          transaction_id: [null],
        }),
      })
     
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  removevalue(i: any) {
    this.values.splice(i, 1);
  }

  addvalue() {
    this.values.push({ value: "" });
  }

  
  GetLead(e: any) {
    let LeadId = e;
    // console.log(LeadId);
    this.editCustomerForm.get(['customer', 'lead_id'])?.setValue(LeadId);
    this.isLead = false;
    this.mainservice.getLead(LeadId).subscribe((result) => {
      this.Leads = result;
      //  console.log(this.Leads.lead);
      this.LeadData = this.Leads.lead;
      // console.log(this.LeadData.first_name);
      this.Phone = this.LeadData.phone;
      this.FirstName = this.LeadData.first_name;
      this.MiddleName = this.LeadData.middle_name;
      this.LastName = this.LeadData.last_name;
      this.LeadName = this.FirstName + ' ' + this.MiddleName + ' ' + this.LastName;
      console.log(this.LeadName);
      console.log(this.Phone);
    })


  }

  leadType:string='active';
  search_Lead(e: any) {
    let searchData = e.target.value;
    console.log(searchData);

    if (searchData == '') {
      this.isLead = false;
      this.noRecords = false;
    }
    else {
      this.isLead = true;
      this.mainservice.searchResult(searchData,this.leadType ).subscribe((result) => {
        this.Leads = result;
        console.log(this.Leads);
        this.LeadData = this.Leads.leads;
        console.log(this.LeadData);
        if (this.LeadData == null || this.LeadData == '') {
          this.noRecords = true;
          this.isLead = false;;
        }
      })
    }
  }

  
  openNameField() {
    const dialogRef = this.dialog.open(EditnameFieldComponent, {
      data: {id:this.id,fname: this.fsName,mname:this.msName,lname:this.lsName}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The first dialog was closed');
      this.nameString = result;
      // console.log(this.nameString);
      this.fsName = this.nameString.fname;
      this.msName = this.nameString.mname;
      this.lsName = this.nameString.lname;
      
      this.editCustomerForm.get('first_name')?.setValue(this.fName);
      this.editCustomerForm.get('middle_name')?.setValue(this.mName);
      this.editCustomerForm.get('last_name')?.setValue(this.lName);

    });
  }

   //For Primary customer current address
   onChange(value: number) {
    // console.log(value);
    this.mainservice.getPostalCodes(value).subscribe((result) => {
      this.postalCodes = result;
      this.postOffice = this.postalCodes[0].PostOffice;
      if (this.postalCodes[0].Status == 'Success') {
        this.postalError = false;
        this.postalCodeData = [];
        this.postalCodes.forEach((data: any) => {
          this.postalCodeData.push({
            Message: data['Message'],
            Status: data['Status'],
            City: data['PostOffice'][0]['District'],
            State: data['PostOffice'][0]['State'],
            Country: data['PostOffice'][0]['Country'],
            Pincode: data['PostOffice'][0]['Pincode'],
          });
        })
        this.editCustomerForm.get(['customer', 'current_address', 'city'])?.setValue(this.postalCodeData[0].City);
        this.editCustomerForm.get(['customer', 'current_address', 'state'])?.setValue(this.postalCodeData[0].State);
        this.editCustomerForm.get(['customer', 'current_address', 'country'])?.setValue(this.postalCodeData[0].Country);

      }
      else if (this.postalCodes[0].Status == 'Error') {
        this.postalMsg = this.postalCodes[0].Message;
        //  console.log(this.postalCodes[0].Message);
        this.postalError = true;
        this.editCustomerForm.get(['customer', 'current_address', 'city'])?.setValue('');
        this.editCustomerForm.get(['customer', 'current_address', 'state'])?.setValue('');
        this.editCustomerForm.get(['customer', 'current_address', 'country'])?.setValue('');
      }
      else {
        this.postalError = false;
      }
    })
  }
  //checked address for primary customer
  selectAddress(e: any) {
    if (e.checked == true) {
      this.P_Address = this.Address;
      this.P_PostalCode = this.PostalCode;
      this.P_City = this.City;
      this.P_State = this.State;
      this.P_Country = this.Country;
      //console.log(this.P_Address);
      this.editCustomerForm.get(['customer', 'permanent_address', 'address'])?.setValue(this.P_Address);
      this.editCustomerForm.get(['customer', 'permanent_address', 'postal_code'])?.setValue(this.P_PostalCode);
      this.editCustomerForm.get(['customer', 'permanent_address', 'city'])?.setValue(this.P_City);
      this.editCustomerForm.get(['customer', 'permanent_address', 'state'])?.setValue(this.P_State);
      this.editCustomerForm.get(['customer', 'permanent_address', 'country'])?.setValue(this.P_Country);
    }
    else {
      this.P_Address = "";
      this.P_PostalCode = "";
      this.P_City = "";
      this.P_State = "";
      this.P_Country = "";
      this.editCustomerForm.get(['customer', 'permanent_address', 'address'])?.setValue(null);
      this.editCustomerForm.get(['customer', 'permanent_address', 'postal_code'])?.setValue(null);
      this.editCustomerForm.get(['customer', 'permanent_address', 'city'])?.setValue(null);
      this.editCustomerForm.get(['customer', 'permanent_address', 'state'])?.setValue(null);
      this.editCustomerForm.get(['customer', 'permanent_address', 'country'])?.setValue(null);
    }
  }

  GetValue(e: any) {
    this.DocumentName = e.value;
    switch (this.DocumentName) {
      case 'Adhaar Card':
        this.docLength = "12";
        break;
      case "Driving License":
        this.docLength = "16";
        break;
      case "Pan Card":
        this.docLength = "10";
        break;
      case "Passsbook":
        this.docLength = "16";
        break;
      case "Passport":
        this.docLength = "8";
        break;
      case "Ration Card":
        this.docLength = "10";
        break;
      case "Voter Id":
        this.docLength = "10";
        break;
      default:
        break;
    }
  }

  readURL(e: any) {
    //  console.log(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      let selectedFile = e.target.files[i];
      console.log(selectedFile);
      this.filesToUpload.push(selectedFile);
      console.log(this.filesToUpload);

      var fileName = selectedFile.name;
      var ext = fileName.split('.').pop();
      console.log(ext);
      
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
      // console.log(this.images);

      reader.readAsDataURL(e.target.files[i]);

    }

  }

  deleteImg(index: number) {
    //console.log(index);
    this.images.splice(index, 1)
    this.filesToUpload = Array.from(this.filesToUpload).filter(
      item => {
        return item != this.filesToUpload[index]
      })
    console.log(this.images);

  }

  readURLSecondaryCustomer(e: any) {
    //  console.log(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      let selectedFile = e.target.files[i];
      console.log(selectedFile);
      this.filesToUploadSecondary.push(selectedFile);
      console.log(this.filesToUploadSecondary);

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

      this.imagesSecondary.push(img);
      this.customerDocuments[0].images.push(img)
      // console.log(this.images);

      reader.readAsDataURL(e.target.files[i]);

    }

  }

  deleteImgSecondary(index: number) {
    this.imagesSecondary.splice(index, 1)
    this.filesToUploadSecondary = Array.from(this.filesToUploadSecondary).filter(
      item => {
        return item != this.filesToUploadSecondary[index]
      })
    console.log(this.imagesSecondary);

  }
  
  
  changeEvent(c: any) {
    this.show_paymentOptions = "";
  }

  openSecondaryNameField() {
    const dialogRef = this.dialog.open(EditnameFieldComponent, {
      data: {id:this.id,fname: this.fName,mname:this.mName,lname:this.lName}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nameString = result;
      console.log(this.nameString);
      
      this.fName = this.nameString.fname;
      this.mName = this.nameString.mname;
      this.lName = this.nameString.lname;
      
      this.editCustomerForm.get('first_name')?.setValue(this.fName);
      this.editCustomerForm.get('middle_name')?.setValue(this.mName);
      this.editCustomerForm.get('last_name')?.setValue(this.lName);

    });
  }


  //For secondary customer current  address
  onChangeSecondaryCustomer(value: number) {
    //  console.log(value);
    this.mainservice.getPostalCodes(value).subscribe((result) => {
      this.P_postalCodes = result;
      // console.log(this.P_postalCodes);
      this.P_postOffice = this.P_postalCodes[0].PostOffice;
      if (this.P_postalCodes[0].Status == 'Success') {
        this.P_postalError = false;
        this.P_postalCodeData = [];
        this.P_postalCodes.forEach((data: any) => {
          this.P_postalCodeData.push({
            Message: data['Message'],
            Status: data['Status'],
            City: data['PostOffice'][0]['District'],
            State: data['PostOffice'][0]['State'],
            Country: data['PostOffice'][0]['Country'],
            Pincode: data['PostOffice'][0]['Pincode'],
          });
        })
        //console.log(this.P_postalCodeData);
        this.editCustomerForm.get(['secondaryContact', 'current_address', 'city'])?.setValue(this.P_postalCodeData[0].City);
        this.editCustomerForm.get(['secondaryContact', 'current_address', 'state'])?.setValue(this.P_postalCodeData[0].State);
        this.editCustomerForm.get(['secondaryContact', 'current_address', 'country'])?.setValue(this.P_postalCodeData[0].Country);

      }
      else if (this.postalCodes[0].Status == 'Error') {
        this.postalMsg = this.postalCodes[0].Message;
        // console.log(this.postalCodes[0].Message);
        this.postalError = true;
        this.editCustomerForm.get(['secondaryContact', 'current_address', 'city'])?.setValue('');
        this.editCustomerForm.get(['secondaryContact', 'current_address', 'state'])?.setValue('');
        this.editCustomerForm.get(['secondaryContact', 'current_address', 'country'])?.setValue('');
      }
      else {
        this.postalError = false;
      }
    })
  }

  //For secondary customer permanent address
  onChangeSecondaryCustomerPermanent(value: number) {
    // console.log(value);
    this.mainservice.getPostalCodes(value).subscribe((result) => {
      this.P_postalCodes = result;
      // console.log(this.P_postalCodes);
      this.P_postOffice = this.P_postalCodes[0].PostOffice;
      if (this.P_postalCodes[0].Status == 'Success') {
        this.P_postalError = false;
        this.P_postalCodeData = [];
        this.P_postalCodes.forEach((data: any) => {
          this.P_postalCodeData.push({
            Message: data['Message'],
            Status: data['Status'],
            City: data['PostOffice'][0]['District'],
            State: data['PostOffice'][0]['State'],
            Country: data['PostOffice'][0]['Country'],
            Pincode: data['PostOffice'][0]['Pincode'],
          });
        })
        //console.log(this.P_postalCodeData);

        console.log(this.P_postalCodeData[0].City);

        this.editCustomerForm.get(['secondaryContact', 'permanent_address', 'city'])?.setValue(this.P_postalCodeData[0].City);
        this.editCustomerForm.get(['secondaryContact', 'permanent_address', 'state'])?.setValue(this.P_postalCodeData[0].State);
        this.editCustomerForm.get(['secondaryContact', 'permanent_address', 'country'])?.setValue(this.P_postalCodeData[0].Country);

      }
      else if (this.postalCodes[0].Status == 'Error') {
        this.postalMsg = this.postalCodes[0].Message;
        //console.log(this.postalCodes[0].Message);
        this.postalError = true;
        this.editCustomerForm.get(['secondaryContact', 'permanent_address', 'city'])?.setValue('');
        this.editCustomerForm.get(['secondaryContact', 'permanent_address', 'state'])?.setValue('');
        this.editCustomerForm.get(['secondaryContact', 'permanent_address', 'country'])?.setValue('');
      }
      else {
        this.postalError = false;
      }
    })
  }

  viewPreBookings() {
    const dialogRef = this.dialog.open(ViewPreBookingsComponent, {
      width: '350px',
      data: { prebooking: this.PrebookingData }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showPreBooking = "";
      this.Prebookings = result;
      this.PreBookingId = this.Prebookings.PID;
      this.Prebooking = this.Prebookings.Prebookings;
      this.mainservice.getPreBooking(this.PreBookingId).subscribe((result) => {
        this.Prebooking = result;
        this.PreBook = this.Prebooking.preBooking;
        console.log(this.PreBook);
        this.PropertyDetails = this.PreBook.Property;
        this.PropertyId = this.PreBook.property_id;
        this.PropertyTypeId = this.PreBook.Property.property_type_id;
        this.FinalizedPrice = this.PreBook.finalized_property_price;
        this.ProjectDetails = this.PropertyDetails.Project;
        this.Project_Id = this.ProjectDetails.id;
        this.PreBookingCommitment = this.PreBook.commitment;
        this.PreBookingPaymentType = this.PreBook.payment_type;
        this.PreBookingOfferName = this.PreBook.offer[0].name;
        this.PreBookingOfferId = this.PreBook.offer[0].id;
        // console.log(this.PreBookingOfferId);
        this.editCustomerForm.get(['property', 'project_id'])?.setValue(this.Project_Id);
        this.editCustomerForm.get(['property', 'property_type_id'])?.setValue(this.PropertyTypeId);
        this.editCustomerForm.get(['property', 'property_id'])?.setValue(this.PropertyId);
        this.editCustomerForm.get(['property', 'payment_type'])?.setValue(this.PreBookingPaymentType);
        this.editCustomerForm.get(['property', 'commitment'])?.setValue(this.PreBookingCommitment);
        this.editCustomerForm.get(['property', 'offer'])?.setValue(this.PreBookingOfferId);
        this.editCustomerForm.get(['property', 'finalized_property_price'])?.setValue(this.FinalizedPrice);
        this.PropertyNumber = this.PreBook.Property.number;
      },
        err => {
          console.log(err);
        })
    });
  }

  newBooking() {
    const dialogRef = this.dialog.open(PrebookingComponent, {

      width: '600px', height: '500px',

      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.NewPreBookString = result;
      console.log(this.NewPreBookString);
      this.PreBookingCommitment = this.NewPreBookString.Commitment ? this.NewPreBookString.Commitment : '';
      this.FinalizedPrice = this.NewPreBookString.FinalPropertyPrice ? this.NewPreBookString.FinalPropertyPrice : '';
      this.PreBookingOfferId = this.NewPreBookString.Offer ? this.NewPreBookString.Offer : '';
      this.PreBookingPaymentType = this.NewPreBookString.PaymentType ? this.NewPreBookString.PaymentType : '';
      this.PropertyTypeId = this.NewPreBookString.PropertyTypeId ? this.NewPreBookString.PropertyTypeId : '';
      this.Project_Id = this.NewPreBookString.ProjectId ? this.NewPreBookString.ProjectId : '';
      this.PropertyId = this.NewPreBookString.PropertyId ? this.NewPreBookString.PropertyId : '';
      this.PropertyNumber = this.NewPreBookString.PropertyNumber ? this.NewPreBookString.PropertyNumber : '';
      this.PreBookingOfferName = this.NewPreBookString.OfferName ? this.NewPreBookString.OfferName : '';

      this.editCustomerForm.get(['property', 'project_id'])?.setValue(this.Project_Id);
      this.editCustomerForm.get(['property', 'property_type_id'])?.setValue(this.PropertyTypeId);
      this.editCustomerForm.get(['property', 'property_id'])?.setValue(this.PropertyId);
      this.editCustomerForm.get(['property', 'payment_type'])?.setValue(this.PreBookingPaymentType);
      this.editCustomerForm.get(['property', 'commitment'])?.setValue(this.PreBookingCommitment);
      this.editCustomerForm.get(['property', 'offer'])?.setValue(this.PreBookingOfferId);
      this.editCustomerForm.get(['property', 'finalized_property_price'])?.setValue(this.FinalizedPrice);
    },
      err => {
        console.log(err);
      });
  }

 

  GetPaymentViaType(e: any) {
    // console.log(e.value);
    this.PaymentViaTypeId = e.value.id;
    this.PaymentViaTypeName = e.value.name;
    if (this.PaymentViaTypeId == "1" && this.PaymentViaTypeName == "Cash") {
      this.showTransactionNumber = "none";
      this.showChequeInfo = "none";
    }
    else if (this.PaymentViaTypeId == "2" && this.PaymentViaTypeName == "Cheque") {
      this.showChequeInfo = "flex";
      this.showTransactionNumber = "none";
    }
    else {
      this.showTransactionNumber = "flex";
      this.showChequeInfo = "none";
    }
    this.editCustomerForm.get(['payment', 'payment_via', 'name'])?.setValue(this.PaymentViaTypeName);
    this.editCustomerForm.get(['payment', 'payment_via', 'id'])?.setValue(this.PaymentViaTypeId);

  }

  
  GetPaymentVia() {
    this.mainservice.getPaymentVia().subscribe(result => {
      this.PaymentVia = result;
      this.PayVia = this.PaymentVia.paymentVia;
      console.log(this.PayVia);

    },
      err => {
        console.log(err);
      })
  }


  GetPaymentType(e: any)
   {
      console.log(e.value);
      if(e.value=="Cheque")
        {
          this.show_ChequeDetails="";
          this.show_transacation="none";
          
        }
        else if(e.value=="Online")
        {
          this.show_transacation="";
          this.show_ChequeDetails="none"
        }
        else
        {
          this.show_transacation="none";
          this.show_ChequeDetails="none";
        }       
  }



 


  submit(value: any) {

    console.log(value);

    value.customer.lead_id == null || value.customer.lead_id == "" ? delete value.customer.lead_id : true;
    value.customer.middle_name == null || value.customer.middle_name == "" ? delete value.customer.middle_name : true;
    value.customer.alternate_phone == null ? delete value.customer.alternate_phone : true;
    value.customer.email == null ? delete value.customer.email : true;
    if (value.customer.document) {
      value.customer.document.type == null || value.customer.document.number == null ? delete value.customer.document : true;
    }
    value.secondaryContact.alternate_phone == null ? delete value.secondaryContact.alternate_phone : true;
    value.secondaryContact.middle_name == null ? delete value.secondaryContact.middle_name : true;
    value.secondaryContact.email == null ? delete value.secondaryContact.email : true;
    value.secondaryContact.relation_with_customer == null ? delete value.secondaryContact.relation_with_customer : true;
    if (value.secondaryContact.document) {
      value.secondaryContact.document.type == null || value.secondaryContact.document.number == null ? delete value.secondaryContact.document : true;
    }
    if (value.secondaryContact.current_address) {
      value.secondaryContact.current_address.address == null || value.secondaryContact.current_address.address == "" || value.secondaryContact.current_address.postal_code == null || value.secondaryContact.current_address.postal_code == "" ? delete value.secondaryContact.current_address : true;
    }
    if (value.secondaryContact.permanent_address) {
      value.secondaryContact.permanent_address.address == null || value.secondaryContact.permanent_address.address == "" || value.secondaryContact.permanent_address.postal_code == null || value.secondaryContact.permanent_address.postal_code == "" ? delete value.secondaryContact.permanent_address : true;
    }
    value.property.commitment == null ? delete value.property.commitment : true;
    value.property.offer == null ? delete value.property.offer : true;
    value.payment.booking_date == null ? delete value.payment.booking_date : true;
    value.payment.number == null ? delete value.payment.number : true;
    value.payment.cheque_submission_date == null ? delete value.payment.cheque_submission_date : true;
    value.payment.transaction_id == null ? delete value.payment.transaction_id : true;
    
    const formData = new FormData();
    
    
    // value.customer.documents.forEach((data: any) => {
    //   console.log(data.images);
     
    //   data.images.forEach((item:any)=>{
        
       

    
    //     formData.append("primary"+data.type.replaceAll(' ','')+"files",item,item.name)
    //   })
    // })
    formData.append('customer', JSON.stringify(value.customer));
    formData.append('secondaryContact', JSON.stringify(value.secondaryContact));
    formData.append('payment', JSON.stringify(value.payment));
    formData.append('property', JSON.stringify(value.property));

    // this.mainService.editCustomer(this.id,value).subscribe((result: any) => {
    //   console.log(result);
      
    //   this.editCustomers = result;
    //   this.toastr.success(this.editCustomers.message);
      
    //   this.router.navigate(['layout/customer']);

    // }, (err: any) => {
    //   console.log(err);
    //   this.errorShow = err;
    //   this.errorMsg = this.errorShow;
    //   this.toastr.error(this.errorMsg);
    // })
//     submit(value:any){
//       if (value.expected_visit_date._d == "Invalid Date") {
//      delete value.expected_visit_date
//     }
//     if (value.follow_up_date._d == "Invalid Date") {
//      delete value.follow_up_date        
//     }
//    if (this.EditLeadForm.valid) {
//      const sp =   this.route.url.split('/');
//      const NewArr = sp.filter((item,i) => i !== 0 && i !== sp.length-1)
//      const matchedUrl = NewArr.join('/');
 
//      if(matchedUrl == 'layout/lead/lead/uncalled-leads/edit-lead'){
//        this.continueUpdate();
//      } else if(matchedUrl == 'layout/lead/lead/todays-follow-up/edit-lead') {
//        this.continueTodayFollowUpUpdate();
//        //this.ngOnInit();
//      } else {
//        this.mainService.updateLead(this.id,value).subscribe((result)=>{
//        this.updatedLead = result;
//        this.toastr.success(this.updatedLead.message)
//        this.route.navigateByUrl('/layout/lead/lead');
//     },
//      (error)=>{
//        console.log(error);  
//        this.errorShow=error;
//        this.errorMsg=this.errorShow.error.error.phone;
//        this.toastr.error(this.errorMsg);
 
//      })
//     }
//    }
//  }
  }
}
