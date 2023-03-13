import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IssueDisplayComponent } from './issue/issue-display/issue-display.component';
import { IssueCreateComponent } from './issue/issue-create/issue-create.component';
import { LoginComponent } from './auth/login/login/login.component';
import {Component} from '@angular/core';

const routes: Routes = [
  { path: '', component: IssueDisplayComponent },
  { path: 'add', component: IssueCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //(Bouchefra, 2018)
  exports: [RouterModule]
})


export class AppRoutingModule {}
