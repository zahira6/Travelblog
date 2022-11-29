import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './users/logout/logout.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { BlogsComponent } from './Homepage/blogs/all-blogs/blogs.component';
import { ProfileComponent } from './users/profile/profile.component';
import { CategoriesComponent } from './Homepage/categories/categories.component';
import { StatisticsComponent } from './Homepage/statistics/statistics.component';
import { GuardService } from './users/guard.service';
import { TodoComponent } from './users/todo/todo.component';
import { DiaryComponent } from './users/diary/diary.component';
import { MyblogsComponent } from './users/myblogs/myblogs.component';
import { FavoriteBlogsComponent } from './Homepage/blogs/favorite-blogs/favorite-blogs.component';
import { NewBlogsComponent } from './Homepage/blogs/new-blogs/new-blogs.component';

const routes: Routes = [
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent},
  { path: "user/logout", component: LogoutComponent, canActivate: [GuardService] },
  { path: "homepage/blogs", component: BlogsComponent },
  { path: "homepage/blogs/all", component: BlogsComponent },
  { path: "homepage/blogs/new", component: NewBlogsComponent },
  { path: "homepage/blogs/favorites", component: FavoriteBlogsComponent },
  { path: "user/profile", component: ProfileComponent, canActivate: [GuardService] },
  { path: "user/profile/myblogs", component: MyblogsComponent, canActivate: [GuardService] },
  { path: "user/profile/mydiary", component: DiaryComponent, canActivate: [GuardService] },
  { path: "user/profile/mytodo", component: TodoComponent, canActivate: [GuardService] },
  { path: "homepage/categories", component: CategoriesComponent },
  { path: "homepage/statistics", component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
