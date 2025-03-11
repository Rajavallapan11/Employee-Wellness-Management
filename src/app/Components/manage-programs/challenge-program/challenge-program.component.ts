import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Challenge } from '../../../Models/Challenge';
import { ChallengeService } from '../../../Services/ChallengeService.service';
import { CommonModule } from '@angular/common';
import { AddEditChallengeDialogComponent } from '../add-edit-challenge-dialog-component/add-edit-challenge-dialog-component.component';

@Component({
  selector: 'app-challenge-program',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './challenge-program.component.html',
  styleUrls: ['./challenge-program.component.css']
})
export class ChallengeProgramComponent implements OnInit {
  challenges: Challenge[] = [];

  constructor(
    private challengeService: ChallengeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadChallenges();
  }

  loadChallenges(): void {
    this.challengeService.getAllChallenges().subscribe((data) => {
      this.challenges = data;
    });
  }

  openDialog(challenge?: Challenge): void {
    const dialogRef = this.dialog.open(AddEditChallengeDialogComponent, {
      width: '450px',
      data: { challenge: challenge || {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.challengeId) {
          // Update existing challenge
          this.challengeService.updateChallenge(result.challengeId, result).subscribe(() => {
            this.loadChallenges(); // Refresh the list
          });
        } else {
          // Add new challenge
          this.challengeService.createChallenge(result).subscribe(() => {
            this.loadChallenges(); // Refresh the list
          });
        }
      }
    });
  }

  deleteChallenge(challengeId?: number): void {
    if (challengeId != null) {
      this.challengeService.deleteChallenge(challengeId).subscribe(() => {
        this.challenges = this.challenges.filter(c => c.challengeId !== challengeId);
      });
    }
  }
}
