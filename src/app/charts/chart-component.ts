import { Component, ViewChild, Input } from '@angular/core';
import {
  ChartReadyEvent, ChartErrorEvent, ChartSelectEvent,
  ChartMouseOverEvent, ChartMouseOutEvent
} from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { MainWeekService } from 'src/app/main-week/main-week.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';


declare var $: any;
declare var google: any;

export class ChartComponent{

  @Input() width:number = 750;
  @Input() height:number = 400;

  public  chartData: GoogleChartInterface;

  public loaded = false;

  protected setParams(){
    var options:any = this.chartData.options;
    options.width = this.width;
    options.height = this.height;
    options.chartArea.width = this.width - 50;
    options.chartArea.left = this.width/10;
    options.lineWidth = this.width/200;
    options.pointSize = this.width/100;
  }

  ngOnInit(){}

  ngOnChanges() {
    if(this.loaded == false) return;
    this.loaded = false;
    this.ngOnInit();
  }

}