import { Component, ViewChild, Input } from '@angular/core';
import {
  ChartReadyEvent, ChartErrorEvent, ChartSelectEvent,
  ChartMouseOverEvent, ChartMouseOutEvent
} from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


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
      series:{
        0: {color:'#f7ca18'}
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

  constructor(private db: AngularFirestore) {

  }

  ngOnInit() {
    var records: Observable<any[]> = this.db.collection('main-record', ref => ref
      .where('week_start', '>=', this.start)
      .where('week_start', '<=', this.end)
      .orderBy('week_start', 'desc')
    )
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return { id, ...data };
        })
      }));

    var sub = records.subscribe(records => {
      records.forEach(record => {
        var array = [record.week_start, record.mean_rating];
        this.meanRatingsChart.dataTable.splice(1, 0, array);

      })
      this.loaded = true;
      console.log(this.meanRatingsChart);
      sub.unsubscribe();
    })


  }


}