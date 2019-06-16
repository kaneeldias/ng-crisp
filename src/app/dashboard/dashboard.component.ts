import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { MainWeek } from '../main-week';
import { MainWeekService } from '../main-week/main-week.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { ConversationService } from '../conversation/conversation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public report = {
    week: "",
    week_end: "",
    prev_week: "",
    start: "2019-03-04",
    end: "2019-04-15"
  };

  public weeks = [];

  public tabs = {
    overall: false,
    gst: false,
    entity: false,
    other:false
  }

  public loaded = false;

  constructor(private db: AngularFirestore, private mainWeekService: MainWeekService, private snackBarService: SnackbarService,
    private conversationService: ConversationService) { }

  ngOnInit() {

    var self = this;
    this.report.week = new Date().toISOString().split("T")[0];
    this.mainWeekService.getLast(this.report.week, 1000)
      .then(function (records: any) {
        records.forEach(function (record: any) {
          self.weeks.push(record.week_start);
        })
        self.report.week = records[0].week_start;
        self.report.end = self.report.week;
        self.report.start = new Date().toISOString().split("T")[0];
        var start = new Date(self.report.end);
        start.setDate(start.getDate() - 28);
        self.report.start = start.toISOString().split("T")[0];

        var week_end = new Date(self.report.week);
        week_end.setDate(week_end.getDate() + 6);
        self.report.week_end = week_end.toISOString().split("T")[0];


        var d = new Date(self.report.week);
        self.report.prev_week = new Date(d.setDate(d.getDate() - 7)).toISOString().split("T")[0];
        console.log(self.report);
        self.loaded = true;
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch date data.", "OK");
      });

  }

  tabChange(index: number) {
    if (index === 1) {
      this.tabs.overall = true;
    }
    if (index === 2) {
      this.tabs.gst = true;
    }
    if (index === 3) {
      this.tabs.entity = true;
    }

    if (index === 3) {
      this.tabs.other = true;
    }
  }

  weekChange() {
    var week = this.report.week;
    var date = new Date(week);
    var week_end = new Date(date.setDate(date.getDate() + 6)).toISOString().split("T")[0];
    var end = week;
    var start = new Date(end);
    start.setDate(start.getDate() - 28);
    var start_s = start.toISOString().split("T")[0];
    date = new Date(week);
    var prev_week = new Date(date.setDate(date.getDate() - 7)).toISOString().split("T")[0];

    this.report = {
      week:week,
      start:start_s,
      end:end,
      week_end:week_end,
      prev_week:prev_week
    }

  }

}
