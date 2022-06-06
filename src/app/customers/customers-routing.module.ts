import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';



const routes: Routes = [{ path: '', component: CustomersComponent },
{ path: 'add-customer', component: AddCustomerComponent },
{ path: 'add-customer/:id', component: AddCustomerComponent },
{ path: 'edit-customer/:id', component: EditCustomerComponent },
{ path: 'view-customer/:id', component: ViewCustomerComponent },
{ path: 'view-payment/:id', component: ViewCustomerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
