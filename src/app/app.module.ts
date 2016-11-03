import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { Data } from '../providers/data';
import {MomentModule} from 'angular2-moment';
//-- app pages
import { QuotePage } from '../pages/quote/quote';
import { OldTestementPage } from '../pages/old-testement/old-testement';
import { NewTestementPage } from '../pages/new-testement/new-testement';
import { AboutPage } from '../pages/about/about';
import { ReadPage } from '../pages/read/read';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    QuotePage,
    OldTestementPage,
    NewTestementPage,
    AboutPage,
    ReadPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    QuotePage,
    OldTestementPage,
    NewTestementPage,
    AboutPage,
    ReadPage
  ],
  providers: [
    Storage,
    Data
  ]
})

export class AppModule {

}
