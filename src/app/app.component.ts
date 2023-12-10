import {Component} from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  showSignUp = false;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
    // Subscribe to an observable that notifies about login status
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  handleSignUpClick() {
    this.showSignUp = true;
  }
}
