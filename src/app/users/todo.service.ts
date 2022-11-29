import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../model/todo';

const AUTH_API = 'http://localhost:8080/user/profile/mytodo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  todos: Todo[] = [];
  tokenKey = 'access_token';
  filter: 'all' | 'active' | 'done' = 'all';

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }


  getTodos(){
    return this.http.get<[Todo]>(`${AUTH_API}`).subscribe(i => {
        i.forEach( todo => {
          const id = todo.id;
          const title = todo.title;
          const description = todo.description;
          const todoOwner = todo.todoOwner;
          const dueDate = todo.dueDate;
          if(this.todos.filter( t => t.id === id).length === 0){
            this.todos.push({id, title, description, todoOwner, dueDate})
          }
  })  })
}

  getDoneTodos(done?: boolean): Todo[] {
    return this.todos
      .filter(t => done === undefined || (done && t.doneDate) || (!done && !t.doneDate))
  }


  addTodo(id: string, title: string, description: string, todoOwner: string, dueDate: Date){
    let newdueDate = new Date(dueDate).getTime()
    return this.http.post<Todo>(`${AUTH_API}`, 
      {'id': id, "title": title, "description": description, 'todoOwner': todoOwner, "dueDate": newdueDate}
    ).subscribe(i => {
      id = i.id
      title = i.title,
      description = i.description,
      todoOwner = i.todoOwner,
      dueDate = new Date(i.dueDate),
      dueDate.toDateString()
      this.todos.unshift({id, title, description, todoOwner, dueDate})
    })
    }


  deleteTodo(id: string){
    const options = {
      body: {
        id: id
      },
    };
    return this.http.delete<string>(`${AUTH_API}`, options).subscribe(i => {
      const index = this.todos.findIndex(t => t.id === id);
      if (index >= 0) {
      this.todos.splice(index, 1);
    }})}
      

  updateTodoById(id: string, title: string, description: string, dueDate: Date): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      this.todos[index].title = title;
      this.todos[index].description = description;
      this.todos[index].dueDate = dueDate;
    }
  }

  toggleDoneStateById(id: string): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      if (this.todos[index].doneDate) {
        this.todos[index].doneDate = undefined;
      } else {
        this.todos[index].doneDate = true;
      }
    }
  }
}
