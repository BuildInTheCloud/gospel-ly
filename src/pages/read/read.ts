declare var window, document;
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  chapter: number;
  verse: number;
  oldTestement: any = [];
  newTestement: any = [];
  readView: any = [];
  cleanView: any = [];
  chapters: number;
  loader: any;

  constructor(public navCtrl: NavController, public data: Data, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.testement = this.navParams.get("testement");
    this.book = this.navParams.get("book");
    this.chapter = this.navParams.get("chapter");
    this.verse = this.navParams.get("verse");
    this.loader = this.navParams.get("loading");
  }

  ionViewWillEnter() {
    //setTimeout(() => {
      var gotoVerse: any = document.getElementById("c"+this.chapter+"v"+this.verse);
      if (gotoVerse) {
        gotoVerse.parentNode.parentNode.parentNode.scrollTop = gotoVerse.offsetTop - 200;
      }
    //}, 1000);
    this.loader.dismiss();
  }

  ngOnInit() {
    if (this.testement == "old") {
      this.oldTestement = this.data.getOldTestement();
    } else if (this.testement == "new") {
      this.newTestement = this.data.getNewTestement();
    }
    this.setReadView();
  }

  setReadView() {
    if (this.testement == "old") {
      this.readView = this.oldTestement.filter(record => record.book === this.book);
    } else if (this.testement == "new") {
      this.readView = this.newTestement.filter(record => record.book === this.book);
    }
    this.cleanView = this.readView;
    this.chapters = this.cleanView.filter(record => record.verse == "1");
  }

  filterChatper(index) {
    var returnArray = this.readView.filter(record => record.book == this.book && record.chapter == (index).toString());
    return returnArray;
  }

  onSearchCancel(event) {
    this.readView = this.cleanView;
  }

  onSearchInput(event) {
    this.setReadView();
    var searchText = event.target.value;
    if (searchText == "" || searchText == undefined) {
      console.log("FILTER CLEARED");
    } else {
      this.readView.forEach(record => {
        var regex = new RegExp(searchText, "gi");
        record.text = record.text.replace(regex, "<span class=\"highlight\">"+searchText.toUpperCase()+"</span>");
      });
      console.log("FILTER: ", searchText);
    }
    return this.readView;
  }

}
