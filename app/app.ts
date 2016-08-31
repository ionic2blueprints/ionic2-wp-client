import {ViewChild, Component} from '@angular/core';
import {Platform,Nav, Storage, LocalStorage, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Network, GoogleAnalytics} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {CategoryListPage} from './pages/category-list/category-list';
import {WpProvider} from './providers/wp-provider/wp-provider';
import {PushProvider} from './providers/push-provider/push-provider';
import {UtilProvider} from './providers/util-provider/util-provider';
import {GOOGLE_ANALYTICS_ID} from './providers/constants';

@Component({
  templateUrl: 'build/app.html',
})
class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TabsPage;
  storage:Storage = new Storage(LocalStorage);
  settings = {};
  constructor(private platform: Platform, private push: PushProvider, public up: UtilProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let toast = this.up.getToast("You are not connected to Internet.");
      let disconnectSubscription = Network.onDisconnect().subscribe(() => {
        this.nav.present(toast);
      });
      
      GoogleAnalytics.startTrackerWithId(GOOGLE_ANALYTICS_ID);
      this.storage.get('settings')
      .then(data => {
        if(data === null) {
          let settings = {push: true, sort: 'desc'};
          this.storage.set('settings', JSON.stringify(settings));
        }
      });
      
      StatusBar.styleDefault();
      if(this.platform.is('mobile')) {
        this.push.init();
      }
    });
  }
}

ionicBootstrap(MyApp, [WpProvider,PushProvider, UtilProvider])
