import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
const moment = _moment

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },

};

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }

  ]
})
export class EditOfferComponent implements OnInit {
  selectYes: boolean = false;
  selectNo: boolean = false;
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
  valueText: string = "";
  hide = true;
  editOfferForm!: FormGroup;
  count: any;
  id: any;
  offerId: any;
  OfferDetails: any = [];
  OfferDetail: any = [];
  offer_giveaway:string="none";
  projectData: any;
  projects: any;
  applicable_toshow_project: string = "none";
  EditofferResult: any;
  properties: any;
  Properties_type_Data: any;
  ProjectID: any;
  project_show: any;
  applicableOnPropertyTypeIds: any = [];
  applicableOnPropertyTypeName: any = [];
  applicablePropertyType: any;
  disabled: boolean = true;
  new1p: any = []
  projectPropertyType: any = [];
  oneprojects: any;
  oneproject: any;
  projectName: string = "";
  pp: any;
  data: any;
  errorMsg: any;
  startDate: any;
  sDate: any = null;
  getEndDate: boolean = true;
  endDate: any;
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
  applicableOnProperty: any;
  newArr: any = [];
  selectedProperty: any = []
  getPermission:any;
  logindata:any;
  userId:any;
  userProjects:any;
  userProjectId:any;
  propertyTypeIds: any = [];
  searchData:any;
  colSize: number = 3;
  showofferDesc: string = "";
  showofferPrice: string = "";

  constructor(private formbuilder: FormBuilder, private mainService: MainService,
    private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.editOfferForm = this.formbuilder.group({
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
      applicable_on_property: [null]
    })
  }

  deleteProperty(index: number) {
    let propertyIndex = this.applicableOnProperty.map(function (f:any) { return f.id }).indexOf(index);
    this.applicableOnProperty.forEach((data:any,ind:any)=>{
      if(this.applicableOnProperty.indexOf(data) == index)
      this.applicableOnProperty.splice(index, 1)
    })
  }

  deleteSelectedProperty(index: number){
    if(this.selectedProperty != undefined){
        this.selectedProperty.forEach((data:any,ind:any)=>{
          if(this.selectedProperty.indexOf(data) == index)
          this.selectedProperty.splice(index,1)
        })
    }
    this.PropertyId.splice(index, 1);
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
      this.Project_Id = this.ProjectId ? this.ProjectId : this.ProjectID;
      this.Property_type_value = this.PropertyTypeValue ? this.PropertyTypeValue : this.propertyTypeIds;
      this.mainService.getSearchPropertyOffer(this.Project_Id, this.Property_type_value, this.searchData).subscribe((result) => {
        this.Properties = result;
        this.PropertyData = this.Properties.properties;
        if (this.PropertyData == null || this.PropertyData == '') {
          this.noRecords = true;
        }
      })
    }
  }


  // search_Property(e: any) {
  //   console.log(e.target.value);
  //   let searchData = e.target.value;
  //   if (searchData == '') {
  //     this.isProperty = false;
  //     this.noRecords = false;
  //   }
  //   else {
  //     console.log("hello");
      
  //     this.mainService.getOffer(this.offerId).subscribe((res:any)=>{
  //       console.log(res);
        
  //       if(res.offer.applicable_on_property_type != null){
         
          
  //        this.Project_Id = res.offer.applicable_on_project_id
  //        console.log(this.Project_Id);
  //       this.isProperty = true;
  //       let propertyTypeArr =  res.offer.applicable_on_property_type.map((el:any)=>{
  //         return el.id
  //       })
       
  //       if(this.PropertyTypeValue != undefined){
  //         propertyTypeArr = this.PropertyTypeValue
  //       }
  //       this.mainService.getSearchPropertyOffer(this.Project_Id, propertyTypeArr, searchData).subscribe((result) => {
  //         this.Properties = result;
  //         this.PropertyData = this.Properties.properties;
  //         for(let i=0; i<this.applicableOnProperty.length; i++){
  //           for(let j=0;j<this.PropertyData.length;j++){
  //             if(this.applicableOnProperty[i].number == this.PropertyData[j].number){
  //             }
  //             else{
  //             }
  //           }
  //         }
        
  //         if (this.PropertyData == null || this.PropertyData == '') {
  //           this.noRecords = true;
  //           this.isProperty = false;
  //         }
  //       })
  //       }
  //     })
  //   }
  // }

  GetSearchProperty(id: any) {
    let PropertyId = id;
      this.editOfferForm.get('applicable_on_property')?.setValue(PropertyId);
      this.isProperty = false;
      this.mainService.getProperty(PropertyId).subscribe((result) => {
        this.Property = result;
        this.onePropertyData = this.Property.property;
        this.PropertyName = this.onePropertyData.number;  
      })
  }

  getDefaultProperty: any = [];
  PropertyId: any = [];
  PropertyNumber: any;

  clearvalue(event:any)
  {
    this.new1p=[];
    this.searchData='';
  }

  GetSearchPPT(e: any) {
    let propertyId = parseInt(e.target.value);
    if(e.target.checked == true){
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
      // this.mainService.getProperty(e.target.value).subscribe((result) => {
      //   this.Property = result;
      //   this.onePropertyData = this.Property.property;
      //   this.PropertyNumber = this.onePropertyData.number;
      // })
    }
    else {
      let propertyIndex = this.selectedProperty.map(function (f: any) { return f.id }).indexOf(propertyId);
      this.selectedProperty.splice(propertyIndex, 1);
       var indexofID = this.PropertyId.map(function (f: any) { return f.id; }).indexOf(propertyId);
       this.PropertyId.splice(indexofID, 1);
    }
    // this.editOfferForm.get('applicable_on_property')?.setValue(this.PropertyId);
    //this.getDefaultProperty = this.applicableOnProperty.map((el:any)=>{
     // return el.id
   // })
  }

  ngOnInit(): void {
    this.getProjects();
    this.getProperties_type();
    this.offer_type = "block";
    
    let id = this.route.snapshot.paramMap.get('id');
    this.offerId = id;
    this.mainService.getOffer(this.offerId).subscribe(result => {
      this.OfferDetails = result;
      
      
      this.OfferDetail = this.OfferDetails.offer;
     
      this.ProjectID = this.OfferDetail.applicable_on_project_id;
      if (this.ProjectID != null) {
        this.applicablePropertyType = this.OfferDetail.applicable_on_property_type
        switch (this.OfferDetail.type) {
          case "Area Wise":
            this.showofferlbl = "Area Wise";
            break;
          case "Product Giveaway":
            this.showofferlbl = "Product Name";
            this.offer_giveaway = 'block';
            this.colSize = 4;
            break;
          case "Direct Discount(in Rs)":
            this.showofferlbl = "Direct Discount(in Rs)"
            break;
          case "Direct Discount(in Percentage)":
            this.showofferlbl = "Direct Discount(in Percentage)";
            break;
          case "Lucky Draw":
            this.showofferlbl = "Lucky Draw";
            break;
          default:
            break;
        }

        this.mainService.getProject(this.ProjectID).subscribe((result) => {
          this.oneprojects = result
          this.oneproject = this.oneprojects.project
          this.projectName = this.oneproject.name
          this.projectPropertyType = this.oneproject.PropertyTypes
          
          this.projectPropertyType.forEach((data: any) => {
            this.new1p.push({
              id: data.id,
              name: data.name
            })
            this.propertyTypeIds.push(data.id)
          });
        })

        if (this.OfferDetail.applicable_on_property_type != null) {
          this.OfferDetail.applicable_on_property_type.forEach((propertyType: { id: any; }) => {
            this.applicableOnPropertyTypeIds.push(propertyType.id);
          });
        }
        

        this.editOfferForm = this.formbuilder.group({
          name: [this.OfferDetail.name, Validators.required],
          type: [this.OfferDetail.type, Validators.required],
          benefit: [this.OfferDetail.benefit, Validators.required],
          product_description: [this.OfferDetail.product_description, Validators.required],
          product_price: [this.OfferDetail.product_price, Validators.required],
          start_date: [moment(this.OfferDetail.start_date, "DD/MM/YYYY")],
          end_date: [moment(this.OfferDetail.end_date, "DD/MM/YYYY")],
          counts: [this.OfferDetail.counts],
          applicable_on_payment_type: this.OfferDetail.applicable_on_payment_type ? this.OfferDetail.applicable_on_payment_type : "",
          applicable_on_project_id: [this.OfferDetail.applicable_on_project_id],
          applicable_on_property_type: [this.applicableOnPropertyTypeIds],
          applicable_on_property: [''],
        });
        this.applicableOnProperty=this.OfferDetail.applicable_on_property;;
        this.endDate = moment(this.OfferDetail.end_date, "DD/MM/YYYY");
        this.startDate = moment(this.OfferDetail.start_date, "DD/MM/YYYY");
        if (this.endDate != null || this.endDate == '') {
          this.getEndDate = false;
        }
        this.project_show = this.OfferDetail.applicable_on_project_id;
        if (this.project_show != null) {
          this.selectYes = true;
          this.applicable_toshow_project = "";
        }
        else {
          this.selectNo = true;
          this.applicable_toshow_project = "none";
        }
      }

      else {

        switch (this.OfferDetail.type) {
          case "Area Wise":
            this.showofferlbl = "Area Wise";
            break;
          case "Product Giveaway":
            this.showofferlbl = "Product Name";
           
            break;
          case "Direct Discount(in Rs)":
            this.showofferlbl = "Direct Discount(in Rs)"
            break;
          case "Direct Discount(in Percentage)":
            this.showofferlbl = "Direct Discount(in Percentage)";
            break;
          case "Lucky Draw":
            this.showofferlbl = "Lucky Draw";
            break;
          default:
            break;
        }
        this.editOfferForm = this.formbuilder.group({
          name: [this.OfferDetail.name, Validators.required],
          type: [this.OfferDetail.type, Validators.required],
          benefit: [this.OfferDetail.benefit, Validators.required],
          product_description: [this.OfferDetail.product_description, Validators.required],
          product_price: [this.OfferDetail.product_price, Validators.required],
          start_date: [moment(this.OfferDetail.start_date, "DD/MM/YYYY")],
          end_date: [moment(this.OfferDetail.end_date, "DD/MM/YYYY")],
          counts: [this.OfferDetail.counts],
          applicable_on_payment_type: this.OfferDetail.applicable_on_payment_type ? this.OfferDetail.applicable_on_payment_type : "",
          applicable_on_project_id: [this.OfferDetail.applicable_on_project_id],
          applicable_on_property_type: [this.applicableOnPropertyTypeIds],
          applicable_on_property: [this.OfferDetail.applicable_on_property],
        });
        this.applicableOnProperty = this.OfferDetail.applicable_on_property;

        this.endDate = this.OfferDetail.end_date;
        this.startDate = this.OfferDetail.start_date;
        if (this.endDate != null || this.endDate == '') {
          this.getEndDate = false;
        }
        this.project_show = this.OfferDetail.applicable_on_project_id;
        if (this.project_show != null) {
          this.selectYes = true;
          this.applicable_toshow_project = "";
        }
        else {
          this.selectNo = true;
          this.applicable_toshow_project = "none";
        }

      }
    },
      err => {
        console.log(err);
      })
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

  changeEvent(c: any) {
    this.applicable_toshow_project = "";
  }

  changeEvent1(c: any) {
    this.PropertyData = [];
    this.selectedProperty = [];
    this.applicableOnProperty = [];
    this.PropertyId = [];
    this.applicable_toshow_project = "none";
    this.editOfferForm.get('applicable_on_project_id')?.setValue(null)
    this.editOfferForm.get('applicable_on_property_type')?.setValue(null);
    this.editOfferForm.get('applicable_on_property')?.setValue(null);
  }

  GetProject(e: any) {
    this.PropertyData = [];
    this.selectedProperty = [];
    this.applicableOnProperty = [];
    this.PropertyId = [];
    this.new1p = [];
    this.editOfferForm.get('applicable_on_property_type')?.setValue(null)
    this.editOfferForm.get('applicable_on_property')?.setValue(null)
    this.mainService.getProject(e.value).subscribe((result) => {
      this.oneprojects = result
      this.oneproject = this.oneprojects.project
      this.ProjectId = this.oneproject.id
      this.projectName = this.oneproject.name
      this.projectPropertyType = this.oneproject.PropertyTypes
      this.projectPropertyType.forEach((data: any) => {
        this.new1p.push({
          id: data.id,
          name: data.name
        })
      });
    })
  }

  getProjects() {
    this.getPermission = localStorage.getItem('user_info')
    this.logindata = JSON.parse(this.getPermission)
    this.userId = this.logindata.id;
    if (this.logindata.role == 'Super Admin' || this.logindata.role == 'Admin') 
    {
        this.mainService.getProjects().subscribe((res)=>{
        this.projectData = res;
        this.projects = this.projectData.projects;
      })      
    } 
    else
     {
     // this.projectData = this.logindata.project   
      this.mainService.getUser(this.userId).subscribe((res:any)=>{
        this.projects = res.projects;
      //  this.projects = this.userProjects.map((el:any)=>{
      //  return el.id
     // })
    })
    }    





    // this.mainService.getProjects().subscribe(result => {
    //   this.projectData = result;
    //   this.projects = this.projectData.projects;
    // },
    //   err => {
    //     console.log(err);
    //   })
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

  deleteValue(event:any)
  {
   
   // const benefitField = this.addOfferForm.get('benefit');
    this.editOfferForm.get('benefit')?.setValue(null);
    this.editOfferForm.get('product_description')?.setValue(null);
    this.editOfferForm.get('benefiproduct_pricet')?.setValue(null);
  //  this.addOfferForm.get('applicable_on_project_id')?.setValue(null)
  //  benefitField?.clearValidators();
  
    
  }
  getPriceAndDesc()
  {
    const offerControl = this.editOfferForm.get('type');
  }
  GetOfferType(e: any) {
    const benefitField = this.editOfferForm.get('benefit');
    const descField = this.editOfferForm.get('product_description');
    const productPrice = this.editOfferForm.get('product_price');
    this.editOfferForm.get('benefit')?.setValue(null);
    this.editOfferForm.get('product_description')?.setValue(null);
    this.editOfferForm.get('product_price')?.setValue(null);
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
      this.offer_type = "block";
      this.offer_giveaway ="block";
      this.showofferDesc = "Product Description:";
      this.showofferPrice = "Product Price:";
      this.colSize = 4;
      benefitField?.setValidators([Validators.required])
      descField?.setValidators([Validators.required])
      productPrice?.setValidators([Validators.pattern("^[0-9.]*$")])
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

  editData: any;
  
  
  submit(value: any) {
    console.log(value);
    if (value.applicable_on_payment_type == "") {
      value.applicable_on_payment_type = null
    }
    if(value.name==null||value.name=="" ||value.benefit==null||value.benefit=="" || value.type==null||value.type==""||value.product_price==null||value.product_price=="" ||value.product_description==null||value.product_description=="")
    {
      return ;
    }
    let id = this.route.snapshot.paramMap.get('id');
    this.offerId = id;
    if (this.applicableOnProperty != null) {
      this.getDefaultProperty = this.applicableOnProperty.map((el: any) => {
        return el.id
      })
    }
    let newArr = this.getDefaultProperty.concat(this.PropertyId)
    var strArr = newArr.map(function (e: any) { return e.toString() });
    let uniqueChars = [...new Set(strArr)];
    value.applicable_on_property = uniqueChars
    if (value.applicable_on_property_type == null || value.applicable_on_property_type.length == 0) {
      value.applicable_on_property_type = null;
    }
    if (value.applicable_on_property.length == 0) {
      value.applicable_on_property = null;
    }
    this.mainService.updateOffer(this.offerId, value).subscribe((result) => {
      this.EditofferResult = result;
      this.toastr.success(this.EditofferResult.message);
      this.router.navigateByUrl('/layout/master/offer');
    }, err => {
      this.data = err;
      this.errorMsg = this.data.error.error.name;
      this.toastr.error(this.errorMsg)
    })
    // }
    // else
    // {
    //   this.mainService.updateOffer(this.offerId, value).subscribe((result) => {
    //     this.EditofferResult = result;
    //     this.toastr.success(this.EditofferResult.message);
    //     this.router.navigateByUrl('/layout/master/offer');
    //   }, err => {
    //     this.data = err;
    //     this.errorMsg = this.data.error.error.name;
    //     this.toastr.error(this.errorMsg)
    //   })
    // }
  }
}
