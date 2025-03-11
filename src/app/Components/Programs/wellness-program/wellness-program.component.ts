import { Component, OnInit } from '@angular/core';
import { WellnessProgram } from '../../../Models/WellnessProgram';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EnrollDialogComponent } from '../../enroll-dialog/enroll-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WellnessProgramService } from '../../../Services/WellnessProgram.service';
import { AuthService } from '../../../Services/service.service';
import { Employee } from '../../../Models/employee.model';
import { WellnessProgramApiResponse } from '../../../Models/WellnessProgramApiResponse';

@Component({
  selector: 'app-wellness-program',
  standalone: true,
  templateUrl: './wellness-program.component.html',
  styleUrls: ['./wellness-program.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
})
export class WellnessProgramComponent implements OnInit {
  wellness: WellnessProgram[] = [];
  employeeId: number | null = null;
  selectedProgramDetails: WellnessProgram | null = null;
  enrolledEmployees: Employee[] = [];
  userRole: string | null = null;

  constructor(
    private wellnessProgramService: WellnessProgramService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setEmployeeId();
    this.loadPrograms();
    this.userRole = this.authService.getRole();
  }

  setEmployeeId(): void {
    this.employeeId = this.authService.getEmployeeId();
    if (this.employeeId) {
      console.log('Employee ID is:', this.employeeId);
    } else {
      console.error('Failed to retrieve employee ID.');
    }
  }

  loadPrograms(): void {
    this.wellnessProgramService.getAllPrograms().subscribe({
      next: data => {
        this.wellness = this.filterValidPrograms(data);
        console.log('Loaded programs:', this.wellness);
      },
      error: err => {
        console.error('Error loading programs:', err);
        this.snackBar.open('Failed to load programs. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  filterValidPrograms(programs: WellnessProgram[]): WellnessProgram[] {
    return programs.filter(program => program && program.programID && program.wellnessProgramName);
  }

  openEnrollDialog(program: WellnessProgram): void {
    const dialogRef = this.dialog.open(EnrollDialogComponent, {
      width: '400px',
      data: { programName: program.wellnessProgramName, programId: program.programID }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm' && this.employeeId) {
       
      }
    });
  }

  enrollInProgram(programId: number): void {
    if (this.employeeId) {
      this.wellnessProgramService.enrollEmployee(this.employeeId, programId).subscribe({
        next: () => {
          this.snackBar.open('Successfully enrolled in program!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        error: err => {
          console.error('Enrollment error:', err);
          this.snackBar.open('Enrollment failed. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    }
  }

  viewEnrollments(program: WellnessProgram): void {
    if (this.employeeId) {
      this.wellnessProgramService.getProgramDetails(program.programID).subscribe({
        next: (response: WellnessProgramApiResponse) => {
          // Assuming response is of type WellnessProgramApiResponse
          this.selectedProgramDetails = this.mapApiResponseToModel(response);
          this.enrolledEmployees = this.selectedProgramDetails.enrolledEmployees || []; // Correct property name
          console.log('Enrolled employees:', this.enrolledEmployees);
        },
        error: err => {
          console.error('Error fetching program details:', err);
          this.snackBar.open('Failed to fetch program details. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    }
  }
  
  private mapApiResponseToModel(response: WellnessProgramApiResponse): WellnessProgram {
    return {
      ...response,
      enrolledEmployees: response.enrolledemployees // Map to the correct property name
    };
  }
  closeCard(): void {
    this.selectedProgramDetails = null;
  }
}
