import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadRoutingModule } from './lead-routing.module';
import { LeadComponent } from './lead.component';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { FormsModule } from '@angular/forms';
import { EditLeadComponent } from './edit-lead/edit-lead.component';
import {CdTimerModule} from 'angular-cd-timer';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NameFieldComponent } from './add-lead/name-field/name-field.component';
import { DataTablesModule } from "angular-datatables";
import { FilterComponent } from './filter/filter.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivityLogComponent } from './edit-lead/activity-log/activity-log.component';
import { ProjectDescComponent } from './project-desc/project-desc.component';
import { EditnameFieldComponent } from './edit-lead/editname-field/editname-field.component';
import { ViewPreBookingsComponent } from './edit-lead/view-pre-bookings/view-pre-bookings.component';
import { DeactiveLeadsComponent } from './deactive-leads/deactive-leads.component';
import { UncalledLeadsComponent } from './uncalled-leads/uncalled-leads.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TodaysFollowUpComponent } from './todays-follow-up/todays-follow-up.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    LeadComponent,
    AddLeadComponent,
    EditLeadComponent,
    NameFieldComponent,
    FilterComponent,
    ActivityLogComponent,
    ProjectDescComponent,
    EditnameFieldComponent,
    ViewPreBookingsComponent,
    DeactiveLeadsComponent,
    UncalledLeadsComponent,
    TodaysFollowUpComponent,
    
   

  ],
  imports: [
    CommonModule,
    LeadRoutingModule,
    MaterialModule,
    FormsModule,
    CdTimerModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatTabsModule,
    MatTooltipModule,
    NgxPaginationModule,
  ]
})
export class LeadModule {
  constructor(){
    console.log('lead module loaded!');
    
  }
 }
