import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../config';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http:HttpClient) { 
  }

  public getByWeek(start:string, end:string, options:{} = {}):Promise<[{}]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('rating/by-week/'+start+'/'+end);
      self.http.post(url, {options:options}).toPromise()
        .then(function (result:[{}]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }
}
