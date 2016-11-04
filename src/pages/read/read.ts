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
    console.log("constructor");
    this.testement = this.navParams.get("testement");
    this.book = this.navParams.get("book");
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
    this.readView = this.cleanView;
  }

  onSearchInput(event) {
    var searchText = event.target.value;
    console.log("search start: ", searchText);
    if (searchText == "" || searchText == undefined || searchText.length < 3) {
      this.readView = this.cleanView;
    } else {
      var temp = this.cleanView;
      for (var c in temp.chapters) {
        for (var v in temp.chapters[c].verses) {
          var regex = new RegExp(searchText, "gi");
          temp.chapters[c].verses[v] = temp.chapters[c].verses[v].replace(regex, "<span class=\"highlight\">"+searchText.toUpperCase()+"</span>");
        }
      }
      this.readView = temp;
    }
    console.log("search end: ", searchText);
    return true;
  }

}
