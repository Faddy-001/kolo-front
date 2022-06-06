import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { NameFieldComponent } from 'src/app/lead/add-lead/name-field/name-field.component';
import { ViewPreBookingsComponent } from 'src/app/lead/edit-lead/view-pre-bookings/view-pre-bookings.component';
import { PrebookingComponent } from 'src/app/lead/edit-lead/prebooking/prebooking.component';
import { data } from 'jquery';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { forEach } from 'jszip';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { read } from 'fs';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  show_paymentOptions: string = "none";
  show_ChequeDetails: string = "none";
  show_transacation: string = "none";
  row2Col: number = 4;
  fName: string = '';
  mName: string = '';
  lName: string = '';
  Sec_fName: string = '';
  Sec_mName: string = '';
  Sec_lName: string = '';
  panelOpenState = true;
  filesToUpload: any = [];
  filesToUploadSecondary: any = [];
  images = new Array();
  imagesURL = new Array();
  imagesSecondary = new Array();
  cImages = new Array();
  imagesURLSecondary = new Array();
  step = 0;
  nameString: any;
  dialogValue: any;
  FullName: any;
  LeadId: any;
  addCustomerForm!: FormGroup;
  leadData: any = [];
  PrebookingData: any;
  prebookings: any = [];
  newPrebookingData: any = [];
  PropertyData: any = [];
  Properties: any;
  PreBookingString: any = [];
  index: any;
  Prebookings: any = [];
  Prebooking: any;
  IDD: any;
  PreBookingId: any;
  PreBook: any;
  PreBookingCommitment: any;
  PreBookingPaymentType: any;
  PreBookingOfferName: any;
  PropertyNumber: any;
  PaymentVia: any;
  PayVia: any;
  showChequeInfo: string = "none";
  showTransactionNumber: string = "none";
  showPreBooking: string = "none";
  showProperty: string = "none";
  PropertyDetails: any;
  ProjectDetails: any;
  Project_Id: any;
  PropertyId: any;
  PropertyTypeId: any;
  FinalizedPrice: any;
  PostalCode: string = "";
  Address: string = "";
  State: string = "";
  City: string = "";
  Country: string = "";
  Address1: string = "";
  State1: string = "";
  City1: string = "";
  Country1: string = "";
  PostalCode1: string = "";
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
  SecondaryFullName: any;
  PaymentViaTypeId: any;
  PaymentViaTypeName: any;
  PreBookingOfferId: any;
  pinCode!: number;
  pinValue!: number;
  postalCodes: any;
  cityValue: string = '';
  stateValue: string = '';
  countryValue: string = '';
  postalCodeData: any = [];
  postOffice: any;
  postalError: boolean = false;
  postalMsg: string = ''
  P_pinCode!: number;
  P_pinValue!: number;
  P_postalCodes: any;
  P_cityValue: string = '';
  P_stateValue: string = '';
  P_countryValue: string = '';
  P_postalCodeData: any = [];
  P_postOffice: any;
  P_postalError: boolean = false;
  P_postalMsg: string = ''
  P: any;
  SC_pinValue!: number;
  SP_pinValue!: number;
  DocumentName: any;
  docLength: any = 0;
  ProjectId: any;
  NewPreBookString: any;
  succMsg: any;
  newMsg: any;
  values: any = [];
  Leads: any;
  LeadData: any;
  isLead: boolean = false;
  noRecords: boolean = false;
  FirstName: any;
  MiddleName: any;
  LastName: any;
  LeadName: any;
  Phone: any;
  disabled: boolean = true;
  dd: any;
  mm: any;
  yyyy: any;
  date: any;
  showBtn: boolean = false;
  shwBtnInstalment: boolean = false;
  indexForImages: any;
  control: any;
  errorShow: any;
  errorMsg: string | undefined;
  customerResult: any;
  installmentPay: boolean | undefined;
  fullPay: boolean | undefined;
  fullPayCheckCol: boolean| undefined;
  otherWayPay!: boolean;
  property: any;
  checkPaymentType: any;
  checkPaymentTypen: any;
  showInstallmentPayment: String | undefined;
  showFullPayment: String | undefined;
  PaymentTypeName: any;


  constructor(private formbuilder: FormBuilder, private router: Router, private mainService: MainService, public dialog: MatDialog, private route: ActivatedRoute, private toastr: ToastrService) {
    this.addCustomerForm = this.formbuilder.group({

      customer: this.formbuilder.group({
        lead_id: [null],
        first_name: [null, Validators.required],
        middle_name: [null],
        last_name: [null, Validators.required],
        gender: [null, Validators.required],
        email: [null, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        alternate_phone: [null, [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        current_address: this.formbuilder.group({
          address: [null, Validators.required],
          postal_code: [null, Validators.required],
          city: [null, Validators.required],
          state: [null, Validators.required],
          country: [null, Validators.required]
        }),

        permanent_address: this.formbuilder.group({
          address: [null, Validators.required],
          postal_code: [null, Validators.required],
          city: [null, Validators.required],
          state: [null, Validators.required],
          country: [null, Validators.required]
        }),
        documents: this.formbuilder.array([this.newDocument()])

      }),
      // Break
      secondaryContact: this.formbuilder.group({
        first_name: [null, Validators.required],
        middle_name: [null],
        last_name: [null],
        gender: [null, Validators.required],
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
        documents: this.formbuilder.array([])

      }),

      property: this.formbuilder.group({
        project_id: [null],
        property_type_id: [null],
        property_id: [null],
        payment_type: [null,Validators.required],
        commitment: [null],
        offer: [null],
        finalized_property_price: [null]
      }),

      payment: this.formbuilder.group({
        booking_amount: ['0.00', Validators.required],
        booking_date: [null],
        payment_via: this.formbuilder.group({
          id: [null, Validators.required],
          name: [null, Validators.required],
        }),
        type: [null],
        number: [null],
        cheque_submission_date: [null],
        transaction_id: [null],
      }),
      installments: this.formbuilder.array([])
    })
  }

  installments(): FormArray {
    return this.addCustomerForm.get("instalments") as FormArray
  }
  newInstallment(): FormGroup {
    return this.formbuilder.group({
      receiving_amount: ['', Validators.required],
      receiving_date: ['', Validators.required],
    })
  }
  addInstallment() {
    this.showBtn = true;
    this.shwBtnInstalment = true;
    this.installments().push(this.newInstallment());
  }
  removeInstallment(i: number) {
    this.installments().removeAt(i);              //Remove the control at the given index in the array.
  }



  //Primary csutoemr Document Multiple Fields
  documents(): FormArray {
    return this.addCustomerForm.get(["customer", "documents"]) as FormArray;
  }

  newDocument(): FormGroup {
    return this.formbuilder.group({
      type: [''],
      number: [''],
      images: [this.formbuilder.array([])]
    })
  }
  // addImages() {
  //   const control=this.addCustomerForm.controls.customer.get('documents');
    // console.log(control);   
  //   this.documents().push(this.newDocument());
  // }

  addImages(): FormGroup {
    return this.formbuilder.group({
      type: [''],
      number: [''],
      images: [this.formbuilder.array([])]
    })};

  addDocument() {
    const control=this.addCustomerForm.controls.customer.get('documents');
    // console.log(control);   
    this.documents().push(this.newDocument());
  }

  removeDocument(i: number) {
    this.documents().removeAt(i);              //Remove the control at the given index in the array.
  }
  // End primary customer Document select Multiple Fields
 

  //Secondary Customer documents details
  documentsSecondary(): FormArray {


    return this.addCustomerForm.get(["secondaryContact", "documents"]) as FormArray;

  }
  


  newdocumentsSecondary(): FormGroup {

    return this.formbuilder.group({
      type: [''],
      number: [''],
    })
  }
  addDocumentsSecondary() {

    this.documentsSecondary().push(this.newdocumentsSecondary());

  }
  removedocumentSecondary(i: number) {
    this.documentsSecondary().removeAt(i);              //Remove the control at the given index in the array.
  }
 


  //End details for secondary customer

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

  // removevalue(i: any) {
  //   this.values.splice(i, 1);
  // }

  // addvalue() {
  //   this.values.push({ value: "" });
  // }

  leadType:string='active';
  search_Lead(e: any) {
    let searchData = e.target.value;

    if (searchData == '') {
      this.isLead = false;
      this.noRecords = false;
      // this.ngOnInit();
    }
    else {
      this.isLead = true;
      this.mainService.searchResult(searchData, this.leadType).subscribe((result) => {
        this.Leads = result;
        this.LeadId=this.Leads.leads[0].id;
        // console.log(result,'adawd');
        this.LeadData = this.Leads.leads;
        console.log(this.LeadData);
        if (this.LeadData == null || this.LeadData == '') {
          this.noRecords = true;
          this.isLead = false;
          // this.ngOnInit();
        }
      })
    }
  }

  GetLead(LeadId: any) {
    // console.log(LeadId);
    this.addCustomerForm.get(['customer', 'lead_id'])?.setValue(LeadId);
    this.isLead = false;
    this.mainService.getLead(LeadId).subscribe((result) => {
      this.Leads = result;
      this.LeadId = LeadId;
      // this.LeadData = this.Leads.lead;
      // this.Phone = this.LeadData.phone;
      // this.FirstName = this.LeadData.first_name;
      // this.MiddleName = this.LeadData.middle_name;
      // this.LastName = this.LeadData.last_name;
      // this.LeadName = this.FirstName + ' ' + this.MiddleName + ' ' + this.LastName;

    })


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

  //For Primary customer current address
  onChange(value: number) {
    // console.log(value);
    this.mainService.getPostalCodes(value).subscribe((result) => {
      this.postalCodes = result;
      //   console.log(this.postalCodes);
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
        //  console.log(this.postalCodeData);

        //   console.log(this.postalCodeData[0].City);
        this.addCustomerForm.get(['customer', 'current_address', 'city'])?.setValue(this.postalCodeData[0].City);
        this.addCustomerForm.get(['customer', 'current_address', 'state'])?.setValue(this.postalCodeData[0].State);
        this.addCustomerForm.get(['customer', 'current_address', 'country'])?.setValue(this.postalCodeData[0].Country);

      }
      else if (this.postalCodes[0].Status == 'Error') {
        this.postalMsg = this.postalCodes[0].Message;
        //  console.log(this.postalCodes[0].Message);
        this.postalError = true;
        this.addCustomerForm.get(['customer', 'current_address', 'city'])?.setValue('');
        this.addCustomerForm.get(['customer', 'current_address', 'state'])?.setValue('');
        this.addCustomerForm.get(['customer', 'current_address', 'country'])?.setValue('');
      }
      else {
        this.postalError = false;
      }
    })
  }

  //For Primary customer permanent address
  onChangeCustomerPermanent(value: number) {
    //console.log(value);
    this.mainService.getPostalCodes(value).subscribe((result) => {
      this.P_postalCodes = result;
      //  console.log(this.P_postalCodes);
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

        // console.log(this.P_postalCodeData[0].City);
        // console.log(this.P_postalCodeData[0].State);
        // console.log(this.P_postalCodeData[0].Country);
        //  this.P = this.P_postalCodeData[0].City
        // console.log(this.P);

        this.addCustomerForm.get(['customer', 'permanent_address', 'city'])?.setValue(this.P_postalCodeData[0].City);
        this.addCustomerForm.get(['customer', 'permanent_address', 'state'])?.setValue(this.P_postalCodeData[0].State);
        this.addCustomerForm.get(['customer', 'permanent_address', 'country'])?.setValue(this.P_postalCodeData[0].Country);

      }
      else if (this.postalCodes[0].Status == 'Error') {
        this.postalMsg = this.postalCodes[0].Message;
        //  console.log(this.postalCodes[0].Message);
        this.postalError = true;
        this.addCustomerForm.get(['customer', 'permanent_address', 'city'])?.setValue('');
        this.addCustomerForm.get(['customer', 'permanent_address', 'state'])?.setValue('');
        this.addCustomerForm.get(['customer', 'permanent_address', 'country'])?.setValue('');
      }
      else {
        this.postalError = false;
      }
    })
  }

  //For secondary customer current  address
  onChangeSecondaryCustomer(value: number) {
    //  console.log(value);
    this.mainService.getPostalCodes(value).subscribe((result) => {
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

        // console.log(this.P_postalCodeData[0].City);
        // console.log(this.P_postalCodeData[0].State);
        // console.log(this.P_postalCodeData[0].Country);
        //  this.P = this.P_postalCodeData[0].City
        // console.log(this.P);
        this.addCustomerForm.get(['secondaryContact', 'current_address', 'city'])?.setValue(this.P_postalCodeData[0].City);
        this.addCustomerForm.get(['secondaryContact', 'current_address', 'state'])?.setValue(this.P_postalCodeData[0].State);
        this.addCustomerForm.get(['secondaryContact', 'current_address', 'country'])?.setValue(this.P_postalCodeData[0].Country);

      }
      else if (this.postalCodes[0].Status == 'Error') {
        this.postalMsg = this.postalCodes[0].Message;
        // console.log(this.postalCodes[0].Message);
        this.postalError = true;
        this.addCustomerForm.get(['secondaryContact', 'current_address', 'city'])?.setValue('');
        this.addCustomerForm.get(['secondaryContact', 'current_address', 'state'])?.setValue('');
        this.addCustomerForm.get(['secondaryContact', 'current_address', 'country'])?.setValue('');
      }
      else {
        this.postalError = false;
      }
    })
  }

  //For secondary customer permanent address
  onChangeSecondaryCustomerPermanent(value: number) {
    // console.log(value);
    this.mainService.getPostalCodes(value).subscribe((result) => {
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
        //console.log(this.P_postalCodeData)
        // console.log(this.P_postalCodeData[0].State);
        // console.log(this.P_postalCodeData[0].Country);
        //  this.P = this.P_postalCodeData[0].City
        // console.log(this.P);

        this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'city'])?.setValue(this.P_postalCodeData[0].City);
        this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'state'])?.setValue(this.P_postalCodeData[0].State);
        this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'country'])?.setValue(this.P_postalCodeData[0].Country);

      }
      else if (this.postalCodes[0].Status == 'Error') {
        this.postalMsg = this.postalCodes[0].Message;
        //console.log(this.postalCodes[0].Message);
        this.postalError = true;
        this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'city'])?.setValue('');
        this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'state'])?.setValue('');
        this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'country'])?.setValue('');
      }
      else {
        this.postalError = false;
      }
    })
  }



  ngOnInit(): void {
    this.GetPaymentVia();
    let id = this.route.snapshot.paramMap.get('id');
    this.LeadId = id;
    if (this.LeadId != null) {
      console.log("if part");
      this.addCustomerForm.get(['customer', 'lead_id'])?.setValue(this.LeadId);
      this.mainService.getLead(this.LeadId).subscribe(result => {
        console.log(result);
        
        this.leadData = result;
        console.log(this.leadData.lead)
        this.Phone = this.leadData.lead.phone;
        this.FirstName = this.leadData.lead.first_name;
        this.MiddleName = this.leadData.lead.middle_name;
        this.LastName = this.leadData.lead.last_name;
        this.LeadName = this.FirstName + ' ' + this.MiddleName + ' ' + this.LastName;
        //  console.log(this.LeadName);
        //  console.log(this.Phone);
        this.PrebookingData = this.leadData.lead.Pre_Bookings;
        // console.log(this.PrebookingData,'addadawdw');
        this.PrebookingData.forEach((data: any) => {
          if (data.offer) {
            for (let i of data.offer) {
              this.newPrebookingData.push({
                flatname: data.Property,
                paymentType: data.payment_type,
                offerName: i.name,
                commitment: data.commitment
              })
            }
          }
          else {
            this.newPrebookingData.push({
              flatname: data.Property,
              paymentType: data.payment_type,
              offerName: null,
              commitment: data.commitment
            })
          }
          this.prebookings.push({
            id: data.id,
            leadid: data.lead_id,
            Price: data.finalized_property_price,
            Payment_type: data.payment_type,
            PropertyId: data.property_id,
            Commitment: data.commitment
          })

        });
       
      },
        err => {
          console.log(err);
        })
    }
    else {
      console.log("else part");

    }
  }
  

  //checked address for primary customer
  selectAddress(e: any) {
    if (e.checked == true) {
      this.P_Address = this.Address;
      this.P_PostalCode = this.PostalCode;
      this.P_City = this.City;
      this.P_State = this.State;
      this.P_Country = this.Country;
      this.addCustomerForm.get(['customer', 'permanent_address', 'address'])?.setValue(this.P_Address);
      this.addCustomerForm.get(['customer', 'permanent_address', 'postal_code'])?.setValue(this.P_PostalCode);
      this.addCustomerForm.get(['customer', 'permanent_address', 'city'])?.setValue(this.P_City);
      this.addCustomerForm.get(['customer', 'permanent_address', 'state'])?.setValue(this.P_State);
      this.addCustomerForm.get(['customer', 'permanent_address', 'country'])?.setValue(this.P_Country);
    }
    else {
      this.P_Address = "";
      this.P_PostalCode = "";
      this.P_City = "";
      this.P_State = "";
      this.P_Country = "";
      this.addCustomerForm.get(['customer', 'permanent_address', 'address'])?.setValue(null);
      this.addCustomerForm.get(['customer', 'permanent_address', 'postal_code'])?.setValue(null);
      this.addCustomerForm.get(['customer', 'permanent_address', 'city'])?.setValue(null);
      this.addCustomerForm.get(['customer', 'permanent_address', 'state'])?.setValue(null);
      this.addCustomerForm.get(['customer', 'permanent_address', 'country'])?.setValue(null);
    }
  }

  //checked address for secondary customer
  selectSecondaryAddress(e: any) {
    if (e.checked == true) {
      this.S_Address = this.Address1;
      this.S_PostalCode = this.PostalCode1;
      this.S_City = this.City1;
      this.S_State = this.State1;
      this.S_Country = this.Country1;
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'address'])?.setValue(this.S_Address);
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'postal_code'])?.setValue(this.S_PostalCode);
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'city'])?.setValue(this.S_City);
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'state'])?.setValue(this.S_State);
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'country'])?.setValue(this.S_Country);
    }
    else {
      this.S_Address = "";
      this.S_PostalCode = "";
      this.S_City = "";
      this.S_State = "";
      this.S_Country = "";
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'address'])?.setValue(null);
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'postal_code'])?.setValue(null);
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'city'])?.setValue(null);
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'state'])?.setValue(null);
      this.addCustomerForm.get(['secondaryContact', 'permanent_address', 'country'])?.setValue(null);
    }
  }
  // console.log( checkPaymentType);
  viewPreBookings() {
    // this.PrebookingData
    // console.log(this.LeadId);
    this.mainService.getLead(this.LeadId).subscribe(result => {
      this.leadData = result;
      this.PrebookingData = this.leadData.lead.Pre_Bookings;
      console.log(this.PrebookingData);
      // console.log(this.leadData);
      // this.PrebookingData = this.leadData.lead.Pre_Bookings;
      this.PrebookingData.forEach((data: any) => {
        if (data.offer) {
          for (let i of data.offer) {
            this.newPrebookingData.push({
              flatname: data.Property,
              paymentType: data.payment_type,
              offerName: i.name,
              commitment: data.commitment
            })
          }
        }
        else {
          this.newPrebookingData.push({
            flatname: data.Property,
            paymentType: data.payment_type,
            offerName: null,
            commitment: data.commitment
          })
        }
        this.prebookings.push({
          id: data.id,
          leadid: data.lead_id,
          Price: data.finalized_property_price,
          Payment_type: data.payment_type,
          PropertyId: data.property_id,
          Commitment: data.commitment
        })
        
      });
      
      
      const dialogRef = this.dialog.open(ViewPreBookingsComponent, {
        width: '450px',
        data: { prebooking: this.PrebookingData }
        
      });
      // console.log(this.PrebookingData);
      
      
      // this.checkPaymentType = this.PreBook.payment_type;
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        
        this.showProperty = "none";
        this.showPreBooking = "";
        this.Prebookings = result;
        this.PreBookingId = this.Prebookings.PID;
        this.Prebooking = this.Prebookings.Prebookings;
        this.mainService.getPreBooking(this.PreBookingId).subscribe((result) => {
          this.Prebooking = result;
          this.PreBook = this.Prebooking.preBooking;
          console.log(this.PreBook);
          this.PropertyDetails = this.PreBook.Property;
          this.ProjectDetails = this.PropertyDetails.Project;
          // Prebooking Data Show in Front after closing Dialog box or choosin prebooking
          this.Project_Id = this.ProjectDetails.id;
          this.PropertyTypeId = this.PreBook.Property.property_type_id;
          this.PropertyId = this.PreBook.property_id;
          this.PropertyNumber = this.PreBook.Property.number;
          this.PreBookingPaymentType = this.PreBook.payment_type;
          this.PreBookingOfferId = this.PreBook.offer[0].id;
          this.PreBookingOfferName = this.PreBook.offer[0].name;
          this.FinalizedPrice = this.PreBook.finalized_property_price;
          this.PreBookingCommitment = this.PreBook.commitment;
          this.addCustomerForm.get(['property', 'project_id'])?.setValue(this.Project_Id);
          this.addCustomerForm.get(['property', 'property_type_id'])?.setValue(this.PropertyTypeId);
          this.addCustomerForm.get(['property', 'property_id'])?.setValue(this.PropertyId);
          this.addCustomerForm.get(['property', 'payment_type'])?.setValue(this.PreBookingPaymentType);
          this.addCustomerForm.get(['property', 'commitment'])?.setValue(this.PreBookingCommitment);
          this.addCustomerForm.get(['property', 'offer'])?.setValue(this.PreBookingOfferId);
          this.addCustomerForm.get(['property', 'finalized_property_price'])?.setValue(this.FinalizedPrice);
          this.addCustomerForm.get(['property', 'finalized_property_price'])?.setValue(this.FinalizedPrice);

          // Prebooking Data Show in Front after closing Dialog box or choosin pre ooking

        },
          err => {
            console.log(err);
          })
      });
    })
  }

  // console.log(checkPaymentType);
  newBooking() {
    const dialogRef = this.dialog.open(PrebookingComponent, {
      
      width: '600px', height: '500px',
      
      data: {}
    });
    
    // this.checkPaymentTypen = this.NewPreBookString.payment_type
    // console.log(this.checkPaymentTypen);
    
    dialogRef.afterClosed().subscribe(result => {
      this.showProperty = "none";
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

      this.addCustomerForm.get(['property', 'project_id'])?.setValue(this.Project_Id);
      this.addCustomerForm.get(['property', 'property_type_id'])?.setValue(this.PropertyTypeId);
      this.addCustomerForm.get(['property', 'property_id'])?.setValue(this.PropertyId);
      this.addCustomerForm.get(['property', 'payment_type'])?.setValue(this.PreBookingPaymentType);
      this.addCustomerForm.get(['property', 'commitment'])?.setValue(this.PreBookingCommitment);
      this.addCustomerForm.get(['property', 'offer'])?.setValue(this.PreBookingOfferId);
      this.addCustomerForm.get(['property', 'finalized_property_price'])?.setValue(this.FinalizedPrice);
      
    },
      err => {
        console.log(err);
      });
  }

  changeEvent(c: any) {
    this.show_paymentOptions = "";
  }

  openNameField() {

    const dialogRef = this.dialog.open(NameFieldComponent, {
      data: {
        fNm: this.fName,
        mNm: this.mName,
        lNm: this.lName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.nameString = result;
      this.fName = this.nameString.fname ? this.nameString.fname : '';
      this.mName = this.nameString.mname ? this.nameString.mname : '';
      this.lName = this.nameString.lname ? this.nameString.lname : '';
      this.dialogValue = result.data;
      this.addCustomerForm.get(['customer', 'first_name'])?.setValue(this.fName);
      this.addCustomerForm.get(['customer', 'middle_name'])?.setValue(this.mName);
      this.addCustomerForm.get(['customer', 'last_name'])?.setValue(this.lName);
      this.FullName = this.fName + ' ' + this.mName + ' ' + this.lName;
    });
  }


  openSecondaryNameField() {
    const dialogRef = this.dialog.open(NameFieldComponent, {
      data: {
        fNm: this.Sec_fName,
        mNm: this.Sec_mName,
        lNm: this.Sec_lName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.nameString = result;
      this.Sec_fName = this.nameString.fname ? this.nameString.fname : '';
      this.Sec_mName = this.nameString.mname ? this.nameString.mname : '';
      this.Sec_lName = this.nameString.lname ? this.nameString.lname : '';
      this.dialogValue = result.data;
      this.addCustomerForm.get(['secondaryContact', 'first_name'])?.setValue(this.Sec_fName);
      this.addCustomerForm.get(['secondaryContact', 'middle_name'])?.setValue(this.Sec_mName);
      this.addCustomerForm.get(['secondaryContact', 'last_name'])?.setValue(this.Sec_lName);
      this.SecondaryFullName = this.Sec_fName + ' ' + this.Sec_mName + ' ' + this.Sec_lName;
    });
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

  deleteImgSecondary(index: number) {
    //console.log(index);
    this.imagesSecondary.splice(index, 1)
    this.filesToUploadSecondary = Array.from(this.filesToUploadSecondary).filter(
      item => {
        return item != this.filesToUploadSecondary[index]
      })
    console.log(this.imagesSecondary);

  }

  readURL(e: any, index: any) {
    const files = e.target.files;
    const control = this.addCustomerForm.controls.customer.get('documents');
    console.log(control);
    for (let i = 0; i <= files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = reader.result + '';
        console.log(base64);
      };
      console.log(reader.readAsDataURL(files[i]));

      reader.readAsDataURL(e.target.files[i]);
    }
    
    
    
    this.indexForImages = index;


    for (let i = 0; i < e.target.files.length; i++) {
      let selectedFile = e.target.files[i];


      this.filesToUpload.push(selectedFile);


      var fileName = selectedFile.name;
      var ext = fileName.split('.').pop();
      let img = { url: '', name: fileName, index: this.indexForImages };


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

  readURLSecondaryCustomer(e: any) {
    //  console.log(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      let selectedFile = e.target.files[i];
      this.filesToUploadSecondary.push(selectedFile);
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

      this.imagesSecondary.push(img);
      // this.customerDocuments[0].images.push(img);
      console.log(this.images);

      reader.readAsDataURL(e.target.files[i]);

    }

  }

  GetPaymentType(e: any){
    console.log(e);
    this.PaymentTypeName = e.value.name
     {
      this.PreBookingPaymentType = this.property.payment_type;
      
      if (this.PreBookingPaymentType || this.newPrebookingData.PreBookingPaymentType =="Full" ) {
        this.showFullPayment = "flex";
        this.showInstallmentPayment = "none";
      }
      else  (this.PreBookingPaymentType || this.newPrebookingData.PreBookingPaymentType == "installment" ); {
        this.showInstallmentPayment = "flex";
        this.showFullPayment = "none";
      }
     
  
      this.addCustomerForm.get(['property', 'payment_type',])?.setValue(this.PaymentViaTypeName);
  
    
  };}

  GetPaymentVia() {
    this.mainService.getPaymentVia().subscribe(result => {
      this.PaymentVia = result;
      console.log(result);
      this.PayVia = this.PaymentVia.paymentVia;
      
      

    },
      err => {
        console.log(err);
      })
  }

  GetPaymentViaType(e: any) {
    console.log(e);


    this.PaymentViaTypeId = e.value.id;
    console.log(this.PaymentViaTypeId);
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

    this.addCustomerForm.get(['payment', 'payment_via', 'name'])?.setValue(this.PaymentViaTypeName);
    this.addCustomerForm.get(['payment', 'payment_via', 'id'])?.setValue(this.PaymentViaTypeId);

  }

  get document() {
    return this.addCustomerForm.get(['customer', 'document', 'type']) as FormArray;
  }
  itemFirst: any;
  submit(value: any) {

    console.log(value);

    // value.customer.lead_id == null || value.customer.lead_id == "" ? delete value.customer.lead_id : true;
    value.customer.lead_id = this.LeadId;
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
    
    value.customer.documents.forEach((data: any) => {
      console.log(data.images);
      data.images.forEach((item:any)=>{
        console.log(data.images.forEach);
        
        formData.append("primary"+data.type.replaceAll(' ','')+"files",item,item.name)
      })
    })
    formData.append('customer', JSON.stringify(value.customer));
    formData.append('secondaryContact', JSON.stringify(value.secondaryContact));
    formData.append('payment', JSON.stringify(value.payment));
    formData.append('property', JSON.stringify(value.property));
    console.log();
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

  }
}

function fullPayment() {
  throw new Error('Function not implemented.');
}
function InPayment() {
  throw new Error('Function not implemented.');
}

function otherWay() {
  throw new Error('Function not implemented.');
}

