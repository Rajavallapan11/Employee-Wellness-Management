import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from '../Models/Event';
import { AuthService } from './service.service';
import { EnrollmentDetails } from '../Models/EnrollmentDetails';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseURL = 'http://localhost:8081/event';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseURL, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Event[]>('getAllEvents', [])));
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseURL}/${eventId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Event>('getEventById')));
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.baseURL}/create`, event, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Event>('createEvent')));
  }

  updateEvent(eventId: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseURL}/${eventId}`, event, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Event>('updateEvent')));
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${eventId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<void>('deleteEvent')));
  }

  enrollEmployee(employeeId: number, eventId: number): Observable<void> {
    const enrollmentRequest = { employeeId, eventId };
    return this.http.post<void>(`${this.baseURL}/register`, enrollmentRequest, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<void>('enrollEmployee')));
  }

  getEnrollmentDetails(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${eventId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<any>('getEnrollmentDetails')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return throwError(result as T);
    };
  }
}
