

import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';



@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {
  selectedData: string = "";
  OfferName: string = "";
  name: string = "";
  type: string = "";
  benefit: string = "";
  start_date: string = "";
  end_date: string = "";
  applicable_on_project: string = "";
  applicable_on_property: string = "";
  applicable_on_property_type: string = "";
  showofferlbl: string = "";
  offer_type: string = "none";
  applicable_for_project: string = "";
  valueText: string = "";
  hide = true;
  addOfferForm!: FormGroup;
  count: any;
  disabled: boolean = true;
  getEndDate: boolean = true;
  projectData: any;
  projects: any;
  offerResult: any;
  properties: any;
  Properties_type_Data: any;
  new1p: any = []
  projectPropertyType: any = [];
  oneprojects: any;
  oneproject: any;
  projectName: string = "";
  data: any;
  errorMsg: any;
  date: Date | undefined;
  startDate: any;
  sDate: any = null;
  isProperty: boolean = false;
  noRecords: boolean = false;
  Properties: any = [];
  PropertyData: any;
  Project_Id: any;
  PropertyTypeValue: any;
  Property_type_value: any;
  ProjectId: any;
  Property: any;
  onePropertyData: any;
  PropertyName: any;
  PropertyNumber: any;
  selectedProperty: any = [];
  PropertyId: any = [];
  @ViewChildren("checkBox")
  checkBox!: QueryList<ElementRef>;
  isPropertyExist: boolean = false;
  getPermission: any;
  logindata: any;
  userId: any;
  userProjects: any;
  userProjectId: any;
  searchData: any;
  showListofProperty:string='block';
  checkedAll:boolean=false;
  offer_giveaway:string="none";
  counts: any;
  offerData: any;
  AllOffer:any="";
  OCounts:boolean=false;
  colSize: number = 3;
  showofferDesc: string = "";
  showofferPrice: string = "";


  constructor(private formbuilder: FormBuilder, private mainService: MainService, private route: Router, private toastr: ToastrService) {
    this.addOfferForm = this.formbuilder.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      benefit: [null, Validators.required],
      product_price:[null, Validators.required],
      product_description:[null, Validators.required],
      start_date: [null],
      end_date: [null],
      counts: [null],
      applicable_on_payment_type: [null],
      applicable_on_project_id: [null],
      applicable_on_property_type: [null],
      applicable_on_property: [null],
    })
  }


  ngOnInit(): void {
    this.getProjects();
    this.getProperties_type();
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    if (this.logindata.role == 'Super Admin' || this.logindata.role == 'Admin') {
      this.mainService.getProjects().subscribe((res) => {
        this.projects = res;
        this.projectData = this.projects.projects;
        this.userProjects = this.projectData;
      })
    }
    else {
      // this.projectData = this.logindata.project   
      this.mainService.getUser(this.userId).subscribe((res: any) => {
        this.userProjects = res.projects;
        this.userProjectId = this.userProjects.map((el: any) => {
          return el.id
        })
      })
    }

    // this.mainService.getUser(this.userId).subscribe((res:any)=>{
    //   this.userProjects = res.projects;
    //   this.userProjectId = this.userProjects.map((el:any)=>{
    //     return el.id
    //   })
    // })
  }


  clearvalue(event:any)
  {
    this.new1p=[];
    this.searchData='';
  }

  

  getStartDate(e: any) {
    this.getEndDate = false;
    this.startDate = e.value._d;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  offerForAll(event: any)
  {

    //this.OCounts = true; 
    if(event.checked)
    {
      //this.checkedAll = true;
      this.AllOffer= "";
      this.OCounts = true; 
     // this.AllOffer = this.projectData.length;
      // console.log(this.projectData.length);
      // console.log(event.checked);
    }
    else{
      this.OCounts = false; 
      this.AllOffer= "";
    }
  
  }
  GetSearchPPT(e: any) {
    let propertyId = parseInt(e.target.value);
    if (e.target.checked == true) {
      this.PropertyId.push(e.target.value)
      for (let i = 0; i < this.PropertyData.length; i++) {
        if (this.PropertyData[i].id == e.target.value) {
          this.selectedProperty.push({
            id: this.PropertyData[i].id,
            number: this.PropertyData[i].number
          })
          break;
        }
      }
      this.mainService.getProperty(e.target.value).subscribe((result) => {
        this.Property = result;
        this.onePropertyData = this.Property.property;
        this.PropertyNumber = this.onePropertyData.number;
      })
    }
    else {
      let propertyIndex = this.selectedProperty.map(function (f: any) { return f.id }).indexOf(propertyId);
      this.selectedProperty.splice(propertyIndex, 1);
      var indexofID = this.PropertyId.map(function (f: any) { return f.name; }).indexOf(this.PropertyNumber);
      this.PropertyId.splice(indexofID, 1);
    }
    this.addOfferForm.get('applicable_on_property')?.setValue(this.PropertyId);
  }

  deleteProperty(index: number) {
    this.selectedProperty.splice(index, 1);
  }


  GetSearchProperty(id: any) {
    let PropertyId = id;
    this.addOfferForm.get('applicable_on_property')?.setValue(PropertyId);
    this.isProperty = false;
    this.mainService.getProperty(PropertyId).subscribe((result) => {
      this.Property = result;
      this.onePropertyData = this.Property.property;
      this.PropertyName = this.onePropertyData.number;
    })
  }

 

  GetProject(e: any) {
    this.PropertyData = [];
    this.selectedProperty = [];
    this.PropertyId = [];
    this.new1p = [];
    this.addOfferForm.get('applicable_on_property_type')?.setValue(null)
    this.addOfferForm.get('applicable_on_property')?.setValue(null)
    this.mainService.getProject(e.value).subscribe((result) => {
      this.oneprojects = result
      this.oneproject = this.oneprojects.project
      this.ProjectId = this.oneproject.id
      this.projectName = this.oneproject.name
      this.projectPropertyType = this.oneproject.PropertyTypes
      $('.Projectbtn').html(this.projectName);
      $(".Projectbtn").prop("value", e.value);
      this.projectPropertyType.forEach((data: any) => {
        this.new1p.push({
          id: data.id,
          name: data.name
        })
      });
    })
  }


  getProjects() {
    this.mainService.getProjects().subscribe(result => {
      this.projectData = result;
      this.projects = this.projectData.projects;
    },
      err => {
        console.log(err);
      })
  }


  GetPropertyDetails(e: any) {
    this.PropertyTypeValue = e.value;
     }

  search_Property(e: any) {
    this.searchData = e.target.value;
    if (this.searchData == '') {
      this.isProperty = true;
      this.noRecords = false;
    }
    else {
      this.isProperty = true;
      this.Project_Id = this.ProjectId;
      this.Property_type_value = this.PropertyTypeValue;
      this.mainService.getSearchPropertyOffer(this.Project_Id, this.Property_type_value, this.searchData).subscribe((result) => {
        this.Properties = result;
        this.PropertyData = this.Properties.properties;
        if (this.PropertyData == null || this.PropertyData == '') {
          this.noRecords = true;
        }
      })
    }
  }


  getProperties_type() {
    this.mainService.getPropertyTypes().subscribe(result => {
      this.Properties_type_Data = result;
      this.properties = this.Properties_type_Data.propertyTypes;
    },
      err => {
        console.log(err);
      })
  }

  changeEvent(c: any) {
    this.applicable_for_project = "";
    
  }

  changeEvent1(c: any) {
    this.applicable_for_project = "none";
    this.addOfferForm.get('applicable_on_project_id')?.setValue(null)
  }


  // keyPress(event: any) {
  //   console.log(event);
    
  //   const pattern = /[0-9\ ]/;

  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }

  deleteValue(event:any)
  {
    const benefitField = this.addOfferForm.get('benefit');
    this.addOfferForm.get('benefit')?.setValue(undefined);
     if(this.addOfferForm.get('type')?.value == 'Product Giveaway'|| this.addOfferForm.get('type')?.value == 'Lucky Draw')
     {
       // benefitField?.clearValidators();
        benefitField?.setValidators([Validators.required]);
     }
  }

  GetOfferType(e: any) {
    const benefitField = this.addOfferForm.get('benefit');
    this.addOfferForm.get('benefit')?.setValue(null);
    if (e.value == "Area Wise") { 
      this.OfferName = e.value;
      this.showofferlbl = "Discount sq/ft (in Rs)";
      this.offer_type = "block";
      this.offer_giveaway ="none";
      this.colSize = 3;
      benefitField?.setValidators([Validators.pattern("^[0-9.]*$")])
    }
    else if (e.value == "Product Giveaway") {
      this.OfferName = e.value;
      this.showofferlbl = "Product Name:";
      this.showofferDesc = "Product Description:";
      this.showofferPrice = "Product Price:";
      this.offer_type = "block";
      this.offer_giveaway ="block";
      this.colSize = 4;
      benefitField?.setValidators([Validators.required])
    }
   
    else if (e.value == "Direct Discount(in Rs)") {
      this.OfferName = e.value;
      this.showofferlbl = "Discount (in Rs):";
      this.offer_type = "block";
      this.offer_giveaway ="none";
      this.colSize = 3;
      benefitField?.setValidators([Validators.pattern("^[0-9.]*$")])
    }
    else if (e.value == "Direct Discount(in Percentage)") {
      this.OfferName = e.value;
      this.showofferlbl = "Discount (in %):";
      this.offer_type = "block";
      this.offer_giveaway ="none";
      this.colSize = 3;
      benefitField?.setValidators([Validators.pattern("^[0-9.]*$")])
    }
    else if (e.value == "Lucky Draw") {
      this.OfferName = e.value;
      this.showofferlbl = "Coupon Number:";
      this.offer_type = "block";
      this.offer_giveaway ="none";
      this.colSize = 3;
      benefitField?.setValidators([Validators.required])
    }
    else {
      this.OfferName = e.value;
      this.offer_type = "none"
      this.offer_giveaway ="none";
      this.colSize = 3;
    }
  }
  submit(value: any) {
    value.applicable_on_payment_type == "" ? value.applicable_on_payment_type = null : value.applicable_on_payment_type = value.applicable_on_payment_type;
    this.mainService.addOffer(value).subscribe(result => {
      this.offerResult = result;
      this.toastr.success(this.offerResult.message);
      this.route.navigateByUrl('layout/master/offer');
    }, err => {
      this.data = err;
      this.errorMsg = this.data.error.error.name;
      this.toastr.error(this.errorMsg)
    })
  }
}
