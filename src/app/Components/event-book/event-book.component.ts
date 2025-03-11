import { Component } from '@angular/core';
import { WellnessProgramService } from '../../Services/WellnessProgram.service';
import { WellnessProgram } from '../../Models/WellnessProgram';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-event-book',
  standalone: true,
  imports: [CommonModule,FormsModule,  MatTableModule,
    MatProgressSpinnerModule],
  templateUrl: './event-book.component.html',
  styleUrl: './event-book.component.css'
})
export class EventBookComponent {
  enrollments: WellnessProgram[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private enrollmentService: WellnessProgramService) {}

  ngOnInit(): void {
    this.loadAllEnrollments();
  }

  loadAllEnrollments(): void {
    // this.enrollmentService.getAllEnrollments().subscribe({
    //   next: (data: WellnessProgram[]) => {
    //     this.enrollments = data;
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching enrollments:', err);  // Log the full error object
    //     this.errorMessage = 'Failed to load enrollments: ' + (err.message || 'Unknown error');
    //     this.isLoading = false;
    //   }
    // });
  }
}
