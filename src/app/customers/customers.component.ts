import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { ToastrService } from 'ngx-toastr';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { formatNumber } from '@angular/common';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  ID: any;
  customer: any = []
  newCus: any = []
  cusList: any = []
  PropertyNumber: any = [];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 90;
  num: any = [];
  nn: string = "";
  x: any;
  res: any;
  getProperty: any = [];
  Finalized_Price: any;
  FinalPrice: any = [];
  test: any = [];

  constructor(private mainService: MainService, public dialog: MatDialog, private route: Router) { }

  go() {
    this.route.navigate(['/view-customer']); // navigate to other page
  }




  

  ngOnInit(): void {
    this.mainService.getCustomers().subscribe((result:any) => {
      this.customer = result
      console.log(result);
      
      this.newCus = this.customer.customers
      this.newCus.forEach((data: any) => {
        console.log(data.Customer_Properties[0].Property.number);
        this.cusList.push({
          id:data.id,
          fName: data.first_name,
          mName: data.middle_name,
          lName: data.last_name,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          alternatePhone: data.alternate_phone,
          AllProperty: data.Customer_Properties,
          
          propertyNumber:data.Customer_Properties[0].Property.number,
          // allProperty:data.Customer_Properties.Property.number,
          // paymentType:data.payment_type,
          // paymentType:data.payment_type,
          // Property_number:data.property_number,
          // allProperty: data.customer_Property,
          // Property_number:data.property_number
          //  finalPrice:data.property.finalized_property_price,
          
          
          
          
          
          percentage:50,
        })
      });
      console.log(this.cusList);
      

      //  this.test = [];
      //   this.test = data.Customer_Properties;
      //   console.log(this.test);
      //   this.test.forEach((data: any) => {
      //   this.FinalPrice.push({
      //    //   FinalizedPrice: data.finalized_property_price,
      //    FinalizedPrice:Number(data.finalized_property_price).toLocaleString('en-IN')

      //     })
      //     console.log(this.FinalPrice);


      //   });


      const mapp = this.cusList.map((data: any) => {
        return data.AllProperty

      })
      //console.log(mapp);

      this.getProperty = mapp.map((data: any) => {
        data.map((data: any) => {
          return data.Payments;

        });
      })

      // console.log(this.getProperty);


      //    const properties =  mapp.map((data:any)=>{
      //       return data;

      //     })
      //  console.log(properties);
      // const getProp =  properties.map((data:any)=>{
      //    return data;

      //  })

      //  getProp.map((data:any)=>{
      //    console.log(data.id);

      //  })

    })


  }



}
