import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Operator } from '../operator';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { OperatorService } from '../operator.service';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { EditAssignedCountriesDialogComponent } from 'src/app/dialogs/edit-assigned-countries-dialog/edit-assigned-countries-dialog.component';

@Component({
  selector: 'app-operator-view',
  templateUrl: './operator-view.component.html',
  styleUrls: ['./operator-view.component.css', '../../../assets/styles/k_styles.css']
})
export class OperatorViewComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'assigned', 'assign_edit'];
  public operators: Operator[];
  dataSource = new MatTableDataSource(this.operators);

  loaded = false;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private operatorService: OperatorService,
    private snackBarService:SnackbarService,
    public dialog: MatDialog
  ) {
    var self = this;
    operatorService.getAll()
      .then(function (operators) {
        self.operators = operators;
        self.dataSource = new MatTableDataSource(self.operators);
        self.dataSource.sort = self.sort;
        self.dataSource.paginator = self.paginator;
      })
      .catch(function (error) {
        console.log(error);
        self.snackBarService.openSnackBar("Internal Server Error. Could not fetch operators.", "OK");
      })
    /*Operator.getAllOperators(this.db, function(operators: Operator[]){
        self.operators = operators;
        self.dataSource = new MatTableDataSource(self.operators);
        self.dataSource.sort = self.sort;
        self.dataSource.paginator = self.paginator;

    });*/

  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

  editDialog(operator){
    console.log(operator);
    const dialogRef = this.dialog.open(EditAssignedCountriesDialogComponent, {
      data: {operator:operator}
    });
  }

}



