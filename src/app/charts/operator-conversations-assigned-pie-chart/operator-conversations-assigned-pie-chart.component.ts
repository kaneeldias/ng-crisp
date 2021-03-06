import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../chart-component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-operator-conversations-assigned-pie-chart',
  templateUrl: '../chart-template.html',
  styleUrls: ['./operator-conversations-assigned-pie-chart.component.css']
})
export class OperatorConversationsAssignedPieChartComponent extends ChartComponent implements OnInit {

  @Input() start:string;
  @Input() end:string;

  @Input() filter:[];

  public chartData: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Operator', 'Conversations Assigned']
    ],
    options: {
      title: 'Conversations Assigned by Operators',
      width: 750,
      height: 400,
      series: {
      },
      chartArea: {
        width: '85%',
        left: 70
      },
      legend: 'right',
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

  constructor(
    private conversationService:ConversationService, private snackBar:SnackbarService
  ) { super()}

  ngOnInit() {
    super.setParams();
    this.chartData.dataTable =  [
      ['Operator', 'Conversations Answered']
    ];

    var options = {
      filter:this.filter
    }
    var self = this;
    this.conversationService.getActiveByOperator(this.start, this.end, options)
    .then(function(results){

      results.sort(function(a:any, b:any){
        if(a.count < b.count) return 1;
        else return - 1;
      })

      results.forEach(function(r:any){
        var array = [r.name, r.count];
        self.chartData.dataTable.push(array);
      })
      self.loaded = true;
    })
    .catch(function(error){
      console.log(error);
      self.snackBar.openSnackBar("Internal Server Error. Cannot load conversations answered chart", "OK");
    })
  }

}
