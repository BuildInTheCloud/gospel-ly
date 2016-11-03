import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public data: Data) { }

  ngOnInit() {this.loadData();}

  loadData() {
    this.newTestement = this.data.getNewTestement();
    this.newTestementBooks = this.data.newTestementBooks;
  }

  readBook( navTo: string ) {
    console.log("Nav To:", navTo);
    this.navCtrl.push(ReadPage, { testement: "new", book: navTo } );
  }

}
