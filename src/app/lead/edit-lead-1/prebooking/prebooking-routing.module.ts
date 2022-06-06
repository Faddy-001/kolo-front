import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrebookingComponent } from './prebooking.component';

const routes: Routes = [{ path: '', component: PrebookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrebookingRoutingModule { }
