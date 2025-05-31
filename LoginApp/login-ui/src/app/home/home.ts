import { Component } from '@angular/core';
import { AuthService } from '../auth'; // Corrected path to actual service file
import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common'; // Only if needed for directives

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // CommonModule // Add if using common directives like *ngIf, *ngFor
  ],
  templateUrl: './home.html', // Path based on CLI output
  styleUrls: ['./home.css']    // Path based on CLI output
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
