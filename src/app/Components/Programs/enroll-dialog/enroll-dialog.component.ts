import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../../../Services/EventService.service';
import { AuthService } from '../../../Services/service.service';

@Component({
  selector: 'app-enroll-dialog',
  standalone: true,
  imports: [],
  templateUrl: './enroll-dialog.component.html',
  styleUrls: ['./enroll-dialog.component.css']
})
export class EnrollDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { programName: string, programId: number },
    private snackBar: MatSnackBar,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  enroll(): void {
    console.log('Enroll method called'); // Debugging log
  
    const employeeId = this.authService.getEmployeeId();
    const programId = this.data.programId;
  
    if (employeeId && programId) {
      console.log('Enrolling employee:', { employeeId, programId }); // Debugging log
      this.eventService.enrollEmployee(employeeId, programId).subscribe({
        next: () => {
          this.snackBar.open('Successfully enrolled in event!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.dialogRef.close('confirm');
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
    } else {
      this.snackBar.open('Failed to get employee or event information.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }
  
}
