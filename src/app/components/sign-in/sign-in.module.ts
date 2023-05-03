import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateComponent } from './create/create.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AdminComponent } from './admin/admin.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import {MatIconModule} from '@angular/material/icon';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ApproveComponent } from './approve/approve.component';
import { ActiveUserComponent } from './active-user/active-user.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
   {path: '',component:SignInComponent},
  {path:'MainPage',component:MainPageComponent},
   {path:'Admin',component:AdminComponent},
   {path:'inactive',component:InactiveUsersComponent},


];

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    MainPageComponent,
    CreateComponent,
    EditTaskComponent,
    AdminComponent,
    CreateAdminComponent,
    EditAdminComponent,
    ResetPasswordComponent,
    ApproveComponent,
    ActiveUserComponent,
    InactiveUsersComponent,
    
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    Ng2SearchPipeModule


  ]
})
export class SignInModule { }
