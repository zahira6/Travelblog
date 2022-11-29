import { Component, OnInit } from '@angular/core';
import { MyblogsService } from 'src/app/users/myblogs.service';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-favorite-blogs',
  templateUrl: './favorite-blogs.component.html',
  styleUrls: ['./favorite-blogs.component.scss']
})
export class FavoriteBlogsComponent implements OnInit {
  blogs = this.myBlogssService.blogs
  favoriteBlogs = this.getFavoriteBlogs()

  constructor(public myBlogssService: MyblogsService, public blogsService: BlogService) { }

  ngOnInit(): void {
    this.getFavoriteBlogs()
  }

  getFavoriteBlogs() {
    return this.blogs.sort((a,b)=> a.votes > b.votes ? -1:1 )
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
