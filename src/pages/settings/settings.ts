import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [Data]
})

export class SettingsPage {
  bibleVersion: string;

  constructor(public navCtrl: NavController, public data: Data, public storage: Storage) {
    this.storage.get('bibleVersion').then(data => {
      this.bibleVersion = data ? data : "en_bbe";
    });
  }

  setBibleVersion() {
    if (this.bibleVersion != null) {
      this.storage.set('bibleVersion', this.bibleVersion)
      .then(
        data => this.data.initLoadBible(),
        error => console.log(error)
      );
    }
  }

}
