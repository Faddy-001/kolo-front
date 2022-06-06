import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MaterialModule } from '../material/material.module';
import { ProfessionRoutingModule } from './profession-routing.module';
import { ProfessionComponent } from './profession.component';
import { AddProfessionComponent } from './add-profession/add-profession.component';
import { EditProfessionComponent } from './edit-profession/edit-profession.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    ProfessionComponent,
    AddProfessionComponent,
    EditProfessionComponent
  ],
  imports: [
    CommonModule,
    ProfessionRoutingModule,
    MatInputModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ProfessionModule { 
  constructor(){
  console.log('professions module loaded!');
  
}
}
