import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  title = 'InterceptorAndAngAuth';
  displayMenu = false;
  displayEmployee=false;
  displayUser = false;
  currentRole:any
  ngOnInit(): void {
      
      this.service.updateMenu.subscribe(result=>{
        this.MenuDisplay();
      })
      this.MenuDisplay();
  }
  ngDoCheck(): void {
      if(this.route.url == '/login'){
        this.displayMenu = false;
      }
      else{
        this.displayMenu = true;

      }
  }
  constructor(private service : AuthService, private route : Router){

  }
  MenuDisplay(){
    if(this.service.GetToken()!='')
    this.currentRole = this.service.GetRoleByToken(this.service.GetToken())
    this.displayEmployee=this.currentRole=='adminUser';
    this.displayUser=(this.currentRole=='adminUser'|| this.currentRole=='demoUser')
  }
}
