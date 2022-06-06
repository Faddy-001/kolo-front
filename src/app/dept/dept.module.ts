import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeptRoutingModule } from './dept-routing.module';
import { DeptComponent } from './dept.component';
import { AddDeptDialogComponent } from './add-dept-dialog/add-dept-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { EditDeptDialogComponent } from './edit-dept-dialog/edit-dept-dialog.component';
import { DataTablesModule } from 'angular-datatables';
import { DeleteDeptDialogComponent } from './delete-dept-dialog/delete-dept-dialog.component';
import { OrderModule } from 'ngx-order-pipe';
import { SortPipe } from '..//custom_pipes/sort.pipe';
import {NgxPaginationModule} from 'ngx-pagination';




@NgModule({
  declarations: [
    DeptComponent,
    AddDeptDialogComponent,
    EditDeptDialogComponent,
    DeleteDeptDialogComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    DeptRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    DataTablesModule.forRoot()
  ]
})
export class DeptModule { 
  constructor(){
  }
}
