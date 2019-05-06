import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ConversationService } from 'src/app/conversation/conversation.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-conversations-created-by-country-table',
  templateUrl: './conversations-created-by-country-table.component.html',
  styleUrls: ['./conversations-created-by-country-table.component.css']
})


export class ConversationsCreatedByCountryTableComponent implements OnInit {


  displayedColumns: string[] = ['country', 'new_conversations', 'active_conversations', 'answered_conversations', 'answered_percentage'];
  public records = [];
  public mid = {};
  dataSource = new MatTableDataSource(this.records);

  @Input() start: string;
  @Input() end: string;
  @Input() perPage: number = 20;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public loaded = true;

  constructor(private conversationService: ConversationService, private snackBarService: SnackbarService) { }

  async ngOnInit() {
    var self = this;
    var p1 = this.conversationService.getCreatedByCountry(this.start, this.end)
      .then(function (records: any) {
        records.forEach(function (r) {
          if (self.mid[r.country] == undefined) self.mid[r.country] = [0, 0, 0];
          self.mid[r.country][0] = r.count;
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch country new conversations data.", "OK");
      })

    var p2 = this.conversationService.getActiveByCountry(this.start, this.end)
      .then(function (records: any) {
        records.forEach(function (r) {
          if (self.mid[r.country] == undefined) self.mid[r.country] = [0, 0, 0];
          self.mid[r.country][1] = r.count;
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch country active conversations data.", "OK");
      })

    var p3 = this.conversationService.getAnsweredByCountry(this.start, this.end)
      .then(function (records: any) {
        records.forEach(function (r) {
          if (self.mid[r.country] == undefined) self.mid[r.country] = [0, 0, 0];
          self.mid[r.country][2] = r.count;
        })
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch country answered conversations data.", "OK");
      })

    await p1;
    await p2;
    await p3;

    self.loaded = true;


    for (var country in this.mid) {
      var new_convos = this.mid[country][0];
      var active_convos = this.mid[country][1];
      var answered_convos = this.mid[country][2];
      var percentage = 0;
      if (active_convos != 0) percentage = answered_convos / active_convos;

      var obj = {
        country: country,
        new_conversations: new_convos,
        active_conversations: active_convos,
        answered_conversations: answered_convos,
        answered_percentage: (percentage * 100).toFixed(2) + "%"
      }
      this.records.push(obj);

    }

    self.dataSource = new MatTableDataSource(self.records);
    self.dataSource.sort = self.sort;
    self.dataSource.paginator = self.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
