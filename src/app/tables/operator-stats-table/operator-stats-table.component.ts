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
  @Input() perPage:number = 10;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() public filter = ['Belgium', 'Bangladesh'];
  displayedColumns: string[] = ['name', 'conversations_answered'];
  public records = [];
  dataSource = new MatTableDataSource(this.records);

  public loaded = true;




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
    var p1 = this.conversationService.getAnsweredByOperator(this.start, this.end, options)
      .then(function (results) {
        results.forEach(function (g: any) {
          var obj = {
            name: g.name,
            conversations_answered: g.count
          }
          self.records.push(obj);
        })

      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch data.", "OK");
      })

    await p1;
    self.dataSource = new MatTableDataSource(self.records);
    self.dataSource.sort = self.sort;
    self.dataSource.paginator = self.paginator;
    this.loaded = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
