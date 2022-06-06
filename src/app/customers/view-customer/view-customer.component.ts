import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MainService } from 'src/app/services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { PropertyComponent } from 'src/app/property/property.component';



@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
  
})
export class ViewCustomerComponent implements OnInit {
  ID: any;
  data: any;
  firstname: any;
  Customer: any;
  customerDetail: any;
  middlename: any;
  lastname: any;
  phone: any;
  fullname: any;
  gender: any;
  email: any;
  address: any;
  currentaddress: any;
  currentpincode: any;
  currentcity: any;
  currentstate: any;
  currentcountry: any;
  permanentaddress: any;
  permanentpincode: any;
  permanentcity: any;
  permanentstate: any;
  permanentcountry: any;
  documents: any;
  documentstype: any;
  documentstype1: any;
  secondarycustomerDetail: any;
  SecondaryCustomer: any;
  sfirstname: any;
  smiddlename: any;
  slastname: any;
  sphone: any;
  semail: any;
  sgender: any;
  scurrentpincode: any;
  scurrentstate: any;
  scurrentaddress: any;
  scurrentcity: any;
  spermanentaddress: any;
  scurrentcountry: any;
  spermanentcity: any;
  spermanentpincode: any;
  spermanentcountry: any;
  sdocumentstype: any;
  spermanentstate: any;
  srelation: any;
  property: any;
  project: any;
  projectName: any;
  propertyType: any;
  propertyName: any;
  finalPrice: any;
  propertynumber: any;
  offer: any;
  status: any;
  payament: any;
  commitment: any;
  propertyData: any;
  ptype: any;
  newPT: any = [];
  allpropertytype: any = [];
  spropertycustomerDetail: any;
  paymenttype: any;
  remaining: any;
  length: any;
  breadth: any;
  description: any;
  rate: any;
  area: any;
  protype: any;
  overdue: any;
  paytype: any;
  CustomerId:any;

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public doughnutChartLabels: Label[] = [['prop'], ['Drama'], 'Comedy'];
  public doughnutChartData: SingleDataSet = [30, 50, 20];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartPlugins = [];
  User: any;
  user: any;
  propertyCustomerDetail: any;
  secondaryCustomerDetail: any;

  
 



  constructor(private mainService: MainService, private route: ActivatedRoute, private router: Router) { monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend(); }
 
 

  ngOnInit(): void {
   
    // let id = this.route.snapshot.paramMap.get('id');
    // this.LeadId = id;
    // if (this.LeadId != null) {
    //   console.log("if part");
    //   this.addCustomerForm.get(['customer', 'lead_id'])?.setValue(this.LeadId);
    //   this.mainService.getLead(this.LeadId).subscribe(result => {
    //     this.leadData = result;
    //     console.log(this.leadData.lead)
    //     this.Phone = this.leadData.lead.phone;
    //     this.FirstName = this.leadData.lead.first_name;
    //     this.MiddleName = this.leadData.lead.middle_name;
    //     this.LastName = this.leadData.lead.last_name;
    //     this.LeadName = this.FirstName + ' ' + this.MiddleName + ' ' + this.LastName;

    let id = this.route.snapshot.paramMap.get('id');
    this.CustomerId = id;

    this.mainService.getCustomer(this.CustomerId ).subscribe((result) => {
      console.log(result);
      this.Customer = result;
      this.customerDetail = this.Customer.customer;
      this.firstname = this.customerDetail.first_name;
      this.middlename = this.customerDetail.middle_name;
      this.lastname = this.customerDetail.last_name;
      this.phone = this.customerDetail.phone;
      this.gender = this.customerDetail.gender;
      this.email = this.customerDetail.email;
      this.currentaddress = this.customerDetail.Addresses[0].address;
      this.currentpincode = this.customerDetail.Addresses[0].postal_code;
      this.currentcity = this.customerDetail.Addresses[0].city;
      this.currentstate = this.customerDetail.Addresses[0].state;
      this.currentcountry = this.customerDetail.Addresses[0].country;
      this.permanentaddress = this.customerDetail.Addresses[1].address;
      this.permanentpincode = this.customerDetail.Addresses[1].postal_code;
      this.permanentcity = this.customerDetail.Addresses[1].city;
      this.permanentstate = this.customerDetail.Addresses[1].state;
      this.permanentcountry = this.customerDetail.Addresses[1].country;
      // this.documentstype = this.customerDetail.Documents[0].type;
      // console.log(this.firstname);
      this.secondaryCustomerDetail = this.Customer.customer.Secondary_Contact;
       console.log(this.secondaryCustomerDetail);

      this.sfirstname = this.secondaryCustomerDetail.first_name;
      this.smiddlename = this.secondaryCustomerDetail.middle_name;
      this.slastname = this.secondaryCustomerDetail.last_name;
      this.sphone = this.secondaryCustomerDetail.phone;
      this.sgender = this.secondaryCustomerDetail.gender;
      this.semail = this.secondaryCustomerDetail.email;
      this.srelation = this.secondaryCustomerDetail.relation_with_customer;
      this.scurrentaddress = this.secondaryCustomerDetail.Addresses[0].address;
      console.log(this.scurrentaddress);
      this.scurrentpincode = this.secondaryCustomerDetail.Addresses[0].postal_code ? this.secondaryCustomerDetail.Addresses[0].postal_code : null;
      this.scurrentcity = this.secondaryCustomerDetail.Addresses[0].city ? this.secondaryCustomerDetail.Addresses[0].city : null;
      this.scurrentstate = this.secondaryCustomerDetail.Addresses[0].state ? this.secondaryCustomerDetail.Addresses[0].state : null;
      this.scurrentcountry = this.secondaryCustomerDetail.Addresses[0].country ? this.secondaryCustomerDetail.Addresses[0].country : null;
      this.spermanentaddress = this.secondaryCustomerDetail.Addresses[1].address;
      this.spermanentpincode = this.secondaryCustomerDetail.Addresses[1].postal_code ? this.secondaryCustomerDetail.Addresses[1].postal_code : null;
      
      this.spermanentcity = this.secondaryCustomerDetail.Addresses[1].city ? this.secondaryCustomerDetail.Addresses[1].city : null;
      this.spermanentstate = this.secondaryCustomerDetail.Addresses[1].state ? this.secondaryCustomerDetail.Addresses[1].state : null;
      this.spermanentcountry = this.secondaryCustomerDetail.Addresses[1].country ? this.secondaryCustomerDetail.Addresses[1].country : null;
      // this.sdocumentstype = this.secondaryCustomerDetail.Documents[0].Documents;
      // console.log(this.sdocumentstype);



      this.propertyCustomerDetail = this.Customer.customer.Customer_Properties[0];
      console.log( this.propertyCustomerDetail)
      // this.allpropertytype = result;
      // console.log( this.allpropertytype);
      this.allpropertytype = this.Customer.customer.Customer_Properties;
      //console.log(this.allpropertytype);


      // this.ptype=this.allpropertytype.PropertyType;
      // console.log( this.ptype);

      this.newPT = [];
      this.allpropertytype.forEach((data: any) => {
        this.newPT.push({


          
          number:data.Property.number,
          name:data.Property.name,
          project:data.Property.Project.name,
          type:data.Property.PropertyType.name,
          final: data.finalized_property_price,
       // payment:      data.Payments.receiving_amount,
          offer:data.offer,
          booking:data.status,
          commitment:data.commitment,
          payments:data.Payments,
         price:data.Property.price,
          // remaining:    data.Payments.remaining_amount,
          breadth:data.Property.breadth,
          length:data.Property.length,
          description:data.Property.description,
          rate:data.Property.rate_per_sq_ft,
          area:data.Property.property_size,
          paytype:data.payment_type,
          // user:data.Customer.customer.user_id,

        });


        //console.log( data.Payments);
      });






      this.property = this.propertyCustomerDetail.Property;
      this.project = this.propertyCustomerDetail.Property.Project;
      this.projectName = this.propertyCustomerDetail.Property.Project.name;
      this.propertyType = this.propertyCustomerDetail.Property.PropertyType.name;
      this.propertyName = this.propertyCustomerDetail.Property.name;
      this.finalPrice = this.propertyCustomerDetail.finalized_property_price;
      this.propertynumber = this.propertyCustomerDetail.Property.number;
      this.payament = this.propertyCustomerDetail.Payments[0] ? this.propertyCustomerDetail.Payments[0].receiving_amount : 100000;
      this.offer = this.propertyCustomerDetail.offer[0].name;
      this.status = this.propertyCustomerDetail.status;
      this.commitment = this.propertyCustomerDetail.commitment;
      this.remaining = this.propertyCustomerDetail.Payments[0].remaining_amount;
      this.length = this.propertyCustomerDetail.Property.length;
      this.breadth = this.propertyCustomerDetail.Property.breadth;
      this.description = this.propertyCustomerDetail.Property.description;
      this.rate = this.propertyCustomerDetail.Property.rate_per_sq_ft;
      this.area = this.propertyCustomerDetail.Property.property_size;
      this.paytype = this.propertyCustomerDetail.payment_type;
      // this.overdue=this.propertycustomerDetail.payment_type;

        //console.log(this.remaining);

      this.User = this.Customer.customer.user_id;

      // this.user = this.User.id;
      console.log( this.User)

 });
 

   }

}

