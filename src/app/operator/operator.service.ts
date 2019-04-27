import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Operator } from './operator';
import {API} from '../config';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http:HttpClient) { }

  public getAll():Promise<Operator[]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('operator');
      self.http.get(url).toPromise()
        .then(function (result:Operator[]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }
}
