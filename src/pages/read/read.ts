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
  public oldTestement: any = [];
  public newTestement: any = [];

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
  }

  onSearchCancel(event) {
    this.oldTestement = this.data.getOldTestement();
    this.newTestement = this.data.getNewTestement();
  }

  onSearchInput(event) {
    var searchText = event.target.value;
    if (searchText == "" || searchText == undefined) {
      this.oldTestement = this.data.getOldTestement();
      this.newTestement = this.data.getNewTestement();
    } else {
      /*
      this.oldTestement = [];
      for (var x = 0; x < this.feedRAW.length; x++) {
        if (this.feedRAW[x].title && searchText) {
          if (this.feedRAW[x].title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            this.feed.push(this.feedRAW[x]);
          }
        } else if (this.feedRAW[x].description && searchText) {
          if (this.feedRAW[x].description.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            this.feed.push(this.feedRAW[x]);
          }
        }
      }
      */
    }
  }

}
