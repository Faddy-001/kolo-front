import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPropertyTypeComponent } from './project-property-type.component';
import { AddProjectPropertyTypeComponent } from './add-project-property-type/add-project-property-type.component';
import { EditProjectPropertyTypeComponent  } from './edit-project-property-type/edit-project-property-type.component';

const routes: Routes = [{ path: '', component: ProjectPropertyTypeComponent },
//{path: 'add-project-property-type', component: AddProjectPropertyTypeComponent},
//{path: 'edit-project-property-type/:id', component: EditProjectPropertyTypeComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectPropertyTypeRoutingModule { }
