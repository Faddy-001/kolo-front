import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { PermissionGuard } from './permission.guard';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  {path:'forget-password', component:ForgetPasswordComponent},
  {path:'reset-password/:id', component:ResetPasswordComponent},
  {
 
  path:'layout',
  component: LayoutComponent,
  children: [ { path:'Master/Project', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),canActivate: [AuthGuard, PermissionGuard],
    data:{
      expectedFeatures:['Project']
    }
},
 { path: 'Master/department', loadChildren: () => import('./dept/dept.module').then(m => m.DeptModule),canActivate: [AuthGuard, PermissionGuard],
 data:{
  expectedFeatures:['department']
}},
 { path: 'Lead/leads', loadChildren: () => import('./lead/lead.module').then(m => m.LeadModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Lead']
}
},
 { path: 'Master/Role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule),canActivate: [AuthGuard, PermissionGuard],
 data:{
  expectedFeatures:['Role']
}},
 { path: 'Master/User', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['User']
}},
 { path: 'offers', loadChildren: () => import('./offers/offers.module').then(m => m.OffersModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['department']
}},
 { path: 'Collection/customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Customers']
}},
 { path: 'profession', loadChildren: () => import('./profession/profession.module').then(m => m.ProfessionModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['department']
}},
 { path: 'Master/property-type', loadChildren: () => import('./property-type/property-type.module').then(m => m.PropertyTypeModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['property-type']
}},
 { path: 'Master/project-property-type', loadChildren: () => import('./project-property-type/project-property-type.module').then(m => m.ProjectPropertyTypeModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['project-property-type']
} },
 { path: 'Prebooking', loadChildren: () => import('./lead/edit-lead/prebooking/prebooking.module').then(m => m.PrebookingModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['department']
} },
 { path: 'Master/Properties', loadChildren: () => import('./property/property.module').then(m => m.PropertyModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Properties']
}
 },
 ]

 
  },
  
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: AuthGuard, useClass: AuthGuard }]
})
export class AppRoutingModule { }
