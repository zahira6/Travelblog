import { Component, OnInit } from '@angular/core';
import { MyblogsService } from '../myblogs.service';
import { BlogService } from 'src/app/Homepage/blog.service';
import { Categories } from 'src/app/model/categories';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.scss']
})
export class MyblogsComponent implements OnInit {
  Title = '';
  Description = '';
  Rating = '';
  Owner = '';
  Id = '';
  Votes = 0;
  Date = new Date();
  blogs = this.myblogsService.blogs;
  categories = Categories;
  selected = '';
  Category = this.selected;
  Ratings = this.selected;
  selectedFW = new FormControl()
  enumKeys = Object.keys(this.categories);
  user: any;
  emailUser: any;
  tokenKey = 'access_token';
  token = sessionStorage.getItem(this.tokenKey);
  constructor(public myblogsService: MyblogsService, public authService: AuthService) {
   }

  ngOnInit(): void {
    this.currentUser()
    this.allBlogs()
  }

  currentUser(): void {
    this.user = this.authService.currentUser(this.token)
    this.emailUser = this.user['email']
  }

  getCategories(): Array<string>{
    return this.enumKeys
  }

  allBlogs(): void{
      this.myblogsService.getBlogs()
  }

  newBlog(): void{
    this.myblogsService.addBlog(this.Id, this.Title, this.Description, this.Category, this.Rating, this.Owner, this.Date, this.Votes)
    this.allBlogs()
  }

  deleteBlog(id: string): void {
    this.myblogsService.deleteBlog(id)
    this.myblogsService.getBlogs()
  }


}
