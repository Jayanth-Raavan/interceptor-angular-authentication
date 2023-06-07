import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  getUsers() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    console.log("token --> "+token + " headers ----> " + headers )
    
    return this.http.get('http://localhost:3000/users', { headers });
  }
}
