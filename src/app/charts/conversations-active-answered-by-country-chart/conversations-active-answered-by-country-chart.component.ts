import { Component, OnInit, Input } from '@angular/core';
import { ChartComponent } from '../chart-component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-conversations-active-answered-by-country-chart',
  templateUrl: '../chart-template.html',
  styleUrls: ['./conversations-active-answered-by-country-chart.component.css']
})
export class ConversationsActiveAnsweredByCountryChartComponent extends ChartComponent implements OnInit {

  @Input() start: string = "2019-03-04";
  @Input() end: string = new Date().toISOString().split("T")[0];
  @Input() filter: [];
  @Input() show: 1000;

  public chartData: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Country', 'Answered Conversations', 'Unanswered Conversations']
    ],
    options: {
      isStacked: true,
      title: 'Conversations by Country',
      width: 750,
      height: 400,
      series: {
        0: { color: '#26a65b', targetAxisIndex: 0 },
        1: { color: '#abb7b7', targetAxisIndex: 0 },
        2: { color: '#d91e18', targetAxisIndex: 1, type: 'line' }

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
      vAxes: {
        // Adds titles to each axis.

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
  public mid = {};

  constructor(private conversationService: ConversationService, private snackBarService: SnackbarService) {
    super();
  }

  async ngOnInit() {
    super.setParams();
    var self = this;
    this.mid = {};
    var options: any = this.chartData.options;
    options.chartArea.width = this.width - 100;

    var optionsX = {
      filter: this.filter
    }

    var p1 = this.conversationService.getActiveByCountry(this.start, this.end, optionsX)
      .then(function (records: any) {
        records.forEach(function (r) {
          if (self.mid[r.country] == undefined) self.mid[r.country] = [0, 0];
          self.mid[r.country][0] = r.count;
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch country active conversations data.", "OK");
      })

    await p1;
    var p2 = this.conversationService.getAnsweredByCountry(this.start, this.end, optionsX)
      .then(function (records: any) {
        records.forEach(function (r) {
          if (self.mid[r.country] == undefined) self.mid[r.country] = [0, 0];
          else self.mid[r.country][1] = r.count;
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch country answered conversations data.", "OK");
      })

    await p1;
    await p2;

    try {
      var records = [];
      for (var country in this.mid) {
        var active_convos = this.mid[country][0];
        var answered_convos = this.mid[country][1];
        var percentage = 0;
        if (active_convos != 0) percentage = answered_convos / active_convos;

        var obj = {
          country: country,
          active_conversations: active_convos,
          answered_conversations: answered_convos,
          answered_percentage: percentage
        }
        records.push(obj);
      }

      records.sort(function (a, b) {
        return a.active_conversations == b.active_conversations ? 0 : +(a.active_conversations < b.active_conversations) || -1;
      });

      var i = 0;
      this.chartData.dataTable = [ ['Country', 'Answered Conversations', 'Unanswered Conversations']];
      records.forEach(record => {
        if (record.country != "Unknown") {
          var array = [record.country, record.answered_conversations, record.active_conversations - record.answered_conversations];
          if (i < self.show) self.chartData.dataTable.push(array);
          i++;
        }
      })
      self.loaded = true;
      console.log(self.chartData);
    }
    catch (error) {
      console.log(error);
      self.snackBarService.openSnackBar("Error loading active & answered conversations by country graph", "OK");
    }

  }

  ngOnChanges() {
    if(this.loaded == false) return;
    this.loaded = false;
    this.ngOnInit();
  }


}

