import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MyblogsService } from '../users/myblogs.service';

const AUTH_API = 'http://localhost:8080/homepage/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogs = this.myblogsService.blogs;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public id = '';

  constructor(private http: HttpClient, private router: Router, public myblogsService: MyblogsService) { }

  getBlogId(): string {
    this.blogs.forEach(blog => {
      this.id = blog.id
    });
      return this.id
  }

  getBlogs(){
    this.myblogsService.getBlogs()
  }

  getVotes(id: string): number {
    const votes = this.blogs[this.blogs.findIndex(t => t.id === id)].votes; 
    return votes;
  }

}
