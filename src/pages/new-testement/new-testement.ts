import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Rx';
import {MomentModule} from "angular2-moment";

@Component({
  selector: 'page-new-testement',
  templateUrl: 'new-testement.html',
  providers: [MomentModule]
})

export class NewTestementPage {
  feedRAW: any = [];
  feed: any = [];
  errorMessage: any;
  searchFor: string = "";
  shouldShowCancel: boolean = false;

  constructor(public navCtrl: NavController, public data: Data, public storage: Storage) {
  }

  ngOnInit() {
    this.loadData(null);
  }

  ngOnDestroy() {
  }

  loadData(t): any {
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
