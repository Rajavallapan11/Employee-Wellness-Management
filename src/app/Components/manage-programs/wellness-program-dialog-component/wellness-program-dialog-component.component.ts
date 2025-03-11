import { Component, Inject } from '@angular/core';
import { WellnessProgram, WellnessProgramStatus } from '../../../Models/WellnessProgram';
import { WellnessProgramService } from '../../../Services/WellnessProgram.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-wellness-program-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './wellness-program-dialog-component.component.html',
  styleUrls: ['./wellness-program-dialog-component.component.css'] // Fix typo here
})
export class WellnessProgramDialogComponent {
  statuses = Object.values(WellnessProgramStatus);

  constructor(
    public dialogRef: MatDialogRef<WellnessProgramDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WellnessProgram | null,
    private wellnessProgramService: WellnessProgramService
  ) {
    // Ensure the `data` object is initialized if it is null
    if (!this.data) {
      this.data = {
        programID: 0,
        wellnessProgramName: '',
        wellnessProgramStartDate: new Date(),
        wellnessProgramEndDate: new Date(),
        category: '',
        description: '',
        instructorName: '',
        wellnessProgramStatus: WellnessProgramStatus.COMPLETED,
        enrolledEmployees:[],
      };
    }
  }

  save(): void {
    console.log('Saving:', this.data);
    if (this.data && this.data.programID) {
      this.wellnessProgramService.updateProgram(this.data.programID, this.data).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Update failed', err)
      });
    } else {
      this.wellnessProgramService.createProgram(this.data!).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Creation failed', err)
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
