import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  Title = '';
  Description = '';
  Id = '';
  Owner = '';
  Date = new Date();
  diaries = this.diaryService.diaries

  constructor(public diaryService: DiaryService) { }

  ngOnInit(): void {
    this.allDiaries()
  }

  allDiaries(){
    this.diaryService.getDiaries()
  }

  newDiary(): void {
    this.diaryService.addDiary(this.Id, this.Title, this.Description, this.Owner, this.Date)
    this.allDiaries()
  }

  deleteDiary(id: string): void {
    this.diaryService.deleteDiary(id)
    this.diaryService.getDiaries()
  }
}


