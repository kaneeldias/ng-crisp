import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { OperatorService } from 'src/app/operator/operator.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-operator-assigned-table',
  templateUrl: './operator-assigned-table.component.html',
  styleUrls: ['./operator-assigned-table.component.css']
})
export class OperatorAssignedTableComponent implements OnInit {

  @Input() start: string;
  @Input() end: string;
  @Input() operator: string;
  @Input() filter:[];
  @Input() perPage: number = 10;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['country', 'assigned', 'active_conversations', 'answered', 'answered_others', 'answered_percentage'];
  public records = [];
  dataSource = new MatTableDataSource(this.records);

  public loaded = false;




  constructor(
    private conversationService: ConversationService,
    private snackBarService: SnackbarService,
    private operatorService: OperatorService
  ) { }

  async ngOnInit() {
    var self = this;
    self.records = [];
    var mid = {};

    var p1 = this.operatorService.getAssigned(this.operator)
      .then(function (countries: []) {
        countries.forEach(function (country: any) {
          var x = {
            country: country,
            assigned: "YES",
            active_conversations: 0,
            answered_conversations: 0,
            answered_total: 0
          };
          mid[country] = x;
        })

      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Error loading assigned countries", "OK");
      });

    await p1;
    var options = {};
    if (this.filter != undefined) {
      options = {
        filter: [this.filter]
      }
    }
    if (this.operator != undefined) {
      options = {
        filter: [this.operator]
      }
    }
    var p2 = this.conversationService.getActiveByCountry(self.start, self.end, options)
      .then(function (records) {
        records.forEach(function (r: any) {
          mid[r.country].active_conversations = r.count;
        })
      })

    var p3 = this.conversationService.getAnsweredByCountry(self.start, self.end, options)
      .then(function (records) {
        records.forEach(function (r: any) {
          if (mid[r.country] == undefined) {
            var x = {
              country: r.country,
              assigned: "NO",
              active_conversations: 0,
              answered_conversations: 0,
              answered_total: 0
            };
            mid[r.country] = x;
          }
          mid[r.country].answered_conversations = r.count;
        })
      })
    await p2; await p3;

    var p4 = this.conversationService.getAnsweredByCountry(self.start, self.end)
      .then(function (records) {
        records.forEach(function (r: any) {
          if (mid[r.country] != undefined) mid[r.country].answered_total = r.count;
        })
      })

    await p4;

    for (var country in mid) {
      if (mid[country].active_conversations != 0) mid[country].answered_percentage = mid[country].answered_conversations / mid[country].active_conversations;
      else mid[country].answered_percentage = 0;
      mid[country].answered_others = mid[country].answered_total - mid[country].answered_conversations;
      self.records.push(mid[country]);
    }

    self.dataSource = new MatTableDataSource(self.records);
    self.dataSource.sort = self.sort;
    self.dataSource.paginator = self.paginator;
    this.loaded = true;
  }

  ngOnChanges() {
    if (this.loaded == false) return;
    this.loaded = false;
    this.records = [];
    this.ngOnInit();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
