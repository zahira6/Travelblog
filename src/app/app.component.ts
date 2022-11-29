import { Component } from '@angular/core';
import { AuthService } from './users/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Travelblog';

  constructor(private auth : AuthService){}

  loggedIn(): boolean{
    return this.auth.LoggedIn();
  }

  ngOnInit() {}

}

