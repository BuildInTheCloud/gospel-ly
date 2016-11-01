import { Component } from '@angular/core';

//-- app pages for tabs
import { NewsPage } from '../news/news';
import { ProfilePage } from '../profile/profile';
import { RefreshPage } from '../refresh/refresh';
import { AboutPage } from '../about/about';
import { FeedsPage } from '../feeds/feeds';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabNews: any = NewsPage;
  tabProfile: any = ProfilePage;
  tabRefresh: any = RefreshPage;
  tabAbout: any = AboutPage;
  tabFeedManager: any = FeedsPage;

  constructor() {

  }
}
