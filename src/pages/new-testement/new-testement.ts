declare var window;
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { ReadPage } from "../read/read";

@Component({
  selector: 'page-new-testement',
  templateUrl: 'new-testement.html'
})

export class NewTestementPage {
  errorMessage: any;
  public newTestement: any = [];
  public newTestementBooks: any = [];
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
    this.newTestement = this.data.getNewTestement();
    this.newTestementBooks = this.data.newTestementBooks;
  }

  launchPage() {
    this.navCtrl.push(ReadPage, { testement: "new", book: this.navTo, loading: this.loader });
  }

  readBook( navTo: string ) {
    this.navTo = navTo;
    let overlay = this.loadingCtrl.create({ content: "Loading " + navTo + " ..." });
    this.loader = overlay;
    this.loader.present().then(action => this.launchPage() );
  }

}
