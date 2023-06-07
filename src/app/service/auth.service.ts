import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private route: Router) { }


  //login
  apiUrl = "http://localhost:3000/login/";

  proceedLogin(usercred:any){
    return this.http.post(this.apiUrl,usercred);
  }
  IsLoggedIn(){
    return localStorage.getItem('token')!=null;
  }
  GetToken(){
    return localStorage.getItem('token')||'';
   }
   LogOut(){
    alert('INVALID CREDENTIALS')
    localStorage.clear();
    this.route.navigate(['login']);
   }

   GenerateRefreshToke(){
    let input ={
      "jwtToken": this.GetToken(),
      "refreshToken":this.GetRefreshToken()
    }
    return this.http.post(this.apiUrl + 'refresh', input)
   }

   GetRefreshToken(){
    return localStorage.getItem('token')||'';
   }

   SaveTokens(tokenData:any){
    localStorage.setItem('token',tokenData.token);
    localStorage.setItem('refreshToken',tokenData.refreshToken);
   }
   HaveAccess(){
    var loginToken = localStorage.getItem('token')|| '';
    var _extractedToken = loginToken.split('.')[1];
    var _atobData = atob(_extractedToken);
    var _finalData = JSON.parse(_atobData);
    console.log(_finalData);
    if(_finalData.username == 'adminUser'){
      return true;
    }
    alert("You don't have access ");
    return false;
   }

   tokenResponse:any;
   GetRoleByToken(token:any){
    let _token = token.split('.')[1]
    this.tokenResponse=JSON.parse(atob(_token))
    console.log("ResponseToken ---> "+this.tokenResponse[1])
    return this.tokenResponse.username;
   }

   private _updateMenu = new Subject<void>();
   get updateMenu(){
    return this._updateMenu;
   }
}
