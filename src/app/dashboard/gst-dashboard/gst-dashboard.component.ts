import { Component, OnInit, Input } from '@angular/core';
import { OperatorService } from 'src/app/operator/operator.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { log } from 'util';

@Component({
  selector: 'app-gst-dashboard',
  templateUrl: './gst-dashboard.component.html',
  styleUrls: ['./gst-dashboard.component.css']
})
export class GstDashboardComponent implements OnInit {

  @Input() report;

  gst = [];

  loaded = false;

  stats = {
    conversations_answered:0,
    conversations_active:0,
    answered_percentage:0
  };
  changes = {
    conversations_answered:1,
    conversations_active:1,
    answered_percentage:1
  };

  constructor(private operatorService:OperatorService,
    private conversationService:ConversationService,
     private snackBarService:SnackbarService) { }

  async ngOnInit() {
    console.log(this.report);
    var self = this;
    var p1 = this.operatorService.getOfType("GST")
    .then(function(result:[]){
      result.forEach(function(operator:any){
        self.gst.push(operator.name);
      })
      self.loadData();
    })
    .catch(function(error){
      console.log(error);
      self.snackBarService.openSnackBar("Internal Server Error. Could not data", "OK");
    })

    await p1;

    this.loaded = true;
  }

  async loadData(){
    var self = this;
    var options = {
      filter:this.gst
    }
    var old = [0,0]
    var p1 = this.conversationService.getAnsweredByWeek(this.report.prev_week, this.report.week_end, options)
    .then(function(results:any){
      self.stats.conversations_answered = results[1].count;
      old[0] = results[0].count;
      if(results[1].count < results[0].count) self.changes.conversations_answered = -1;
    })
    .catch(function(error){
      console.log(error);
      self.snackBarService.openSnackBar("Internal Server Error. Could not data", "OK");
    })


    var p2 = this.conversationService.getActiveByWeek(this.report.prev_week, this.report.week_end, options)
    .then(function(results:any){
      self.stats.conversations_active = results[1].count;
      old[1] = results[0].count;
      if(results[1].count < results[0].count) self.changes.conversations_active = -1;
    })
    .catch(function(error){
      console.log(error);
      self.snackBarService.openSnackBar("Internal Server Error. Could not data", "OK");
    })

    await p1; await p2;
    var p = self.stats.conversations_answered / self.stats.conversations_active;
    var p_old = old[0]/old[1];
    if(p < p_old){
      self.changes.answered_percentage = -1;
    }

    self.stats.answered_percentage = Math.round((self.stats.conversations_answered / self.stats.conversations_active) * 10000)/100;
  }

}
