import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-read',
  templateUrl: 'read.html',
  providers: []
})

export class ReadPage {
  errorMessage: any;
  searchFor: string = "";
  shouldShowCancel: boolean = false;
  testement: string;
  book: string;
  oldTestement: any = [];
  newTestement: any = [];
  readView: any = [];
  cleanView: any = [];

  constructor(public navCtrl: NavController, public data: Data, public navParams: NavParams) {

  }

  ngOnInit() {
    this.testement = this.navParams.get("testement");
    this.book = this.navParams.get("book");
    this.loadData();
  }

  loadData() {
    this.oldTestement = this.data.getOldTestement();
    this.newTestement = this.data.getNewTestement();
    this.setReadView();
  }

  setReadView() {
    if (this.testement == "old") {
      this.readView = this.oldTestement.filter(record => record.book === this.book)[0];
    } else if (this.testement == "new") {
      this.readView = this.newTestement.filter(record => record.book === this.book)[0];
    }
    this.cleanView = this.readView;
  }

  onSearchCancel(event) {
    this.setReadView();
  }

  onSearchInput(event) {
    var searchText = event.target.value;
    if (searchText == "" || searchText == undefined) {
      this.setReadView();
    } else {
      this.readView = this.cleanView;
      for (var c in this.readView.chapters) {
        console.log(this.readView.chapters[c].verses);
      }
    }
  }

}
