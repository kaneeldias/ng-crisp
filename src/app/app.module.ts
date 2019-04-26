import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule, MatGridListModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatPaginator, MatPaginatorModule, MatSnackBarModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainAddComponentComponent } from './main-add-component/main-add-component.component';
import {MainViewComponent} from './main-view/main-view.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { HelpdeskReadsChartComponent } from './charts/helpdesk-reads-chart/helpdesk-reads-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PeopleCreatedChartComponent } from './charts/people-created-chart/people-created-chart.component';
import { MeanRatingsChartComponent } from './charts/mean-ratings-chart/mean-ratings-chart.component';
import { UploadMessagesComponent } from './upload/upload-messages/upload-messages.component';
import { PapaParseModule } from 'ngx-papaparse';
import { UploadOperatorsComponent } from './upload/upload-operators/upload-operators.component';
import { OperatorViewComponent } from './operator/operator-view/operator-view.component';
import { UploadConversationsComponent } from './upload/upload-conversations/upload-conversations.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    MainAddComponentComponent,
    MainViewComponent,
    HelpdeskReadsChartComponent,
    DashboardComponent,
    PeopleCreatedChartComponent,
    MeanRatingsChartComponent,
    UploadMessagesComponent,
    UploadOperatorsComponent,
    OperatorViewComponent,
    UploadConversationsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule, MatGridListModule,
    MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatPaginatorModule, MatSnackBarModule,
    Ng2GoogleChartsModule, PapaParseModule, HttpClientModule
    
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
