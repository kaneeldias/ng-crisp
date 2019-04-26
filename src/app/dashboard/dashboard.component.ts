import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { MainWeek } from '../main-week';

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

  stats:MainWeek;
  changes = {
    helpdesk_reads: 1,
    people_created: 1,
    new_conversations: 1,
    conversations_assigned: 1,
    mean_rating: 1
  };

  public loaded = false;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

    /*this.report.end = "2019-04-15";
    this.report.start = "2019-04-01";
    this.loaded = true;*/

    var records: Observable<any[]> = this.db.collection('main-record', ref => ref
      .orderBy('week_start', 'desc')
      .limit(2)
    )
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return { id, ...data };
        })
      }));

      var sub = records.subscribe(records =>{
        this.report.end = records[0].week_start;
        var start = new Date(this.report.end);
        start.setDate(start.getDate() - 28);
        this.report.start = start.toISOString().split("T")[0];
        this.stats = records[0];
        if(records[0].helpdesk_reads - records[1].helpdesk_reads < 0) this.changes.helpdesk_reads = -1;
        if(records[0].people_created - records[1].people_created < 0) this.changes.people_created = -1;
        if(records[0].new_conversations - records[1].new_conversations < 0) this.changes.new_conversations = -1;
        if(records[0].conversations_assigned - records[1].conversations_assigned < 0) this.changes.conversations_assigned = -1;
        if(records[0].mean_rating - records[1].mean_rating < 0) this.changes.mean_rating = -1;

        //this.report.end = "2019-04-21";
        //this.report.start = "2019-04-01";
        
        //console.log(this.report.end);
        //console.log(this.report.start);
        this.loaded = true;
        sub.unsubscribe();
      })

    
  }
}
