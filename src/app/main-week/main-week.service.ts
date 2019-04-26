import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainWeek } from '../main-week';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MainWeekService {

  constructor(private http:HttpClient) { 

  }

  public insert(record:MainWeek):Observable<any>{
    var url = "http://localhost:3000/api/main-record";
    var x = this.http.put(url, record);
    return x;
  }

}
