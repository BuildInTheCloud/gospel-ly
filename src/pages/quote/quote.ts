import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicModule } from 'ionic-angular';
import { Data } from '../../providers/data';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html'
})

export class QuotePage {
  oldTestement: any = [];
  newTestement: any = [];
  OdTestCount: number = 23145;
  newTestNumber: number = 7957;
  oldTestementVerse: string = "Loading...";
  newTestementVerse: string = "Loading...";
  timer: any;
  subscription: any;

  constructor(public navCtrl: NavController, public data: Data) {
    this.timer = Observable.timer(2000, 3000);
    this.subscription = this.timer.subscribe(t => { this.loadData(); } );
  }

  ngOnInit() {
  }

  loadData() {
    this.oldTestement = this.data.getOldTestement();
    this.newTestement = this.data.getNewTestement();
    if (this.oldTestement.length > 0) {
      this.subscription.unsubscribe();
      this.pickVerse();
    }
  }

  pickVerse() {
    this.findVerse("old", this.oldTestement, this.getRandom(0, this.OdTestCount - 1));
    this.findVerse("new", this.newTestement, this.getRandom(0, this.newTestNumber - 1));
  }

  findVerse(testement, dataSet: any, find: number) {
    var place: number = 0;
    top:
    for(var b in dataSet) {
      for(var c in dataSet[b].chapters) {
        for(var v = 0; v < dataSet[b].chapters[c].verses.length; v++) {
          if (place === find) {
            if (testement == "old") {
              this.oldTestementVerse = dataSet[b].chapters[c].verses[v];
            }
            if (testement == "new") {
              this.newTestementVerse = dataSet[b].chapters[c].verses[v];
            }
            break top;
          }
          place++
        }
      }
    }
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
