import { Component } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crisp-ng';
  
  constructor(private router: Router) {
    this.router.navigate(['/dashboard'])
   }


  

}
