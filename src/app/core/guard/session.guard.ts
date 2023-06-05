import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private cookie:CookieService,private router:Router){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  checkCookie(): boolean{
    try{
     const token = this.cookie.check('token');
     if(token){
      return true;
     }else{
      this.router.navigateByUrl('/auth/login');
      return false;
     }
    }catch(e){
      console.log('Ups, algo sucedio',e);
      return false;
    }
  }
}
