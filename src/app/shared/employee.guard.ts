import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  currentRole:any;
  constructor(private service : AuthService, private route : Router){}
  canActivate() {
    if(this.service.IsLoggedIn()){
      this.currentRole = this.service.GetRoleByToken(this.service.GetToken())
      if(this.currentRole=='adminUser'){
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
