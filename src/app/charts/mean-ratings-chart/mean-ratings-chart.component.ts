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


declare var $: any;
declare var google: any;

@Component({
  selector: 'app-mean-ratings-chart',
  templateUrl: './mean-ratings-chart.component.html',
  styleUrls: ['./mean-ratings-chart.component.css']
})
export class MeanRatingsChartComponent {

  @Input() start: string = "2019-03-04";
  @Input() end: string = new Date().toISOString().split("T")[0];

  public meanRatingsChart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Week Start', 'Mean Rating']
    ],
    options: {
      title: 'Mean Rating',
      width: 750,
      height: 400,
      series: {
        0: { color: '#f7ca18' }
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

  }

  ngOnInit() {
    var self = this;
    this.mainWeekService.getStat('mean_rating', this.start, this.end)
      .then(function (records) {
        records.forEach(record => {
          var array = [record.week_start, record.mean_rating];
          self.meanRatingsChart.dataTable.push(array);
          self.loaded = true;
          console.log(self.meanRatingsChart);
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBar.openSnackBar("Internal Server Error. Could not load mean ratings graph.", "OK");
      })
  }


}
