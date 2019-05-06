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

  public getOfType(type){
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('operator/get-of-type/' + type);
      self.http.get(url).toPromise()
        .then(function (result:Operator[]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public setAssigned(id, assigned){
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('operator/set-assigned/');
      self.http.post(url, {id:id, assigned:assigned}).toPromise()
        .then(function (result:Operator[]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getAssigned(name){
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('operator/assigned/' + name);
      self.http.get(url).toPromise()
        .then(function (result:[]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }
}
