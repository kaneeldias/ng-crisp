import { Component } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import {Router} from "@angular/router"
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AIESEC - CRISP Dashboard';
  
  constructor(private router: Router, private titleService:Title) {
    this.router.navigate(['/dashboard']);
    this.titleService.setTitle("AIESEC - Crisp Dashboard");
   }


  

}
