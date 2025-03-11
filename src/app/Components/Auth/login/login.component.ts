import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        console.log('Login Response:', response);
        const userRole = this.authService.getRole();  // Get role from AuthService
        const username = this.authService.getUsername();  // Get username from token
        console.log('Username:', username);  // Store username for later use
  
        if (userRole === "ROLE_ADMIN") {
          console.log('Admin login');
          this.router.navigate(['/admin_dashboard'], { queryParams: { username } });
        } else if (userRole === 'ROLE_USER') {
          console.log('Employee login');
          this.router.navigate(['/dashboard'], { queryParams: { username } });
        } else {
          console.log('User role is undefined');
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid credentials';
      },
    });
  }

  
}
