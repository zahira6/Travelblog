import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/model/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories = Categories
  enumKeys = Object.keys(this.categories);
  entries = Object.entries(this.categories)

  constructor() { }

  ngOnInit(): void {
  }

  getFirstLetter(entries:string): string {
    var seperateWords = entries.split(" ");
    var firstLetter = '';
    for (var i = 0; i < seperateWords.length; i++){
      firstLetter = (firstLetter + seperateWords[i].substr(0,1));
    }
    return firstLetter
  }

  getAllLetters(): string[] {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.split("")
  }

}
