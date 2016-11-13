import { Component } from '@angular/core';

//-- app pages for tabs
import { QuotePage } from '../quote/quote';
import { OldTestementPage } from '../old-testement/old-testement';
import { NewTestementPage } from '../new-testement/new-testement';
import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabQuote: any = QuotePage;
  tabOldTestement: any = OldTestementPage;
  tabNewTestement: any = NewTestementPage;
  tabSettings: any = SettingsPage;
  tabAbout: any = AboutPage;

  constructor() {

  }
}
