import { Component, OnInit, Input } from '@angular/core';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartComponent } from '../chart-component';

@Component({
  selector: 'app-conversations-created-by-country-chart',
  templateUrl: '../chart-template.html',
  styleUrls: ['./conversations-created-by-country-chart.component.css']
})
export class ConversationsCreatedByCountryChartComponent extends ChartComponent implements OnInit {

  @Input() start: string;
  @Input() end: string;
  @Input() show: number = 1000;

  public chartData: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Country', 'Conversations Created']
    ],
    options: {
      title: 'Conversations created by country',
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

  constructor(private conversationService: ConversationService, private snackBarService: SnackbarService) {super() }

  ngOnInit() {
    super.setParams();
    this.chartData.dataTable = [
      ['Country', 'Conversations Created']
    ];

    var self = this;
    this.conversationService.getCreatedByCountry(this.start, this.end)
      .then(function (records: any) {
        var i = 0;
        records.sort(function (a, b) {
          return a.count == b.count ? 0 : +(a.count < b.count) || -1;
        });
        records.forEach(record => {
          if (record.country != "Unknown") {
            var array = [record.country, record.count];
            if (i < self.show) self.chartData.dataTable.push(array);
            i++;
          }
        })
        self.loaded = true;
        console.log(self.chartData);
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch country breakdown data.", "OK");
      })
  }

}
