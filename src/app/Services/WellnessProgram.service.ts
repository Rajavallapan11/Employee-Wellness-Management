import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WellnessProgram } from '../Models/WellnessProgram';
import { AuthService } from './service.service';
import { Employee } from '../Models/employee.model';
import { WellnessProgramApiResponse } from '../Models/WellnessProgramApiResponse';

@Injectable({
  providedIn: 'root'
})
export class WellnessProgramService {
  private baseURL = 'http://localhost:8081/wellnessprogram';
  private enrollmentUrl = 'http://localhost:8081/enrollment';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createProgram(program: WellnessProgram): Observable<WellnessProgram> {
    return this.http.post<WellnessProgram>(`${this.baseURL}/create`, program, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError<WellnessProgram>('createProgram'))
    );
  }

  updateProgram(programID: number, program: WellnessProgram): Observable<WellnessProgram> {
    return this.http.put<WellnessProgram>(`${this.baseURL}/${programID}`, program, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError<WellnessProgram>('updateProgram'))
    );
  }

  deleteProgram(programID: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${programID}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError<void>('deleteProgram'))
    );
  }

  getAllPrograms(): Observable<WellnessProgram[]> {
    return this.http.get<WellnessProgram[]>(this.baseURL, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError<WellnessProgram[]>('getAllPrograms', []))
    );
  }

  enrollEmployee(employeeId: number, programId: number): Observable<void> {
    const enrollmentRequest = { employeeId, programID: programId };
    return this.http.post<void>(`${this.enrollmentUrl}/enroll`, enrollmentRequest, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError<void>('enrollEmployee'))
    );
  }

  getProgramDetails(programId: number): Observable<WellnessProgramApiResponse> {
    return this.http.get<WellnessProgramApiResponse>(`${this.baseURL}/${programId}/details`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError<WellnessProgramApiResponse>('getProgramDetails'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log to console
      return throwError(error); // Return error for proper error handling
    };
  }
}
