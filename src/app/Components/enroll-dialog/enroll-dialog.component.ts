import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WellnessProgramService } from '../../Services/WellnessProgram.service';
import { AuthService } from '../../Services/service.service';

@Component({
  selector: 'app-enroll-dialog',
  templateUrl: './enroll-dialog.component.html',
  styleUrls: ['./enroll-dialog.component.css']
})
export class EnrollDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { programName: string, programId: number },
    private snackBar: MatSnackBar,
    private wellnessProgramService: WellnessProgramService,
    private authService: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  enroll(): void {
    const employeeId = this.authService.getEmployeeId();
    const programId = this.data.programId;

    if (employeeId && programId) {
      console.log('Enrolling Employee ID:', employeeId, 'in Program ID:', programId);

      this.wellnessProgramService.enrollEmployee(employeeId, programId).subscribe({
        next: () => {
          console.log('Enrollment successful');
          this.snackBar.open('Successfully enrolled in program!', 'Close', {
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
      this.snackBar.open('Failed to get employee or program information.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }
}
