import { Component } from '@angular/core';

//-- app pages for tabs
import { QuotePage } from '../quote/quote';
import { OldTestementPage } from '../old-testement/old-testement';
import { NewTestementPage } from '../new-testement/new-testement';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabQuote: any = QuotePage;
  tabOldTestement: any = OldTestementPage;
  tabNewTestement: any = NewTestementPage;
  tabAbout: any = AboutPage;

  constructor() {

  }
}
