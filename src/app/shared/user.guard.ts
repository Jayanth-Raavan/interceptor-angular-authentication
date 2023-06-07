import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private service : AuthService, private route : Router){}
  currentRole : any;
  canActivate() {
    if(this.service.IsLoggedIn()){
      this.currentRole = this.service.GetRoleByToken(this.service.GetToken())
      if(this.currentRole =='demoUser' || 'adminUser'){
        return true;
      }
      else{
        alert('you are not authorized to access this menu');
        this.route.navigate([''])
        return false;
      }
    }else{
    this.route.navigate(['login']);
    return false;
  }
  }
  
}
