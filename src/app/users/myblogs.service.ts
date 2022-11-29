import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../model/blog';

const AUTH_API = 'http://localhost:8080/user/profile/myblogs';

@Injectable({
  providedIn: 'root'
})
export class MyblogsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  blogs: Blog[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getBlogs(){
    return this.http.get<[Blog]>(`${AUTH_API}`).subscribe(i => {
      i.forEach( blog => {
        const id = blog.id;
        const title = blog.title;
        const description = blog.description;
        const category = blog.category;
        const rating = blog.rating;
        const owner = blog.owner;
        const votes = blog.votes;
        const date = blog.date;
        if(this.blogs.filter( t => t.id === id).length === 0){
        this.blogs.push({id, title, description, category, rating, owner, votes, date})
        }
      });
  })
}

  addBlog(id: string, title: string, description: string, category: string, rating: string, owner: string, date: Date, votes: number){
    let newDate = new Date(date).getTime()
    return this.http.post<Blog>(`${AUTH_API}`, 
    {'id': id, "title": title, "description": description, 'category': category, 'rating': rating, 'owner': owner, "date": newDate, "votes": votes}
  ).subscribe(i => {
    id = i.id,
    title = i.title,
    description = i.description,
    category = i.category,
    rating = i.rating,
    owner = i.owner,
    date = new Date(i.date),
    votes = i.votes
    this.blogs.unshift({id, title, description, category, rating, owner, date, votes
    })
  })}

  deleteBlog(id: string){
    const options = {
      body: {
        id: id
      },
    };
    return this.http.delete<string>(`${AUTH_API}`, options).subscribe(i => {
      const index = this.blogs.findIndex(t => t.id === id);
      if (index >= 0) {
      this.blogs.splice(index, 1);
    }})}
}
