import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule, MatGridListModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatPaginator, MatPaginatorModule, MatSnackBarModule, MatTabsModule, MatProgressSpinnerModule, MatSidenavModule, MatNavList, MatListModule, MatSelectModule} from '@angular/material';
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
import { NewConversationsChartComponent } from './charts/new-conversations-chart/new-conversations-chart.component';
import { ConversationsAssignedBreakdownChartComponent } from './charts/conversations-assigned-breakdown-chart/conversations-assigned-breakdown-chart.component';
import { ConversationsCreatedByCountryTableComponent } from './tables/conversations-created-by-country-table/conversations-created-by-country-table.component';
import { ConversationsCreatedByCountryChartComponent } from './charts/conversations-created-by-country-chart/conversations-created-by-country-chart.component';
import { ChartComponent } from './charts/chart-component';
import { ActiveConversationsChartComponent } from './charts/active-conversations-chart/active-conversations-chart.component';
import { ConversationsActiveAnsweredByCountryChartComponent } from './charts/conversations-active-answered-by-country-chart/conversations-active-answered-by-country-chart.component';
import { OverallDashboardComponentComponent } from './dashboard/overall-dashboard-component/overall-dashboard-component.component';
import { ActiveAnsweredConversationsChartComponent } from './charts/active-answered-conversations-chart/active-answered-conversations-chart.component';
import { AnsweredConversationsByOperatorTypeComponent } from './charts/answered-conversations-by-operator-type/answered-conversations-by-operator-type.component';
import { OperatorStatsTableComponent } from './tables/operator-stats-table/operator-stats-table.component';
import { GstDashboardComponent } from './dashboard/gst-dashboard/gst-dashboard.component';
import { OperatorConversationsAnsweredChartComponent } from './charts/operator-conversations-answered-chart/operator-conversations-answered-chart.component';
import { EntityDashboardComponent } from './dashboard/entity-dashboard/entity-dashboard.component';
import { OperatorConversationsAnsweredPieChartComponent } from './charts/operator-conversations-answered-pie-chart/operator-conversations-answered-pie-chart.component';
import { EditAssignedCountriesDialogComponent } from './dialogs/edit-assigned-countries-dialog/edit-assigned-countries-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { OperatorAssignedTableComponent } from './tables/operator-assigned-table/operator-assigned-table.component';




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
    UploadConversationsComponent,
    NewConversationsChartComponent,
    ConversationsAssignedBreakdownChartComponent,
    ConversationsCreatedByCountryTableComponent,
    ConversationsCreatedByCountryChartComponent,
    ActiveConversationsChartComponent,
    ConversationsActiveAnsweredByCountryChartComponent,
    OverallDashboardComponentComponent,
    ActiveAnsweredConversationsChartComponent,
    AnsweredConversationsByOperatorTypeComponent,
    OperatorStatsTableComponent,
    GstDashboardComponent,
    OperatorConversationsAnsweredChartComponent,
    EntityDashboardComponent,
    OperatorConversationsAnsweredPieChartComponent,
    EditAssignedCountriesDialogComponent,
    OperatorAssignedTableComponent,
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
    MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatPaginatorModule, MatSnackBarModule, MatTabsModule,
    MatProgressSpinnerModule, MatSidenavModule, MatListModule, MatDialogModule, MatSelectModule,
    Ng2GoogleChartsModule, PapaParseModule, HttpClientModule
    
  ],
  providers: [
    MatDatepickerModule
  ],
  entryComponents: [EditAssignedCountriesDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
