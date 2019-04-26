import { Component, OnInit } from '@angular/core';

import { MainWeek } from '../main-week'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main-add-component',
  templateUrl: './main-add-component.component.html',
  styleUrls: ['./main-add-component.component.css']
})

export class MainAddComponentComponent implements OnInit {


  record = new MainWeek();
  type = "Add New";
  subtitle = "To main statistics"

  items: Observable<MainWeek[]>;

  private mainRecordsCollection: AngularFirestoreCollection<MainWeek>;

  private sub: any;

  constructor(private db: AngularFirestore, private router: Router, private route: ActivatedRoute) {

    this.record.week_start = new Date().toISOString().split("T")[0];
    //this.record.week_start = "2019-04-01";
    console.log(this.record.week_start);
    /*this.record.conversations_assigned = 0;
    this.record.helpdesk_reads = 0;
    this.record.mean_rating = 0;
    this.record.new_conversations = 0;
    this.record.people_created = 0;*/

    this.mainRecordsCollection = db.collection<MainWeek>('main-record');
    this.items = this.mainRecordsCollection.valueChanges();
  }

  public addItem() {
    var self = this;
    this.mainRecordsCollection.doc(this.record.week_start).set(JSON.parse(JSON.stringify(this.record)), {merge:true})
    .then(function(){
      self.router.navigate(['/main']);
    });

    /*var updateItem = this.updateItem.bind(this);
    var home = this;
    this.record.week_start = new Date(this.record.week_start).toISOString().split('T')[0];
    if(!this.record.validate()){
      alert("ERROR");
      return;
    }
    /*var updateItem = function(docId:String){
      updateItem(docId);
    }

    var existing: Observable<any[]> = this.db.collection<MainWeek>('main-record', ref => ref
      .where(
        'week_start', '==', this.record.week_start
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
          updateItem(e.id);
        })
      }
      else {
        var router = this.router;
        this.mainRecordsCollection.doc(this.record.week_start).set(JSON.parse(JSON.stringify(this.record)))
          .then(function () {
            router.navigate(['/main']);
          })
          .catch(function (e) {
            alert("Error");
            console.log(e);
          });;
      }
    });*/

  }

  private updateItem(docId: string) {
    var router = this.router;
    this.mainRecordsCollection.doc(docId).set(JSON.parse(JSON.stringify(this.record)))
      .then(function () {
        router.navigate(['/main']);
      })
      .catch(function (e) {
        alert("Error");
        console.log(e);
      });
  }

  private getInfo(){
    var existing: Observable<any[]> = this.db.collection<MainWeek>('main-record', ref => ref
        .where(
          'week_start', '==', this.record.week_start
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
            this.record.week_start = e.week_start;
            this.record.helpdesk_reads = e.helpdesk_reads;
            this.record.people_created = e.people_created;
            this.record.new_conversations = e.new_conversations;
            this.record.conversations_assigned = e.conversations_assigned;
            this.record.mean_rating = e.mean_rating;

            console.log
          })
        }
        else {
          console.log("DNE");
        }
      });

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params['week_start'] != undefined){
        this.type = "Edit";
        this.subtitle = "Week starting " + params['week_start']; 
        this.record.week_start = params['week_start'];
        this.getInfo();
      }
    })      
  }



}
