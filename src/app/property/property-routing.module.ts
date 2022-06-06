import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PropertyComponent } from './property.component';
import { ViewPropertyComponent } from './view-property/view-property.component';

const routes: Routes = [{ path: '', component: PropertyComponent },
{path: 'add-property', component: AddPropertyComponent},
{path: 'edit-property', component: EditPropertyComponent},
{path: 'view-property', component: ViewPropertyComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
