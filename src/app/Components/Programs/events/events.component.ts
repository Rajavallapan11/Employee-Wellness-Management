import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../../../Services/EventService.service';
import { AuthService } from '../../../Services/service.service';
import { EnrollDialogComponent } from '../../Programs/enroll-dialog/enroll-dialog.component';
import { Event } from '../../../Models/Event';
import { Employee } from '../../../Models/employee.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  selectedEventId: number | null = null;
  enrolledEmployees: Employee[] =   [];
  selectedProgramDetails: Event | null = null;
  employeeId: number | null = null;
  userRole: string | null = null;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setEmployeeId();
    this.loadEvents();
    this.userRole = this.authService.getRole();
  }

  setEmployeeId(): void {
    this.employeeId = this.authService.getEmployeeId();
    console.log('Employee ID:', this.employeeId);
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        console.log('Events loaded:', this.events);
      },
      error: (err) => {
        this.snackBar.open('Failed to load events. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  openEnrollDialog(event: Event): void {
    const dialogRef = this.dialog.open(EnrollDialogComponent, {
      width: '400px',
      data: { programName: event.eventName, programId: event.eventId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.snackBar.open('Enrollment successful.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  viewEnrollmentDetails(eventId: number): void {
    this.selectedEventId = eventId;
    this.eventService.getEnrollmentDetails(eventId).subscribe({
      next: (response) => {
        if (response && response.eventregister) {
          this.enrolledEmployees = response.eventregister;
          console.log('Enrolled Employees:', this.enrolledEmployees);
        } else {
          console.error('Unexpected response format:', response);
          this.snackBar.open('Unexpected response format. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      },
      error: (err) => {
        console.error('Error fetching enrollment details:', err);
        this.snackBar.open('Failed to fetch enrollment details. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  closeDetails(): void {
    this.selectedEventId = null;
    this.enrolledEmployees = [];
  }
}
