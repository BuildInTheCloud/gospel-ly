declare var window;
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { ReadPage } from "../read/read";

@Component({
  selector: 'page-old-testement',
  templateUrl: 'old-testement.html'
})

export class OldTestementPage {
  errorMessage: any;
  public oldTestement: any = [];
  public oldTestementBooks: any = [];
  loader: any;
  navTo: string;

  constructor(public navCtrl: NavController, public data: Data, public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    try {this.loader.dismiss();} catch(e) {}
  }

  loadData() {
    this.oldTestement = this.data.getOldTestement();
    this.oldTestementBooks = this.data.oldTestementBooks;
  }

  launchPage() {
    this.navCtrl.push(ReadPage, { testement: "old", book: this.navTo, loading: this.loader });
  }

  readBook( navTo: string ) {
    this.navTo = navTo;
    let overlay = this.loadingCtrl.create({ content: "Loading " + navTo + " ..." });
    this.loader = overlay;
    this.loader.present().then(action => this.launchPage() );
  }

}
