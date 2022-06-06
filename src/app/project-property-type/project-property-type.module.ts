import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MaterialModule } from '../material/material.module';
import { ProjectPropertyTypeRoutingModule } from './project-property-type-routing.module';
import { ProjectPropertyTypeComponent } from './project-property-type.component';
import { AddProjectPropertyTypeComponent } from './add-project-property-type/add-project-property-type.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditProjectPropertyTypeComponent } from './edit-project-property-type/edit-project-property-type.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    ProjectPropertyTypeComponent,
    AddProjectPropertyTypeComponent,
    EditProjectPropertyTypeComponent,
  ],
  imports: [
    CommonModule,
    ProjectPropertyTypeRoutingModule,
    MaterialModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
    
  ]
})
export class ProjectPropertyTypeModule { 

}
