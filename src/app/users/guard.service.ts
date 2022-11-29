import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
  constructor(private authService: AuthService, private router: Router) { }
    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree{
      if (this.authService.LoggedIn() == true) {
          return true
      } else {
        this.router.navigate(['/login'])
        return false;
      }
  }
}
