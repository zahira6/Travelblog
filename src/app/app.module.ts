import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { BlogsComponent } from './Homepage/blogs/all-blogs/blogs.component';
import { LogoutComponent } from './users/logout/logout.component';
import { CategoriesComponent } from './Homepage/categories/categories.component';
import { StatisticsComponent } from './Homepage/statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './model/auth-interceptor';
import { AuthService } from './users/auth.service';
import { DiaryComponent } from './users/diary/diary.component';
import { TodoComponent } from './users/todo/todo.component';
import { MyblogsComponent } from './users/myblogs/myblogs.component';
import { MatSelectModule } from "@angular/material/select";
import { NewBlogsComponent } from './Homepage/blogs/new-blogs/new-blogs.component';
import { FavoriteBlogsComponent } from './Homepage/blogs/favorite-blogs/favorite-blogs.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogsComponent,
    LogoutComponent,
    CategoriesComponent,
    StatisticsComponent,
    DiaryComponent,
    TodoComponent,
    MyblogsComponent,
    NewBlogsComponent,
    FavoriteBlogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true},
      AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
