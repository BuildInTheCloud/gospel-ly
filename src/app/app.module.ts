import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { Feeds } from '../providers/feeds';
import {MomentModule} from 'angular2-moment';
//-- app pages
import { NewsPage } from '../pages/news/news';
import { ProfilePage } from '../pages/profile/profile';
import { RefreshPage } from '../pages/refresh/refresh';
import { AboutPage } from '../pages/about/about';
import { FeedsPage } from '../pages/feeds/feeds';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    NewsPage,
    ProfilePage,
    RefreshPage,
    AboutPage,
    FeedsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    NewsPage,
    ProfilePage,
    RefreshPage,
    AboutPage,
    FeedsPage
  ],
  providers: [
    Storage,
    Feeds
    /*
    { provide: Feeds,
        useFactory: (config: Feeds) => () => config.init(),
        deps: [],
        multi: true
    }
    */
  ]
})

export class AppModule {

}
