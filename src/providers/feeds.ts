import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Feeds {
  public feedMaster: any = [];
  public feedsRaw: any = [];
  public cache: any = [];
  public myFeeds :any = [];
  public lastUpdate: any = Date();

  constructor(public http: Http, public storage: Storage) {
    this.loadMasterList().then( data => { } );
    this.storage.get('myFeeds').then(data => {
      this.myFeeds = JSON.parse(data) ? JSON.parse(data) : [];
    });

  }

  public refreshNews(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('myFeeds').then(data => {
        this.myFeeds = JSON.parse(data) ? JSON.parse(data) : [];
        resolve(this.buildNewsCache());
      });
    });
  }

  public clearMyFeeds(): any {
    this.storage.set('myFeeds', JSON.stringify([]) );
    return {success: true};
  }

  public clearCache(): any {
    this.storage.set('savedFeeds', JSON.stringify([]) );
    return {success: true};
  }

  public getMasterList(): any  {
    return this.feedMaster;
  }

  public loadMasterList(): Promise<any> {
    return Promise.resolve(
      this.http.get("assets/data/feeds.json")
        .map(res => res.json())
        .subscribe(data => {
          this.feedMaster = data;
          return true;
        })
    );
  }

  //-- {"key": "gamespot-news", "type": "rss", "icon": "", "logo": "", "url": "http://www.gamespot.com/feeds/news/", "feed": ""},
  private buildNewsCache(): any {
    //-- TODO: this will change to user selected feeds
    this.feedsRaw = [];
    this.cache = [];
    this.feedMaster.forEach(feed => {
      var match = this.myFeeds.filter(record => record.feed === feed.key);
      if (match.length > 0) {
        //-- relay through yahoo
        var url: string = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22'+encodeURIComponent(feed.url)+'%22&format=json';
        //-- get each feed
        this.http.get(url).subscribe(res => {
          var newFeed: any = feed;
          var rawFeed = this.processRawFeed(res.json(), feed.type);
          if (rawFeed.length > 0) {
            //-- updates for news display
            rawFeed.forEach(source => {
              source.icon = feed.icon;
              source.logo = feed.logo;
              source.pubDate = (new Date(source.pubDate)).getTime();
            });
            newFeed.feed = rawFeed;
          } else {
            newFeed.feed = [];
          }
          //-- add to raw feeds
          this.feedsRaw.push(newFeed);
          //-- if we have all the feeds, build cache
          if (this.feedsRaw.length >= this.myFeeds.length) {
            this.feedsRaw.forEach(source => {
              if (source.feed) {
                source.feed.forEach(news => {
                  //-- only include news with images
                  if (news.content) {
                    if (news.content.url) {
                      //-- TODO: filter based on user rules
                      this.cache.push(news);
                    }
                  }
                });
              }
            });
            //-- add to local cache
            this.cache = this.cache.sort(function(a,b){return b.pubDate - a.pubDate});
            //-- save cache to storage
            this.storage.set('savedFeeds', JSON.stringify(this.cache) );
            this.lastUpdate = Date();
          }
        });
      }
    });
  }

  private processRawFeed(data, type) {
    if (type == "rss" && data.query.results) {
      var returnItems = data.query.results.item;
      returnItems.forEach(source => {
        if (source.description) {
          try {
            source.description = source.description.replace(/<a /g, "<a target=\"_blank\" ");
          } catch(e) {
            source.description = JSON.stringify(source.description)
            source.description = source.description.replace(/<a /g, "<a target=\"_blank\" ");
          }
        }
      });
      return returnItems;
    } else if (type == "atom" && data.query.results) {
      return [];
    } else {
      return [];
    }
  }

}

