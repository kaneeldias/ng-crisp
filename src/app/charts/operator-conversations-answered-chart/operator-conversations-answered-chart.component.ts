import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../chart-component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-operator-conversations-answered-chart',
  templateUrl: '../chart-template.html',
  styleUrls: ['./operator-conversations-answered-chart.component.css']
})
export class OperatorConversationsAnsweredChartComponent extends ChartComponent implements OnInit {

  @Input() start:string;
  @Input() end:string;

  @Input() filter:[];

  public chartData: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Operator', 'Conversations Answered']
    ],
    options: {
      title: 'Conversations Answered by Operators',
      isStacked: true,
      width: 750,
      height: 400,
      series: {
        0: { color: '#26a65b', targetAxisIndex: 0 },
        1: { color: '#4183d7', targetAxisIndex: 0 },
        2: { color: '#abb7b7', targetAxisIndex: 0 }
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

  constructor(
    private conversationService:ConversationService, private snackBar:SnackbarService
  ) { super()}

  async ngOnInit() {
    super.setParams();
    this.chartData.dataTable = [
      ['Operator', 'Answered (assigned)', 'Answered (unassigned)', 'Unanswered',]
    ];

    var options = {
      filter:this.filter
    }

    var mid = {};
    var self = this;
    
    var p1 = this.conversationService.getActiveByOperator(this.start, this.end, options)
    .then(function(results){


      results.forEach(function(r:any){
        if(mid[r.name] == undefined){
          mid[r.name] = {
            active:0,
            answered_assigned:0,
            answered_unassigned:0
          }
        }
        mid[r.name].active += r.count;
      })
    })
    .catch(function(error){
      console.log(error);
      self.snackBar.openSnackBar("Internal Server Error. Cannot load conversations answered chart", "OK");
    })

    var p2 = this.conversationService.getAnsweredBreakdownByOperator(this.start, this.end, options)
    .then(function(results){  

      results.forEach(function(r:any){
        if(mid[r.name] == undefined){
          mid[r.name] = {
            active:0,
            answered_assigned:0,
            answered_unassigned:0
          }
        }
        mid[r.name].answered_assigned += r.assigned_answered;
        mid[r.name].answered_unassigned += r.unassigned_answered;
      })
    })
    .catch(function(error){
      console.log(error);
      self.snackBar.openSnackBar("Internal Server Error. Cannot load conversations answered chart", "OK");
    })

    await p1; await p2;
    console.log(mid);
    for(var name in mid){
      var x = [
        name,
        mid[name].answered_assigned,
        mid[name].answered_unassigned,
        mid[name].active - mid[name].answered_assigned
      ]
      self.chartData.dataTable.push(x);
    }

    self.loaded = true;

  }

}
