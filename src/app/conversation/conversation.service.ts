import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http:HttpClient) { 

  }

  public getAssignedBreakdown(start:string, end:string){
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('conversation/assigned-breakdown/'+start+'/'+end);
      self.http.get(url).toPromise()
        .then(function (result:[]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getCreatedByCountry(start:string, end:string):Promise<[{}]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('conversation/created-by-country/'+start+'/'+end);
      self.http.get(url).toPromise()
        .then(function (result:[{}]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getActiveByWeek(start:string, end:string, options:{} = {}):Promise<[{}]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('conversation/active-by-week/'+start+'/'+end);
      self.http.post(url, {options:options}).toPromise()
        .then(function (result:[{}]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getAnsweredByWeek(start:string, end:string, options:{} = {}):Promise<[{}]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('conversation/answered-by-week/'+start+'/'+end);
      self.http.post(url, {options:options}).toPromise()
        .then(function (result:[{}]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getActiveByCountry(start:string, end:string):Promise<[{}]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('conversation/active-by-country/'+start+'/'+end);
      self.http.get(url).toPromise()
        .then(function (result:[{}]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getAnsweredByCountry(start:string, end:string):Promise<[{}]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('conversation/answered-by-country/'+start+'/'+end);
      self.http.get(url).toPromise()
        .then(function (result:[{}]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getAnsweredByOperatorType(start:string, end:string):Promise<[{}]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('conversation/answered-by-operator-type/'+start+'/'+end);
      self.http.get(url).toPromise()
        .then(function (result:[{}]) {
            resolve(result);
        })
        .catch(function (error) {
          reject(error);
        })
    });
  }

  public getAnsweredByOperator(start:string, end:string, options:{}):Promise<[{}]>{
    var self = this;
    return new Promise(function (resolve, reject) {
      var url = API.getUrl('conversation/answered-by-operator/'+start+'/'+end);
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
