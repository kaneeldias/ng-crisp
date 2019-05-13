import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { OperatorService } from 'src/app/operator/operator.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-operator-stats-table',
  templateUrl: './operator-stats-table.component.html',
  styleUrls: ['./operator-stats-table.component.css']
})
export class OperatorStatsTableComponent implements OnInit {

  @Input() start: string;
  @Input() end: string;
  @Input() perPage: number = 10;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() public filter = ['Belgium', 'Bangladesh'];
  displayedColumns: string[] = ['name', 'active', 'assigned_answered', 'unassigned_answered', 'conversations_answered'];
  public records = [];
  dataSource = new MatTableDataSource(this.records);

  public loaded = false;




  constructor(
    private conversationService: ConversationService,
    private snackBarService: SnackbarService,
    private operatorService: OperatorService
  ) { }

  async ngOnInit() {
    console.log(this.start);
    var self = this;
    var options = {
      filter: this.filter
    }
    self.records = [];
    var mid = {};
    var p1 = this.conversationService.getAnsweredByOperator(this.start, this.end, options)
      .then(function (results) {
        results.forEach(function (g: any) {
          if (mid[g.name] == undefined) {
            mid[g.name] = {
              name: g.name,
              active_conversations: 0,
              conversations_answered: 0,
              assigned_answered:0,
              unassigned_answered: 0
            }
          }
          var obj = {
            name: g.name,
            conversations_answered: g.count
          }
          mid[g.name].conversations_answered = g.count;
        })

      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch data.", "OK");
      })


    var p2 = this.conversationService.getActiveByOperator(this.start, this.end, options)
      .then(function (results) {
        results.forEach(function (g: any) {
          if (mid[g.name] == undefined) {
            mid[g.name] = {
              name: g.name,
              active_conversations: 0,
              conversations_answered: 0,
              assigned_answered:0,
              unassigned_answered: 0
            }
          }
          var obj = {
            name: g.name,
            conversations_answered: g.count
          }
          mid[g.name].active_conversations = g.count;
        })

      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch data.", "OK");
      })

    var p3 = this.conversationService.getAnsweredBreakdownByOperator(this.start, this.end, options)
      .then(function (results) {
        results.forEach(function (g: any) {
          if (mid[g.name] == undefined) {
            mid[g.name] = {
              name: g.name,
              active_conversations: 0,
              conversations_answered: 0,
              assigned_answered:0,
              unassigned_answered: 0
            }
          }
          mid[g.name].assigned_answered = g.assigned_answered;
          mid[g.name].unassigned_answered = g.unassigned_answered;
        })

      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch data.", "OK");
      })

    await p1; await p2; await p3;

    for (var name in mid) {
      var r = {
        name: name,
        active_conversations: mid[name].active_conversations,
        conversations_answered: mid[name].conversations_answered,
        assigned_answered:mid[name].assigned_answered,
        unassigned_answered:mid[name].unassigned_answered
      }
      self.records.push(r);
    }

    self.dataSource = new MatTableDataSource(self.records);
    self.dataSource.sort = self.sort;
    self.dataSource.paginator = self.paginator;
    this.loaded = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges() {
    if (this.loaded == false) return;
    this.loaded = false;
    this.ngOnInit();
  }

}
