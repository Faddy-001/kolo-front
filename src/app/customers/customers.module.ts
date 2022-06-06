import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MaterialModule } from '../material/material.module';
import {MatRadioModule} from '@angular/material/radio';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { ChartsModule } from 'ng2-charts';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ViewPaymentComponent } from './view-payment/view-payment.component';

// For MDB Angular Pro
// For MDB Angular Free
//import { EditOfferComponent } from './edit-offer/edit-offer.component';



@NgModule({
  declarations: [
    CustomersComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ViewCustomerComponent,
    ViewPaymentComponent
  

  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MaterialModule,
    MatExpansionModule,
    ChartsModule,

    MatCardModule,
    MatListModule,

    MatProgressSpinnerModule

  ]
})
export class CustomersModule { }
