import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {StatusBar, AdMob} from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { Feeds } from '../providers/feeds';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [Feeds]
})

export class MyApp {
  rootPage = TabsPage;

  constructor(public platform: Platform, public feeds: Feeds) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      var admobid = {banner: "ca-app-pub-4615642243411455/4194083161", interstitial: ""};
      AdMob.createBanner({
        adId:admobid.banner,
        position: 8,
        overlap: false,
        offsetTopBar: false,
        bgColor: 'black',
        autoShow: true
      });
    });
  }
}
