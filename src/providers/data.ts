import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Data {
  private bible: any = [];
  private oldTestement: any = [];
  private newTestement: any = [];
  public oldTestementBooks: any = [
    "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings",
    "1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah",
    "Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah",
    "Haggai","Zechariah","Malachi"
  ];
  public newTestementBooks: any = [
    "Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians",
    "Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter",
    "2 Peter","1 John","2 John","3 John","Jude","Revelation"
  ];

  constructor(public http: Http, public storage: Storage) {
    this.loadBible().then( data => {
      this.bible = data;
      this.bible.forEach(book => {
        //-- seperate old testement
        var match = this.oldTestementBooks.filter(record => record === book.book);
        if (match.length > 0) { this.oldTestement.push(this.repair(book)); }
        //-- seperate new testement
        var match = this.newTestementBooks.filter(record => record === book.book);
        if (match.length > 0) { this.newTestement.push(this.repair(book)); }
      });
    });
  }

  private repair(book) {
    var returnBook: any = book;
    for (var c in book.chapters) {
      var clean: any = [];
      for (var x in book.chapters[c]) {
        for (var n in book.chapters[c][x]) {
          clean.push(book.chapters[c][x][n].replace("{","<strong>").replace("}","</strong>"));
        }
      }
      returnBook.chapters[c].verses = clean;
    }
    return returnBook;
  }

  public getBible(): any {
    return this.bible;
  }

  public getOldTestement(): any {
    return this.oldTestement;
  }

  public getNewTestement(): any {
    return this.newTestement;
  }

  private loadBible(): Promise<any> {
    return new Promise(resolve => {
      this.http.get("assets/data/en_kjv.json")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        })
      ;
    });
  }

}

