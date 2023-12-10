import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {

      this.authService.register(this.signupForm.value).subscribe({
        next: (response) => {
          // Navigate to login page if the registration is successful
          console.log(response)
          this.router.navigate(['/login']);
        },
        error: (err) => {
          // Handle error response
          console.log(err);
          this.errorMessage = err.error.message || 'Registration failed';
        }
      });
    }
  }
}
