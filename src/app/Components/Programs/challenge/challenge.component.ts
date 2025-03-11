import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ChallengeService } from '../../../Services/ChallengeService.service';
import { AuthService } from '../../../Services/service.service';
import { ChallengeEnrollDialogComponent } from '../challenge-enroll-dialog/challenge-enroll-dialog.component';
import { Challenge} from '../../../Models/Challenge';
import { EmployeeDto } from '../../../Models/EmployeeDto';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  challenges: Challenge[] = [];
  selectedChallengeId: number | null = null;
  selectedChallengeEmployees: EmployeeDto[] = []; 
  showEmployeeList = false;
  userRole: string | null = null;
  constructor(
    private dialog: MatDialog,
    private challengeService: ChallengeService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadChallenges();
    this.userRole = this.authService.getRole();
  }

  loadChallenges(): void {
    this.challengeService.getAllChallenges().subscribe({
      next: data => {
        this.challenges = data;
      },
      error: err => {
        console.error('Error loading challenges:', err);
        this.snackBar.open('Failed to load challenges. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  openEnrollDialog(challengeId: number): void {
    this.dialog.open(ChallengeEnrollDialogComponent, {
      data: { challengeId }
    });
  }

  enrollChallenge(challengeId: number): void {
    const employeeId = this.authService.getEmployeeId();
    if (employeeId === null) {
      this.snackBar.open('Employee ID not found. Please log in again.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }

    this.challengeService.enrollChallenge(employeeId, challengeId).subscribe({
      next: () => {
        this.snackBar.open('Successfully enrolled in the challenge!', 'Close', {
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

  handleEnroll(challenge: Challenge): void {
    if (challenge.challengeId !== undefined) {
      this.openEnrollDialog(challenge.challengeId);
    } else {
      console.error('Challenge ID is undefined.');
      this.snackBar.open('Enrollment failed. Challenge ID is not available.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }

  viewEnrolledEmployees(challengeId: number): void {
    this.challengeService.getChallengeById(challengeId).subscribe({
      next: (challenge) => {
        this.selectedChallengeEmployees = challenge.participationemployee || [];
        this.selectedChallengeId = challengeId;
        this.showEmployeeList = true; // Show the employee list when data is available
      },
      error: (error) => {
        console.error('Error fetching enrolled employees:', error);
        this.snackBar.open('Error fetching enrolled employees.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}
