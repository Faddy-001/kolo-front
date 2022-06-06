import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './project-routing.module';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import {MatInputModule} from '@angular/material/input';
import { MaterialModule } from '../material/material.module';
import { DataTablesModule } from "angular-datatables";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {NgxPaginationModule} from 'ngx-pagination';

 
@NgModule({
  declarations: [
    ProjectsComponent,
    AddProjectDialogComponent,
    EditProjectDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProjectsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    DataTablesModule,
    CKEditorModule,
    NgxPaginationModule
  ]
})
export class ProjectsModule {
  constructor(){
    // console.log('projects module loaded!');
    
  }
 }
