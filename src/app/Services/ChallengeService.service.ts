import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Challenge } from '../Models/Challenge';
import { AuthService } from './service.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private baseUrl = 'http://localhost:8081/challenge';

  constructor(private http: HttpClient, private authService:AuthService) {}

  private getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include JWT token in Authorization header
      })
    };
  }

  getAllChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.baseUrl}`,  this.getHttpOptions());

  }

  createChallenge(challenge: Challenge): Observable<Challenge> {
    return this.http.post<Challenge>(`${this.baseUrl}/create`, challenge,  this.getHttpOptions());

  }

  updateChallenge(challengeId: number, challenge: Challenge): Observable<Challenge> {
    return this.http.put<Challenge>(`${this.baseUrl}/${challengeId}`, challenge,   this.getHttpOptions());

  }

  deleteChallenge(challengeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${challengeId}`,   this.getHttpOptions());

  }

  getChallengeById(challengeId: number): Observable<Challenge> {
    return this.http.get<Challenge>(`${this.baseUrl}/${challengeId}/details`, this.getHttpOptions());
  }

  enrollChallenge(employeeId: number, challengeId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/participation`, { employeeId, challengeId }, this.getHttpOptions())
      .pipe(
        catchError(error => {
          console.error('Error enrolling in challenge:', error);
          return throwError(error);
        })
      );
  }

}
