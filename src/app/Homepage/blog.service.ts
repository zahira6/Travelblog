import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../model/blog';
import { MyblogsService } from '../users/myblogs.service';
import { BlogsComponent } from './blogs/all-blogs/blogs.component';

const AUTH_API = 'http://localhost:8080/homepage/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogs = this.myblogsService.blogs;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  id = ''

  constructor(private http: HttpClient, private router: Router, public myblogsService: MyblogsService) { }

  getBlogId(): string{
    this.blogs.forEach(blog => {
      const id = blog.id
      return id
    });
    console.log(this.id)
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
