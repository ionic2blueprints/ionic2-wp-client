import {Component} from '@angular/core';
import {ViewController, LocalStorage, Storage, Events} from 'ionic-angular';
import {Control} from '@angular/common';
import {PushProvider} from '../../providers/push-provider/push-provider';
@Component({
   templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
    pushToggle:Control = new Control();
    storage = new Storage(LocalStorage);
    settings:any;
    constructor(public pushProvider: PushProvider, public events:Events) {
          this.storage.get('settings')
          .then(data => {
              this.settings = JSON.parse(data);
              this.pushToggle.updateValue(this.settings.push);
          });
          
          this.pushToggle.valueChanges.skip(1)
          .subscribe(value => {
              this.changePush(value);
          });
    }
    
    saveSettings() {
        this.storage.set('settings', JSON.stringify(this.settings));
    }
    
    changeSort() {
        this.events.publish("sort:changed", this.settings.sort);
        this.saveSettings();
    } 
    
    changePush(push) {
        if(push === true) {
            this.pushProvider.registerDevice()
            .then(() => {})
        } else {
            this.pushProvider.unregisterDevice()
            .then(() => {})
        }
        this.saveSettings();
    }
}