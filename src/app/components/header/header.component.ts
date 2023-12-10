import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
