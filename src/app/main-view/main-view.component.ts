import { Component, OnInit, ViewChild } from '@angular/core';
import { MainWeek } from '../main-week'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MainWeekService } from '../main-week/main-week.service';
import { SnackbarService } from '../snackbar/snackbar.service';



const items = [];

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})


export class MainViewComponent implements OnInit {

  private mainRecordsCollection: AngularFirestoreCollection<MainWeek>;
  items: MainWeek[];
  dataSource;

  displayedColumns: string[] = ['week_start', 'helpdesk_reads', 'people_created', 'new_conversations', 'conversations_assigned', 'mean_rating', 'edit', 'delete'];

  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private db: AngularFirestore,
    private router: Router,
    private mainWeekService: MainWeekService,
    private snackBarService:SnackbarService
  ) {
    var self = this;

    mainWeekService.getAll()
      .then(function (records) {
        self.items = records;
        self.dataSource = new MatTableDataSource(self.items);
        self.dataSource.sort = self.sort;
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch records.", "FUCK");
      });

    /*MainWeek.getAllRecords(db, function(records:MainWeek[]){
        self.items = records;
        self.dataSource = new MatTableDataSource(self.items);
        self.dataSource.sort = self.sort;
    });*/

    /*var records: Observable<any[]> = this.db.collection('main-record', ref => ref
    )
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as MainWeek;
          var m = new MainWeek();
          m.week_start = id;
          m.conversations_assigned = data.conversations_assigned;
          m.new_conversations = data.new_conversations;
          m.helpdesk_reads = data.helpdesk_reads;
          m.mean_rating = data.mean_rating;
          m.people_created = data.people_created;
          return m;
        })
      }));

      var self = this;
      records.subscribe(e => {
        self.dataSource = new MatTableDataSource(records);
      })


    this.mainRecordsCollection = db.collection<MainWeek>('main-record');
    this.items = records;*/
  }


  ngOnInit() {
  }

  public newRecord() {
    this.router.navigate(['/main/add']);
  }

  public edit(week_start: string) {
    this.router.navigate(['/main/edit', week_start]);
  }

  public delete(week_start: string) {
    var existing: Observable<any[]> = this.db.collection<MainWeek>('main-record', ref => ref
      .where(
        'week_start', '==', week_start
      ))
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as MainWeek;
          return { id, ...data };
        })
      }));

    existing.subscribe(existingItems => {
      if (existingItems.length > 0) {
        existingItems.forEach(e => {
          this.db.collection('main-record').doc(e.id).delete()
            .then(function () {
              console.log("DELETED");
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      }
    });

  }


}
