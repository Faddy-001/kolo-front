import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './offers.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { EditOfferComponent  } from './edit-offer/edit-offer.component';
import { ViewOfferComponent} from "./view-offer/view-offer.component";

const routes: Routes = [{ path: '', component: OffersComponent },
{path: 'add-offer', component: AddOfferComponent},
{path: 'edit-offer/:id', component: EditOfferComponent},
{path: 'view-offer/:id', component: ViewOfferComponent}    


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
