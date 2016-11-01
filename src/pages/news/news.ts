import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Feeds } from '../../providers/feeds';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Rx';
import {MomentModule} from "angular2-moment";

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
  providers: [MomentModule]
})

export class NewsPage {
  feedRAW: any = [];
  feed: any = [];
  errorMessage: any;
  searchFor: string = "";
  shouldShowCancel: boolean = false;
  timer: any;
  public newsLoaded: boolean = false;

  constructor(public navCtrl: NavController, public feeds: Feeds, public storage: Storage) {
  }

  hasNews(): boolean {
    return this.newsLoaded;
  }

  ngOnInit() {
    this.loadData(null);
    this.timer = Observable.timer(2000, 8000);
    this.timer.subscribe(t => { this.loadData(t); } );
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  loadData(t): any {
    console.log("REFRESH NEWS TIMER");
    if (this.feedRAW && this.feedRAW.length > 0) { this.newsLoaded = true; }
    this.storage.get('savedFeeds').then(data => {
      if (this.feedRAW && (JSON.stringify(this.feedRAW) !== data || this.feedRAW.length <= 0)) {
        this.feedRAW = JSON.parse(data);
        this.feed = JSON.parse(data);
      }
      if (this.feedRAW && this.feedRAW.length > 0) {
        this.newsLoaded = true;
      } else {
        this.newsLoaded = false;
      }
      return true;
    });
  }

  showDetails(indexKey, event) {
    event.srcElement.parentNode.className = "hideIT";
    event.srcElement.parentNode.nextElementSibling.className = "showIT";
    event.srcElement.parentNode.nextElementSibling.nextElementSibling.className = "more";
  }

  hideDetails(indexKey, event) {
    event.srcElement.parentNode.className = "hideIT";
    event.srcElement.parentNode.previousElementSibling.className = "hideIT";
    event.srcElement.parentNode.previousElementSibling.previousElementSibling.className = "more";
    event.srcElement.parentNode.previousElementSibling.previousElementSibling.focus();
  }

  onSearchCancel(event) {
    this.feed = this.feedRAW;
  }

  onSearchInput(event) {
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
  }

}
