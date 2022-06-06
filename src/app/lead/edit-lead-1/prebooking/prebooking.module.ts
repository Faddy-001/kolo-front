import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrebookingRoutingModule } from './prebooking-routing.module';
import { PrebookingComponent } from './prebooking.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { MaterialModule } from 'src/app/material/material.module';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    PrebookingComponent
  ],
  imports: [
    CommonModule,
    PrebookingRoutingModule,
    MaterialModule,
    MatInputModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class PrebookingModule { }
