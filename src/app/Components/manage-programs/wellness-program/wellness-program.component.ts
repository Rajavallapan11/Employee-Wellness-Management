import { Component, Inject, OnInit } from '@angular/core';
import { WellnessProgram } from '../../../Models/WellnessProgram';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { WellnessProgramService } from '../../../Services/WellnessProgram.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WellnessProgramDialogComponent } from '../wellness-program-dialog-component/wellness-program-dialog-component.component';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="modal-header">
      <h2 class="modal-title">{{ data.title }}</h2>
      <button type="button" class="close" aria-label="Close" (click)="onCancel()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ data.message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="onCancel()">No</button>
      <button type="button" class="btn btn-primary" (click)="onConfirm()" cdkFocusInitial>Yes</button>
    </div>
  `,
  styles: [`
    .modal-header {
      background-color: #007bff; /* Background color for header */
      border-bottom: 1px solid #dee2e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }

    .modal-title {
      color: #fff; /* Title text color */
      text-align: center;
      flex: 1;
      margin: 0; /* Remove default margin */
    }

    .close {
      background: none; /* Remove background */
      border: none; /* Remove border */
      color: #fff; /* Color of the close icon */
      font-size: 1.5rem; /* Adjust font size */
      cursor: pointer; /* Change cursor to pointer */
      padding: 0;
      transition: color 0.3s; /* Smooth transition for color change */
    }

    .close:hover,
    .close:focus {
      color: #ffdddd; /* Change color on hover/focus */
    }

    .modal-body {
      padding: 1.5rem;
    }

    .modal-footer {
      background-color: #f8f9fa; /* Footer background color */
      border-top: 1px solid #dee2e6;
      display: flex;
      justify-content: flex-end;
      padding: 1rem;
    }

    .modal-footer .btn {
      margin-left: 0.5rem;
    }

    @media (max-width: 576px) {
      .modal-body p {
        font-size: 0.875rem;
      }

      .modal-footer {
        flex-direction: column;
        align-items: stretch;
      }

      .modal-footer .btn {
        margin-top: 0.5rem;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}




@Component({
  selector: 'app-wellness-program',
  standalone: true,
  imports: [FormsModule, MatTableModule, CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './wellness-program.component.html',
  styleUrls: ['./wellness-program.component.css'] // Fix typo here
})
export class ManageWellnessProgramListComponent implements OnInit {
  displayedColumns: string[] = ['programID', 'wellnessProgramName', 'wellnessProgramStartDate', 'wellnessProgramEndDate', 'category', 'description', 'instructorName', 'wellnessProgramStatus', 'actions'];
  dataSource = new MatTableDataSource<WellnessProgram>();

  constructor(
    private wellnessProgramService: WellnessProgramService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPrograms();

  }

 loadPrograms(): void {
  this.wellnessProgramService.getAllPrograms().subscribe(programs => {
    this.dataSource.data = programs.filter(program => program && program.programID); // Ensure valid data
  });
}


  openDialog(program?: WellnessProgram): void {
    const dialogRef = this.dialog.open(WellnessProgramDialogComponent, {
      data: program ? { ...program } : null,  // Pass program for edit, null for create
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPrograms(); // Reload programs after save
      }
    });
  }

  editProgram(program: WellnessProgram): void {
    this.openDialog(program);
  }

  deleteProgram(programID: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Programs',
        message: 'Are you sure you want to delete this Programs?'
      }
    });

  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.wellnessProgramService.deleteProgram(programID).subscribe(
            () => {
              console.log('Employee deleted successfully');
              this.loadPrograms(); 
            },
            (error) => {
              console.error('Error deleting employee', error);
            }
          );
        }
      });
    }
    }
  
