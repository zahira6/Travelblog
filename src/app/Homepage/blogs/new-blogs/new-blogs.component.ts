import { Component, OnInit } from '@angular/core';
import { MyblogsService } from 'src/app/users/myblogs.service';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-new-blogs',
  templateUrl: './new-blogs.component.html',
  styleUrls: ['./new-blogs.component.scss']
})
export class NewBlogsComponent implements OnInit {
  blogs = this.myBlogsService.blogs
  newBlogs = this.getNewBlogs()

  constructor(public myBlogsService: MyblogsService, public blogsService: BlogService) { }

  ngOnInit(): void {
    this.getNewBlogs()
  }

  getNewBlogs() {
    let t = new Date();
    let d = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - 7));
    return this.blogs.filter(blog => new Date(blog.date) >= d)
    }

  voteTheButton(id: string) {
    const index = this.blogs.findIndex(t => t.id === id);
    var votes = this.blogs[index].votes
    this.blogs[index].votes = votes+1
    console.log(votes+1)
  }
  
  getVotes(id: string): number {
    return this.blogsService.getVotes(id)
  }
}
