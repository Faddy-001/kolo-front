import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyRoutingModule } from './property-routing.module';
import { PropertyComponent } from './property.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MaterialModule } from '../material/material.module';
import { DataTablesModule } from "angular-datatables";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPropertyComponent } from './filter-property/filter-property.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    PropertyComponent,
    AddPropertyComponent,
    ViewPropertyComponent,
    EditPropertyComponent,
    FilterPropertyComponent
  ],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    DataTablesModule,
    CKEditorModule,
    FormsModule,
    NgxPaginationModule,
    MatTabsModule
  ]
})
export class PropertyModule { }
