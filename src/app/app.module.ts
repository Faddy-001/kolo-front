import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjectsModule } from './projects/projects.module';
import { DeptModule } from "./dept/dept.module";
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from './lead/lead.module';
import {MatButtonModule} from '@angular/material/button';
import{HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { OffersModule } from './offers/offers.module';
import { ToastrModule } from 'ngx-toastr';
import {MatTabsModule} from '@angular/material/tabs';
import { PropertyTypeModule } from './property-type/property-type.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaginationPipe } from './custom_pipes/pagination.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChartsModule } from 'ng2-charts';


//import {MultiDatepickerModule} from './multidatepicker/multidatepicker.module';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    PaginationPipe,
    ForbiddenComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProjectsModule,
    DeptModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
    HttpClientModule,
    MatButtonModule,
    MatTabsModule,
    MatMenuModule,
    OffersModule,
    PropertyTypeModule,
    MatIconModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    ChartsModule,
 

    ToastrModule.forRoot({
      timeOut: 2500,
   }),
  ],
  
  //providers: [AuthGuard],  
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  
})
export class AppModule {
  constructor(){
    console.log('app module loaded!');
    
  }
 }
