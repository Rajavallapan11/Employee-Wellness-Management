import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChallengeService } from '../../../Services/ChallengeService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../Services/service.service';

@Component({
  selector: 'app-challenge-enroll-dialog',
  templateUrl: './challenge-enroll-dialog.component.html',
  styleUrls: ['./challenge-enroll-dialog.component.css']
})
export class ChallengeEnrollDialogComponent {
  challengeId: number;

  constructor(
    public dialogRef: MatDialogRef<ChallengeEnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { challengeId: number },
    private challengeService: ChallengeService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.challengeId = data.challengeId;
  }

  enroll(): void {
    const employeeId = this.authService.getEmployeeId();
    const challengeId = this.data.challengeId;

    // Check if employeeId is null
    if (employeeId === null) {
      this.snackBar.open('Employee ID not found. Please log in again.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return; // Exit the function if employeeId is null
    }

    this.challengeService.enrollChallenge(employeeId, challengeId).subscribe({
      next: () => {
        this.snackBar.open('Successfully enrolled in the challenge!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.dialogRef.close();
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

  cancel(): void {
    this.dialogRef.close();
  }
}
