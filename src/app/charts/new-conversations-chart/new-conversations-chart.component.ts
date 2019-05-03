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
import { ChartComponent } from '../chart-component';

@Component({
  selector: 'app-new-conversations-chart',
  templateUrl: '../chart-template.html',
  styleUrls: ['./new-conversations-chart.component.css']
})
export class NewConversationsChartComponent extends ChartComponent implements OnInit {

  @Input() start: string = "2019-03-04";
  @Input() end: string = new Date().toISOString().split("T")[0];

  public chartData: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Week Start', 'New Conversations']
    ],
    options: {
      title: 'New Conversations',
      width: 750,
      height: 400,
      series: {
        0: { color: '#8e44ad' }
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

  constructor(private db: AngularFirestore, private mainWeekService: MainWeekService, private snackBar: SnackbarService) {
    super();
  }

  ngOnInit() {
    super.setParams();
    var self = this;
    this.mainWeekService.getStat('new_conversations', this.start, this.end)
      .then(function (records) {
        records.forEach(record => {
          var array = [record.week_start, record.new_conversations];
          self.chartData.dataTable.push(array);
          self.loaded = true;
          console.log(self.chartData);
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBar.openSnackBar("Internal Server Error. Could not load new conversations graph.", "OK");
      })
  }
}
