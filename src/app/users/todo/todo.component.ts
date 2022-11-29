import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  Title = '';
  Description = '';
  DueDate = new Date();
  doneDate: Boolean = false;
  showDone = false;
  todoOwner = '';
  Id = '';
  todos= this.todoService.todos

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.allTodos()
  }

  allTodos(){
    this.todoService.getTodos()
    }    
    

  newTodo(): void {
      this.todoService.addTodo(this.Id, this.Title, this.Description, this.todoOwner, this.DueDate)
      this.allTodos()
      }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
    this.todoService.getTodos()
  }
}