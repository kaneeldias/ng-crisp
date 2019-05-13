import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../chart-component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { RatingsService } from 'src/app/ratings/ratings.service';

@Component({
  selector: 'app-ratings-chart',
  templateUrl: '../chart-template.html',
  styleUrls: ['./ratings-chart.component.css']
})
export class RatingsChartComponent extends ChartComponent implements OnInit {
  @Input() start: string = "2019-03-04";
  @Input() end: string = new Date().toISOString().split("T")[0];
  @Input() filter:[];

  public chartData: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Week Start', '# of Rated Conversations', 'Mean Rating']
    ],
    options: {
      title: 'Ratings',
      width: 750,
      height: 400,
      series: {   
        0: { color: '#26a65b', targetAxisIndex:1},
        1: { color: '#f7ca18', type:'line', targetAxisIndex:0 }
      },
      vAxes: {
        0: {logScale: false, minValue: 0, maxValue:5},
        1: {logScale: false, baselineColor: '#fff', gridlineColor: '#fff',textPosition: 'none'  }
      },
      chartArea: {
        width: '85%',
        left: 70
      },
      legend: 'top',
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

  constructor(private ratingsService: RatingsService, private snackBar: SnackbarService) {
    super();
  }

  async ngOnInit() {
    super.setParams();
    this.chartData.dataTable = [
      ['Week Start', '# of Rated Conversations', 'Mean Rating']
    ]
    var self = this;
    var mid = {};
    var options = {
      filter:self.filter
    }
    
    var p1 = this.ratingsService.getByWeek(this.start, this.end, options)
      .then(function (records) {
        records.forEach(function(r:any){
          var arr = [
            r.week, r.count, r.average
          ];
          self.chartData.dataTable.push(arr);
          self.loaded = true;
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBar.openSnackBar("Internal Server Error. Could not load ratings graph.", "OK");
      })
  }


}
