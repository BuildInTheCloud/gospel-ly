import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public data: Data) { }

  ngOnInit() {this.loadData();}

  loadData() {
    this.oldTestement = this.data.getOldTestement();
    this.oldTestementBooks = this.data.oldTestementBooks;
  }

  readBook( navTo: string ) {
    console.log("Nav To:", navTo);
    this.navCtrl.push(ReadPage, { testement: "old", book: navTo } );
  }

}
