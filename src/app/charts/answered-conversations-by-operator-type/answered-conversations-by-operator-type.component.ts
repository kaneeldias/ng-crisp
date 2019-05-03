import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../chart-component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-answered-conversations-by-operator-type',
  templateUrl: '../chart-template.html',
  styleUrls: ['./answered-conversations-by-operator-type.component.css']
})
export class AnsweredConversationsByOperatorTypeComponent extends ChartComponent implements OnInit {

  @Input() start: string = "2019-03-04";
  @Input() end: string = new Date().toISOString().split("T")[0];

  public chartData: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Type', 'Answered Conversations']
    ],
    options: {
      title: 'Answered Conversations by Operator Groups',
      width: 750,
      height: 400,
      series: {
        0: { color: '#2e3131' },
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

  constructor(private conversationService: ConversationService, private snackBar: SnackbarService) {
    super();
  }

  ngOnInit() {
    super.setParams();
    var self = this;
    var mid = {};
    this.conversationService.getAnsweredByOperatorType(this.start, this.end)
      .then(function (records) {
        records.forEach(function(r:any){
          var arr = [r.type, r.count];
          self.chartData.dataTable.push(arr);
          self.loaded = true;
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBar.openSnackBar("Internal Server Error. Could not load answered conversations by operator type graph.", "OK");
      })
  }

}
