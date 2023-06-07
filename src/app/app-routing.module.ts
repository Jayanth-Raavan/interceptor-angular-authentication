import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from './shared/auth.guard';
import { ListingComponent } from './listing/listing.component';
import { AddNewComponent } from './add-new/add-new.component';
// import { RoleGuard } from './shared/role.guard';
import { UserComponent } from './user/user.component';
import { EmployeeGuard } from './shared/employee.guard';
import { UserGuard } from './shared/user.guard';

const routes: Routes = [
  {path: '',component:HomeComponent,  canActivate:[AuthGuard]},
  {path:'user',component:UserComponent, canActivate:[UserGuard]},
  {path:'login',component:LoginComponent},
  {path:'customers',component: CustomerComponent,
  children:[
    {path:"",component: ListingComponent},
    {path:"create",component: AddNewComponent},
    {path:"edit/id",component: AddNewComponent},
    ], canActivate:[EmployeeGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
