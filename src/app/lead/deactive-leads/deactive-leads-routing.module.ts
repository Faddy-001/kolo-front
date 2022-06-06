import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditLeadComponent } from '../edit-lead/edit-lead.component';
import { DeactiveLeadsComponent } from './deactive-leads.component';


const routes: Routes = [
  { path: '', component: DeactiveLeadsComponent},
  { path: 'edit-lead/:id', component: EditLeadComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeActivateRoutingModule { }
