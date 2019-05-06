import { Component, OnInit, Input } from '@angular/core';
import { MainWeekService } from 'src/app/main-week/main-week.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-overall-dashboard-component',
  templateUrl: './overall-dashboard-component.component.html',
  styleUrls: ['./overall-dashboard-component.component.css']
})
export class OverallDashboardComponentComponent implements OnInit {


  @Input() report;

  stats: {
    helpdesk_reads: 1,
    active_conversations: 1,
    people_created: 1,
    new_conversations: 1,
    conversations_assigned: 1,
    mean_rating: 1,
    answered_conversations:1,
  };
  changes = {
    helpdesk_reads: 1,
    people_created: 1,
    new_conversations: 1,
    conversations_assigned: 1,
    mean_rating: 1,
    active_conversations: 1,
    answered_conversations:1,
  };

  public loaded = true;

  constructor(private mainWeekService: MainWeekService, private snackBarService: SnackbarService,
    private conversationService:ConversationService) { }

  ngOnInit() {
    //console.log(this.report);
    this.loadData();
  }

  private async loadData() {
    var self = this;
     var p1 = this.mainWeekService.getLast(this.report.week, 2)
      .then(function (records) {
        console.log(records);
        self.stats = records[0];
        if (records[0].helpdesk_reads - records[1].helpdesk_reads < 0) self.changes.helpdesk_reads = -1;
        if (records[0].people_created - records[1].people_created < 0) self.changes.people_created = -1;
        if (records[0].new_conversations - records[1].new_conversations < 0) self.changes.new_conversations = -1;
        if (records[0].conversations_assigned - records[1].conversations_assigned < 0) self.changes.conversations_assigned = -1;
        if (records[0].mean_rating - records[1].mean_rating < 0) self.changes.mean_rating = -1;
        self.loaded = true;
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch data.", "OK");
      });

  
    this.conversationService.getActiveByWeek(self.report.prev_week, self.report.week_end)
    .then(function(result:any){
        self.stats.active_conversations = result[1].count;
        if (result[1].count < result[0].count) self.changes.active_conversations = -1;
    })
    .catch(function(error){
      console.log(error);
      self.snackBarService.openSnackBar("Internal Server Error. Could not fetch spec data.", "OK");
    })

    this.conversationService.getAnsweredByWeek(self.report.prev_week, self.report.week_end)
    .then(function(result:any){
        self.stats.answered_conversations = result[1].count;
        if (result[1].count < result[0].count) self.changes.answered_conversations = -1;
    })
    .catch(function(error){
      console.log(error);
      self.snackBarService.openSnackBar("Internal Server Error. Could not fetch spec data.", "OK");
    })
    


    this.loaded = true;
  }
}
