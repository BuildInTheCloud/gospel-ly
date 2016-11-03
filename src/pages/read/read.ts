import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public data: Data) {

  }

}
