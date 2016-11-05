declare var window;
import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import {StatusBar, AdMob} from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { Data } from '../providers/data';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [Data]
})

export class MyApp {
  rootPage = TabsPage;

  constructor(public platform: Platform, public data: Data, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      var admobid = {banner: "ca-app-pub-4615642243411455/6637041966", interstitial: ""};
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
