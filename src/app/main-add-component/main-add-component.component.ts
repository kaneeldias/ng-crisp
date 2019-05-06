import { Component, OnInit } from '@angular/core';

import { MainWeek } from '../main-week'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router';
import { MainWeekService } from '../main-week/main-week.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SnackbarService } from '../snackbar/snackbar.service';


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

  constructor(
    private mainWeekService: MainWeekService,
    private snackBar: SnackbarService,
    private db: AngularFirestore, private router: Router, private route: ActivatedRoute) {

    this.record.week_start = new Date().toISOString().split("T")[0];
    console.log(this.record.week_start);
  }

  public addItem() {
    var self = this;
    var x = this.mainWeekService.insert(this.record);
    x.toPromise()
      .then(function (response) {
        console.log(response);
        self.snackBar.openSnackBar("Record inserted", "Yay");
        self.router.navigate(['/main']);
      })
      .catch(function (error) {
        console.log(error);
        self.snackBar.openSnackBar("Internal Server Error. Could not insert record.", "FUCK");
      });

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

  private getInfo() {
    var self = this;
    this.mainWeekService.get(this.record.week_start)
    .then(function(record){
      self.record = record;
    })
    .catch(function(error){
      console.log(error);
      self.snackBar.openSnackBar("Internal Server Error. Could not fetch record.", "OK");
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['week_start'] != undefined) {
        this.type = "Edit";
        this.subtitle = "Week starting " + params['week_start'];
        this.record.week_start = params['week_start'];
        this.getInfo();
      }
    })
  }



}
