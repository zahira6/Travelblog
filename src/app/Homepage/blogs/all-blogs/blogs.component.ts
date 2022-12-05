import { Component, OnInit } from '@angular/core';
import { MyblogsService } from 'src/app/users/myblogs.service';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  Date = new Date();
  blogs = this.myblogsService.blogs

  constructor(public blogService: BlogService, public myblogsService: MyblogsService) { }

  ngOnInit(): void {
    this.blogService.getBlogs()
  }
  
  voteTheButton(id: string) {
    const index = this.blogs.findIndex(t => t.id === id);
    var votes = this.blogs[index].votes
    this.blogs[index].votes = votes+1
  }

}
