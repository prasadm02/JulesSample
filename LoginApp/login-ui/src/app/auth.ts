import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Adjust the URL to where your ASP.NET Core service will be running
  private apiUrl = 'http://localhost:5000/api/users/login'; // Example port, confirm actual port later
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          console.log('Token stored in localStorage');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    console.log('Token removed from localStorage');
    // Optionally, notify other parts of the app or redirect
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    // Add more sophisticated token validation later (e.g., check expiration)
    return !!token;
  }
}
