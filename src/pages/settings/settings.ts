import { Component } from '@angular/core';
import { NavController, Toast, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: []
})

export class SettingsPage {
  bibleVersion: string;

  constructor(public navCtrl: NavController, public data: Data, public storage: Storage, public toastCtrl: ToastController) {
    this.storage.get('bibleVersion').then(data => {
      this.bibleVersion = data ? data : "en_bbe";
    });
  }

  setBibleVersion() {
    if (this.bibleVersion != null) {
      this.storage.set('bibleVersion', this.bibleVersion)
      .then(
        data => {this.data.initLoadBible(); this.presentToast("Restart app for change to take effect");},
        error => console.log(error)
      );
    }
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
