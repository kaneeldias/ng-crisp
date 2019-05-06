import { Component, OnInit, Input } from '@angular/core';
import { OperatorService } from 'src/app/operator/operator.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-entity-dashboard',
  templateUrl: './entity-dashboard.component.html',
  styleUrls: ['./entity-dashboard.component.css']
})
export class EntityDashboardComponent implements OnInit {

  @Input() report;

  entities = [];

  loaded = false;

  constructor(private operatorService:OperatorService, private snackBarService:SnackbarService) { }

  async ngOnInit() {
    console.log(this.report);
    var self = this;
    var p1 = this.operatorService.getOfType("Entity")
    .then(function(result:[]){
      result.forEach(function(operator:any){
        self.entities.push(operator.name);
      })
    })
    .catch(function(error){
      console.log(error);
      self.snackBarService.openSnackBar("Internal Server Error. Could not data", "OK");
    })

    await p1;

    this.loaded = true;
  }

}
