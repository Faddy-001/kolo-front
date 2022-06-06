import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
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
  { path: 'forbidden', component: ForbiddenComponent },
  {
 
  path:'layout',
  component: LayoutComponent,
  children: [ 
    
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    // { path: 'customer', loadChildren: () => import('./customers/customers.module').then(m=> m.CustomersModule)},
    { path:'master/project', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),canActivate: [AuthGuard, PermissionGuard],
    data:{
      expectedFeatures:['Projects']
    }
},
 { path: 'master/department', loadChildren: () => import('./dept/dept.module').then(m => m.DeptModule),canActivate: [AuthGuard, PermissionGuard],
 data:{
  expectedFeatures:['Departments']
}},

 { path: 'lead/lead', loadChildren: () => import('./lead/lead.module').then(m => m.LeadModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Leads']
}

},
 { path: 'master/role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule),canActivate: [AuthGuard, PermissionGuard],
 data:{
  expectedFeatures:['Roles']
}},
 { path: 'master/user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Users']
}},
 { path: 'master/offer', loadChildren: () => import('./offers/offers.module').then(m => m.OffersModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Offers']
}},
 { path: 'collection/customer', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Customers']
}},
 { path: 'lead/profession', loadChildren: () => import('./profession/profession.module').then(m => m.ProfessionModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Professions']
}},
 { path: 'master/property_type', loadChildren: () => import('./property-type/property-type.module').then(m => m.PropertyTypeModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Property Types']
}},
{ path: 'master/project_property_type', loadChildren: () => import('./project-property-type/project-property-type.module').then(m => m.ProjectPropertyTypeModule),canActivate: [AuthGuard,PermissionGuard],
data:{
  expectedFeatures:['Project Property Types']
} },
{ path: 'lead/pre_booking', loadChildren: () => import('./lead/edit-lead/prebooking/prebooking.module').then(m => m.PrebookingModule),canActivate: [AuthGuard,PermissionGuard],
data:{
expectedFeatures:['Pre Bookings']
} },
 { path: 'master/property', loadChildren: () => import('./property/property.module').then(m => m.PropertyModule),canActivate: [AuthGuard,PermissionGuard],
 data:{
  expectedFeatures:['Properties']
}
 },
 
  
]

 
  },
  
  
  
  
 
  
];

@NgModule({
 
  // imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: AuthGuard, useClass: AuthGuard }]
})
export class AppRoutingModule { }
