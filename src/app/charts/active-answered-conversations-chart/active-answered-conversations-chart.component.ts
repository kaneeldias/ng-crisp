import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../chart-component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-active-answered-conversations-chart',
  templateUrl: '../chart-template.html',
  styleUrls: ['./active-answered-conversations-chart.component.css']
})
export class ActiveAnsweredConversationsChartComponent extends ChartComponent implements OnInit {
  @Input() start: string = "2019-03-04";
  @Input() end: string = new Date().toISOString().split("T")[0];
  @Input() filter:[];

  public chartData: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Week Start', 'Active Conversations', 'Answered Conversations']
    ],
    options: {
      title: 'Active & Answered Conversations',
      width: 750,
      height: 400,
      series: {
        0: { color: '#d91e18' },
        1: { color: '#26a65b' }
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

  constructor(private conversationService: ConversationService, private snackBar: SnackbarService) {
    super();
  }

  async ngOnInit() {
    super.setParams();
    this.chartData.dataTable = [
      ['Week Start', 'Active Conversations', 'Answered Conversations']
    ]
    var self = this;
    var mid = {};
    var options = {
      filter:self.filter
    }
    
    var p1 = this.conversationService.getActiveByWeek(this.start, this.end, options)
      .then(function (records) {
        records.forEach(function(r:any){
          if(mid[r.week] == undefined) mid[r.week] = [0, 0];
          mid[r.week][0] += r.count;
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBar.openSnackBar("Internal Server Error. Could not load active conversations graph.", "OK");
      })

    var p2 = this.conversationService.getAnsweredByWeek(this.start, this.end, options)
      .then(function (records) {
        records.forEach(function(r:any){
          if(mid[r.week] == undefined) mid[r.week] = [0, 0];
          mid[r.week][1] += r.count;
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBar.openSnackBar("Internal Server Error. Could not load active conversations graph.", "OK");
      })

      await p1; await p2;

      try{
        var records = [];
        for (var week in mid) {
          var active_convos = mid[week][0];
          var answered_convos = mid[week][1];
    
          var obj = {
            week:week,
            active_conversations: active_convos,
            answered_conversations: answered_convos,
          }
          records.push(obj);
        }
    
        records.sort(function (a, b) {
          return a.week == b.week ? 0 : +(a.week > b.week) || -1;
        });
    
        records.forEach(record => {
            var array = [record.week, record.active_conversations, record.answered_conversations];
            self.chartData.dataTable.push(array);        
        })
        self.loaded = true;
        console.log(self.chartData);
      }
      catch(error){
        console.log(error);
        self.snackBar.openSnackBar("Error loading active & answered conversations by country graph", "OK");
      }
  }


}
