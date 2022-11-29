import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-profle',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  todos= this.todoService.todos
  diaries = this.diaryService.diaries
  showDone = false;

  constructor(public todoService: TodoService, public diaryService: DiaryService) { }

  ngOnInit(): void {
    this.allTodos()
    this.allDiaries()
  }

  allTodos(){
    this.todoService.getTodos()
    }    

  allDiaries(){
    this.diaryService.getDiaries()
  }

}

