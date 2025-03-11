import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee.model';
import { AuthService } from './service.service';
 // Import AuthService to get the token

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8081/auth'; // API endpoint for employee-related requests

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Dynamically set HttpHeaders including the JWT token
  private getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include JWT token in Authorization header
      })
    };
  }

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`, this.getHttpOptions());
  }

  // Get an employee by ID
  getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/employee/${id}`;
    return this.http.get<Employee>(url, this.getHttpOptions());
  }

  // Create a new employee
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/new`, employee, this.getHttpOptions());
  }

  // Update an existing employee
  updateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${employee.employeeId}`;
    return this.http.put<Employee>(url, employee, this.getHttpOptions());
  }

  // Delete an employee
  deleteEmployee(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.getHttpOptions());
  }
}
