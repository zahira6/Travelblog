import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Diary } from '../model/diary';

const AUTH_API = 'http://localhost:8080/user/profile/mydiary';


@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  diaries: Diary[] = [];
  tokenKey = 'access_token';
  
  constructor(private http: HttpClient, private router: Router) { }

  getDiaries(){
    return this.http.get<[Diary]>(`${AUTH_API}`).subscribe(i => {
        i.forEach( diary => {
          const id = diary.id;
          const title = diary.title;
          const description = diary.description;
          const owner = diary.owner;
          const date = diary.date
          if(this.diaries.filter( t => t.id === id).length === 0){
            this.diaries.push({id, title, description, owner, date})
          }
  })  })
}
  addDiary(id: string, title: string, description: string, owner: string, date: Date){
    let newDate = new Date(date).getTime()
    return this.http.post<Diary>(`${AUTH_API}`, 
      {'id': id, "title": title, "description": description, 'owner': owner, "date": newDate}
    ).subscribe(i => {
      id = i.id
      title = i.title,
      description = i.description,
      owner = i.owner,
      date = new Date(i.date),
      date.toDateString()
      this.diaries.unshift({id, title, description, owner, date})
    })
    }


  deleteDiary(id: string){
    const options = {
      body: {
        id: id
      },
    };
    return this.http.delete<string>(`${AUTH_API}`, options).subscribe(i => {
      const index = this.diaries.findIndex(t => t.id === id);
      if (index >= 0) {
      this.diaries.splice(index, 1);
    }})}
      

  updateDiaryById(id: string, title: string, description: string, date: Date): void {
    const index = this.diaries.findIndex(t => t.id === id);
    if (index >= 0) {
      this.diaries[index].title = title;
      this.diaries[index].description = description;
      this.diaries[index].date = date;
    }
  }

}
