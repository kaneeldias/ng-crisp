import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainAddComponentComponent }      from './main-add-component/main-add-component.component';
import { MainViewComponent }      from './main-view/main-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadMessagesComponent } from './upload/upload-messages/upload-messages.component';
import { UploadOperatorsComponent } from './upload/upload-operators/upload-operators.component';
import { OperatorViewComponent } from './operator/operator-view/operator-view.component';
import { UploadConversationsComponent } from './upload/upload-conversations/upload-conversations.component';


const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'main', component:MainViewComponent},
  {path:'main/add', component:MainAddComponentComponent},
  { path: 'main/edit/:week_start', component: MainAddComponentComponent },
  { path: 'upload/messages', component:UploadMessagesComponent },
  { path: 'upload/operators', component:UploadOperatorsComponent },
  { path: 'upload/conversations', component:UploadConversationsComponent },
  { path: 'operators', component:OperatorViewComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
