import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { Employee, Gender } from '../../Models/employee.model';
import { EmployeeService } from '../../Services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log(this.employees);
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  openModal(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      width: '600px',
      data: { employee: employee || {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  deleteEmployee(employeeId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Employee',
        message: 'Are you sure you want to delete this employee?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(employeeId).subscribe(
          () => {
            console.log('Employee deleted successfully');
            this.getEmployees();  // Refresh the list after deletion
          },
          (error) => {
            console.error('Error deleting employee', error);
          }
        );
      }
    });
  }
}
