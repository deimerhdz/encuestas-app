import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public username:string='';
  constructor(private cookie:CookieService,private router:Router) { }

  ngOnInit(): void {
    this.username = this.cookie.get('nombre');
  }
  logout(){
    this.cookie.deleteAll('/');
    this.router.navigateByUrl('/')
  }
}
