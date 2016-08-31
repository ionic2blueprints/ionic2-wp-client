import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Events, LocalStorage, Storage} from 'ionic-angular';
import {Push, Device} from 'ionic-native';
import {SITE_URL, GCM_SENDER_ID} from '../constants';

@Injectable()
export class PushProvider {
  apiURL:string = SITE_URL;
  storage = new Storage(LocalStorage);
  push:any;
  constructor(public http:Http, public events: Events) {}
  
  init() {
     this.push = Push.init({
        android: { senderID: GCM_SENDER_ID },
        ios: {
            alert: "true",
            badge: true,
            sound: 'false'
        },
        windows: {}
     });
     
     this.push.on('registration', (data) => {
         this.storage.set('token', data.registrationId);
         this.registerDevice()
         .then(data => {});
     });
     
     this.push.on('notification', (data) => {
         console.log(data);
     });
  }
  
  transformRequest(obj) {
    let p, str;
    str = [];
    for (p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  }
  
  registerDevice() {
    let url = this.apiURL + '/pnfw/register';
    let os = Device.device.platform;
    return this.storage.get('token')
    .then(data => {
         let request = this.transformRequest({token: data, os: os});
         let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
         return this.http.post(url, request, {headers:headers}).toPromise();
    });    
  }
  
  unregisterDevice() {
      let url = this.apiURL + '/pnfw/unregister';
      let os = Device.device.platform;
      return this.storage.get('token')
      .then(data => {
          let request = this.transformRequest({token: data, os: os});
          let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
          return this.http.post(url, request, {headers:headers}).toPromise();
      });
  }
}