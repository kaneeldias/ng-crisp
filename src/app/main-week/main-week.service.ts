import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainWeek } from '../main-week';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {API} from '../config';


@Injectable({
  providedIn: 'root'
})
export class MainWeekService {

  constructor(private http: HttpClient) {

  }

  public getAll(): Promise<MainWeek[]> {
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('main-record');
      self.http.get(url).toPromise()
        .then(function (result:MainWeek[]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public get(week_start:string):Promise<MainWeek>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url =  API.getUrl('main-record/' +  week_start);
      self.http.get(url).toPromise()
        .then(function (result:MainWeek) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getLast(week_start:string, x:number):Promise<MainWeek>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url =  API.getUrl('main-record/last/'+ week_start + "/" + x);
      self.http.get(url).toPromise()
        .then(function (result:MainWeek) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getStat(column:string, week_start:string, week_end:string):Promise<MainWeek[]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url =  API.getUrl('main-record/'+ column + "/" + week_start + "/" + week_end);
      self.http.get(url).toPromise()
        .then(function (result:MainWeek[]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }
  public insert(record: MainWeek): Observable<any> {
    var url =  API.getUrl('main-record');
    var x = this.http.put(url, record);
    return x;
  }

}
