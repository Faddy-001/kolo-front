import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyTypeRoutingModule } from './property-type-routing.module';
import { PropertyTypeComponent } from './property-type.component';
import { AddPropertyTypeComponent } from './add-property-type/add-property-type.component';
import { EditPropertyTypeComponent } from './edit-property-type/edit-property-type.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    PropertyTypeComponent,
    AddPropertyTypeComponent,
    EditPropertyTypeComponent
  ],
  imports: [
    CommonModule,
    PropertyTypeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PropertyTypeModule { }
