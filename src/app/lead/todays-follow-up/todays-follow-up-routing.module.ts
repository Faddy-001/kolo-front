import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditLeadComponent } from '../edit-lead/edit-lead.component';
import { TodaysFollowUpComponent } from './todays-follow-up.component';

const routes: Routes = [
  { path: '', component: TodaysFollowUpComponent},
  { path: 'edit-lead/:id', component: EditLeadComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodaysFollowUpRoutingModule { }
