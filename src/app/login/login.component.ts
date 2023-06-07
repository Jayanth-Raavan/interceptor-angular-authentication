import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenInterceptorService } from '../service/token-interceptor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  messageClass ='';
  message = '';
  customerId : any;
  editData : any;
  responseData: any;

  constructor(private service : AuthService, private route : Router, private tokenService : TokenInterceptorService) { 
    localStorage.clear();
  }
  Login = new FormGroup({
    username : new FormControl("",Validators.required),
    password : new FormControl("",Validators.required)

  });

  //login
  ProceedLogin(){
    if(this.Login.valid){
      this.service.proceedLogin(this.Login.value).subscribe(result=>{
        this.responseData = result;
        if(this.responseData != null){
          console.log(this.responseData)
          console.log("result --> "+result);
          localStorage.setItem('token',this.responseData.token);
          localStorage.setItem('refreshtoken',this.responseData.refreshToken);
          this.service.updateMenu.next();
          this.route.navigate(['']);
          console.log(this.tokenService.handleRefreshToken( this.responseData.token,this.responseData.refreshToken))
        }
      })
    }
  }
  
}

