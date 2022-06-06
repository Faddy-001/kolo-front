import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { EditLeadComponent } from './edit-lead/edit-lead.component';
import { LeadComponent } from './lead.component';
import { DeactiveLeadsComponent } from "./deactive-leads/deactive-leads.component";
import { TodaysFollowUpComponent } from './todays-follow-up/todays-follow-up.component';

const routes: Routes = [{ path: '', component: LeadComponent
},
{path: 'add-lead', component: AddLeadComponent},
{path: 'edit-lead/:id', component:EditLeadComponent},
{path: 'deactive-leads', component:DeactiveLeadsComponent},
// {path: 'todays-follow-up', component:TodaysFollowUpComponent},
{path: 'uncalled-leads', loadChildren: () => import('./uncalled-leads/uncalled-lead.module').then(m => m.UncalledLeadModule)},
{path: 'todays-follow-up', loadChildren: () => import('./todays-follow-up/todays-follow-up.module').then(m => m.TodaysFollowUpModule)},
{path: 'deactive-leads', loadChildren: () => import('./deactive-leads/deactive-leads.module').then(m => m.DeactivateLeadModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})
export class LeadRoutingModule { }
