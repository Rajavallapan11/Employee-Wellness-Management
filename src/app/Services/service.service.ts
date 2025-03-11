import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8081/auth';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  register(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiURL}/new`, employeeData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  login(loginRequest: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, loginRequest).pipe(
      tap((response: any) => {
        if (response && response.jwt && this.isBrowser) {
          sessionStorage.setItem('jwt', response.jwt);
          sessionStorage.setItem('name', response.name);
          sessionStorage.setItem('employeeId', response.employeeId);
          console.log(response.employeeId);
          console.log(response.name);
         
          this.tokenSubject.next(response.jwt);
        }
      })
    );
  }

  getToken(): string | null {
    return this.isBrowser ? sessionStorage.getItem('jwt') : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.roles[0];
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
    return null;
  }

  getEmployeeId(): number | null {
    const employeeId = sessionStorage.getItem('employeeId');
    return employeeId ? parseInt(employeeId, 10) : null;
  }

  getUsername(): string | null {
    return sessionStorage.getItem('name');
  }

  logout(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('Id');
    }
    this.router.navigate(['/login']);
  }
}
