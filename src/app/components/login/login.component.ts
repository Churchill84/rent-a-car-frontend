import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidLogin = false;
  error = '';
  @Output() onSignUpClick = new EventEmitter(); // Event emitter for switching to sign-up

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {

    // Reset error on new submission
    this.error = '';

    if (this.loginForm.invalid) {
      this.invalidLogin = true;
      return;
    }

    this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        success => {
          if (success) {
            this.authService.setLoggedIn(true);
            this.router.navigate(['/car-list']);
          }
          // Handle successful login// Adjust as per your routing setup
        },
        error => {
          // Handle error
          this.error = 'Invalid login credentials'; // Consider using a more dynamic error message
          this.invalidLogin = true; // Reset submission status
        }
      );
  }

  switchToSignUp() {
    this.onSignUpClick.emit(); // Emit event to switch to sign-up
  }
}
