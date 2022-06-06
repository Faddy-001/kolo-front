import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditLeadComponent } from '../edit-lead/edit-lead.component';
import { UncalledLeadsComponent } from './uncalled-leads.component';

const routes: Routes = [
  { path: '', component: UncalledLeadsComponent},
  { path: 'edit-lead/:id', component: EditLeadComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UncalledLeadRoutingModule { }
