import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicModule, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import {Observable} from 'rxjs/Rx';
import { ReadPage } from "../read/read";

@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html'
})

export class QuotePage {
  oldTestement: any = [];
  newTestement: any = [];
  OldTestCount: number = 23145;
  newTestCount: number = 7957;
  oldTestementVerse: string = "";
  newTestementVerse: string = "";
  oldTestementLocation: string = "";
  newTestementLocation: string = "";
  timer: any;
  subscription: any;
  loader: any;
  viewContext: any;
  oldTestementPick: number = 0;
  newTestementPick: number = 0;

  constructor(public navCtrl: NavController, public data: Data, public loadingCtrl: LoadingController) {
    this.timer = Observable.timer(2000, 3000);
    this.subscription = this.timer.subscribe(t => { this.loadData(); } );
  }

  ngOnInit() {
    let overlay = this.loadingCtrl.create({ content: "Loading ..." });
    this.loader = overlay;
    this.loader.present();
  }

  loadData() {
    this.oldTestement = this.data.getOldTestement();
    this.newTestement = this.data.getNewTestement();
    if (this.oldTestement.length > 0) {
      this.subscription.unsubscribe();
      this.pickVerse();
      this.loader.dismiss();
    }
  }

  viewInContext(testement: string) {
    var loadingText = "";
    if (testement == "old") {
      this.viewContext = { testement: "old", book: this.oldTestement[this.oldTestementPick].book, chapter: this.oldTestement[this.oldTestementPick].chapter, verse: this.oldTestement[this.oldTestementPick].verse, loading: this.loader };
      loadingText = this.oldTestement[this.oldTestementPick].book + " " + this.oldTestement[this.oldTestementPick].chapter + ":" + this.oldTestement[this.oldTestementPick].verse;
    } else if (testement == "new") {
      this.viewContext = { testement: "new", book: this.newTestement[this.newTestementPick].book, chapter: this.newTestement[this.newTestementPick].chapter, verse: this.newTestement[this.newTestementPick].verse, loading: this.loader };
      loadingText = this.newTestement[this.newTestementPick].book + " " + this.newTestement[this.newTestementPick].chapter + ":" + this.newTestement[this.newTestementPick].verse;
    }
    let overlay = this.loadingCtrl.create({ content: "Loading " + loadingText + " ..." });
    this.loader = overlay;
    this.loader.present().then(action => this.launchPage() );
  }

  pickVerse() {
    this.oldTestementPick = this.getRandom(0, this.OldTestCount - 1);
    this.newTestementPick = this.getRandom(0, this.newTestCount - 1);
    this.findVerse("old", this.oldTestement, this.oldTestementPick);
    this.findVerse("new", this.newTestement, this.newTestementPick);
  }

  findVerse(testement, dataSet: any, find: number) {
    if (testement == "old") {
      this.oldTestementVerse = this.oldTestement[find].text;
      this.oldTestementLocation = this.oldTestement[find].book + " " + this.oldTestement[find].chapter + ":" + this.oldTestement[find].verse;
    } else if (testement == "new") {
      this.newTestementVerse = this.newTestement[find].text;
      this.newTestementLocation = this.newTestement[find].book + " " + this.newTestement[find].chapter + ":" + this.newTestement[find].verse;
    }
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  launchPage() {
    this.navCtrl.push(ReadPage, { testement: this.viewContext.testement, book: this.viewContext.book, chapter: this.viewContext.chapter, verse: this.viewContext.verse, loading: this.loader });
  }

}
