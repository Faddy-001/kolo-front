import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserComponent } from './user.component';

const routes: Routes = [{ path: '', component: UserComponent },

{path: 'add-user', component: AddUserComponent},
{path: 'edit-user/:id', component: EditUserComponent},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
