import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { MainWeek } from '../main-week';
import { MainWeekService } from '../main-week/main-week.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public report = {
    start: "2019-03-04",
    end: "2019-04-15"
  };

  stats: MainWeek;
  changes = {
    helpdesk_reads: 1,
    people_created: 1,
    new_conversations: 1,
    conversations_assigned: 1,
    mean_rating: 1
  };

  public loaded = false;

  constructor(private db: AngularFirestore, private mainWeekService: MainWeekService, private snackBarService: SnackbarService) { }

  ngOnInit() {

    /*this.report.end = "2019-04-15";
    this.report.start = "2019-04-01";
    this.loaded = true;*/
    this.report.start = new Date().toISOString().split("T")[0];

    var self = this;
    this.mainWeekService.getLast(this.report.start, 2)
      .then(function (records) {
        console.log(records);
        self.report.end = records[0].week_start;
        var start = new Date(self.report.end);
        start.setDate(start.getDate() - 28);
        self.report.start = start.toISOString().split("T")[0];
        self.stats = records[0];
        if (records[0].helpdesk_reads - records[1].helpdesk_reads < 0) self.changes.helpdesk_reads = -1;
        if (records[0].people_created - records[1].people_created < 0) self.changes.people_created = -1;
        if (records[0].new_conversations - records[1].new_conversations < 0) self.changes.new_conversations = -1;
        if (records[0].conversations_assigned - records[1].conversations_assigned < 0) self.changes.conversations_assigned = -1;
        if (records[0].mean_rating - records[1].mean_rating < 0) self.changes.mean_rating = -1;

        //this.report.end = "2019-04-21";
        //this.report.start = "2019-04-01";

        //console.log(this.report.end);
        //console.log(this.report.start);
        self.loaded = true;
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch data.", "OK");
      });
  }

}
