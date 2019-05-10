import { Component, ViewChild, Input } from '@angular/core';
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


declare var $: any;
declare var google: any;

@Component({
  selector: 'app-people-created-chart',
  templateUrl: '../chart-template.html',
  styleUrls: ['./people-created-chart.component.css']
})
export class PeopleCreatedChartComponent extends ChartComponent {

  @Input() start: string = "2019-03-04";
  @Input() end: string = new Date().toISOString().split("T")[0];

  public chartData: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Week Start', '# of People Created']
    ],
    options: {
      title: 'People Created',
      width: 750,
      height: 400,
      series: {
        0: { color: '#26a65b' }
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
    this.chartData.dataTable = [
      ['Week Start', '# of People Created']
    ];
    var self = this;
    this.mainWeekService.getStat('people_created', this.start, this.end)
      .then(function (records) {
        records.forEach(record => {
          var array = [record.week_start, record.people_created];
          self.chartData.dataTable.push(array);
          self.loaded = true;
          console.log(self.chartData);
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBar.openSnackBar("Internal Server Error. Could not load helpdesk reads graph.", "OK");
      })
  }

}