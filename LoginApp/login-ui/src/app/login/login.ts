import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { AuthService } from '../auth'; // Uncommented and path updated to actual service file name
import { Router } from '@angular/router'; // Uncommented

@Component({
  selector: 'app-login',
  standalone: true, // Generated as standalone
  imports: [
    FormsModule, // Import FormsModule here
    CommonModule // Import CommonModule here
  ],
  templateUrl: './login.html', // Corrected path based on generation
  styleUrls: ['./login.css'] // Corrected path based on generation
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { } // Uncommented and updated

  onSubmit(): void {
    this.errorMessage = null;
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Navigate to a protected route, e.g., '/home'
        this.router.navigate(['/home']); // Create '/home' route later
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Login failed. Please check your credentials or try again later.';
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    });
  }
}
