import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/service.service';  // Adjust import path if necessary
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      bmi: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      contactNumber: ['', Validators.required],
      hobbies: ['', Validators.required]
    });
  }


  get formControls() { return this.registerForm.controls; }

  GotoLogin() {
    this.router.navigate(['/login']);
  }
  

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    console.log('Registering with data:', this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        alert("Registration successful");
        this.GotoLogin();
        this.registerForm.reset();
      },
      error: (error) => {
        console.error('Error during registration:', error);
        if (error.error) {
          this.errorMessage = error.error;
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }

    });
  }
}
