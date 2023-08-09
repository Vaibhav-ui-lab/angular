import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'routing';

  constructor(private service: DashboardService, private router: Router){}

  getU(){
    return this.service.getUser();
  }

  isLogin(){
    return this.service.isUserLoggedIn();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
