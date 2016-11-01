import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Feeds } from '../../providers/feeds';

@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})

export class FeedsPage {
  feedMaster: any = [];
  errorMessage: any;
  searchFor: string = "";
  shouldShowCancel: boolean = false;
  myFeeds: any = [];

  constructor(public navCtrl: NavController, public feeds: Feeds, public storage: Storage) {
    this.storage.get('myFeeds').then(data => {
      this.myFeeds = JSON.parse(data) ? JSON.parse(data) : [];
    });
  }

  ngOnInit() {this.loadData();}

  loadData() { this.feedMaster = this.feeds.getMasterList(); }

  selectFeed(event: any, feedKey: string, index: number) {
    var isSelected: boolean = document.getElementById("card"+index).className == "card-selected" ? true : false;
    if (isSelected) {
      document.getElementById("card"+index).className = "card-notselected";
      this.myFeeds = this.myFeeds.filter(record => record.feed !== feedKey);
    } else {
      document.getElementById("card"+index).className = "card-selected";
      var match = this.myFeeds.filter(record => record.feed === feedKey);
      if (match.length == 0) {
        this.myFeeds.push({feed: feedKey, keywords: [] });
      }
    }
    this.storage.set('myFeeds', JSON.stringify(this.myFeeds) );
  }

  setSelected(feedKey, index) {
    var match = this.myFeeds.filter(record => record.feed === feedKey);
    if (match.length == 0) {
      return "card-notselected";
    } else {
      return "card-selected";
    }
  }

  onSearchCancel(event) {
    /*
    this.feed = this.feedRAW;
    */
  }

  onSearchInput(event) {
    /*
    var searchText = event.target.value;
    if (searchText == "" || searchText == undefined) {
      this.feed = this.feedRAW;
    } else {
      this.feed = [];
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
    }
    */
  }

}
