import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Operator } from '../operator';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-operator-view',
  templateUrl: './operator-view.component.html',
  styleUrls: ['./operator-view.component.css', '../../../assets/styles/k_styles.css']
})
export class OperatorViewComponent implements OnInit {

  displayedColumns: string[] = ['name', 'sheet_name', 'type'];
  public operators: Operator[];
  dataSource = new MatTableDataSource(this.operators);

  loaded = false;

  constructor(private db: AngularFirestore, private router: Router) {
    var self = this;
    Operator.getAllOperators(this.db, function(operators: Operator[]){
        self.operators = operators;
        self.dataSource = new MatTableDataSource(self.operators);
        self.dataSource.sort = self.sort;
        self.dataSource.paginator = self.paginator;

    });

  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


 
