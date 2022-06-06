import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MaterialModule } from '../material/material.module';
import {MatRadioModule} from '@angular/material/radio';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    OffersComponent,
    AddOfferComponent,
    EditOfferComponent,
    ViewOfferComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    
  ]
})
export class OffersModule { }
