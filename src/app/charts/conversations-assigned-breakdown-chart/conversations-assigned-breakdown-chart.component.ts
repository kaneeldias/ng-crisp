import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {
  ChartReadyEvent, ChartErrorEvent, ChartSelectEvent,
  ChartMouseOverEvent, ChartMouseOutEvent
} from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { MainWeekService } from 'src/app/main-week/main-week.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { ConversationService } from 'src/app/conversation/conversation.service';
@Component({
  selector: 'app-conversations-assigned-breakdown-chart',
  templateUrl: '../chart-template.html',
  styleUrls: ['./conversations-assigned-breakdown-chart.component.css']
})
export class ConversationsAssignedBreakdownChartComponent implements OnInit {

  @Input() start: string = "2019-03-04";
  @Input() end: string = new Date().toISOString().split("T")[0];

  public chartData: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Week Start', 'Entities', 'GST', 'Other']
    ],
    options: {
      title: 'Assigned Conversations Breakdown',
      width: 750,
      height: 400,
      series: {
        0: { color: 'purple' }
      },
      chartArea: {
        width: '85%',
        left: 70
      },
      legend: 'none',
      hAxis: {
        format: "YYYY-MM-dd",
        groupByRowLabel: true,
        gridlines: {
          count: -1
        }
      },
      lineWidth: 3,
      pointSize: 7,
      animation: {
        duration: 2000,
        easing: "out",
        startup: true
      }
    },
  };

  public loaded = false;

  constructor(private db: AngularFirestore, private conversationService:ConversationService, private snackBar: SnackbarService) {

  }

  ngOnInit() {
    
  }

}
