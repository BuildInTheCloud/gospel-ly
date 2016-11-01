import { Component } from '@angular/core';
import { NavController, Toast, ToastController } from 'ionic-angular';
import { Feeds } from '../../providers/feeds';

@Component({
  selector: 'page-refresh',
  templateUrl: 'refresh.html',
  providers: []
})

export class RefreshPage {
  errorMessage: any;
  downloading: boolean = false;

  constructor(public navCtrl: NavController, public feeds: Feeds, public toastCtrl: ToastController) {

  }

  clearMyFeeds() {
    this.feeds.clearMyFeeds();
    this.presentToast("Selected Feeds Cleared.");
  }

  clearCache() {
    this.feeds.clearCache();
    this.presentToast("Local Cache Cleared, News Tab will relect change on next auto refresh.");
  }

  refreshNews() {
    this.downloading = true;
    this.feeds.refreshNews().then(
      data => {
        this.presentToast("News Tab will auto refresh once news is downloaded.");
        this.downloading = false;
      },
      error => { this.errorMessage = <any>error; }
    );
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.onDidDismiss(() => { });
    toast.present();
  }
}
