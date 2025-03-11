import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Challenge } from '../../../Models/Challenge';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-edit-challenge-dialog',
  standalone: true,
  templateUrl: './add-edit-challenge-dialog-component.component.html',
  styleUrls: ['./add-edit-challenge-dialog-component.component.css'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class AddEditChallengeDialogComponent {
  challenge: Challenge;
  challengeTypes: string[] = ['STEP_CHALLENGE', 'CYCLING', 'HEALTHY_EATING_COMPETITION', 'MARATHON'];

  constructor(
    public dialogRef: MatDialogRef<AddEditChallengeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.challenge = data.challenge || {
      challengeName: '',
      description: '',
      challengeStartDate: new Date(),
      challengeEndDate: new Date(),
      challengeType: ''
    };
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log('Challenge Type:', this.challenge.challengeType); // Log the challenge type
    this.dialogRef.close(this.challenge);
  }
}
