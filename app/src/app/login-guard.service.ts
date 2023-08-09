import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
    constructor(private service: DashboardService, private router: Router) { }
    canActivate(): boolean {
        if(this.service.isUserLoggedIn()) {
            return true;
        }
        this.service.setUser("User");
        this.router.navigate(['/login']);
        return false;
    }

}
