  import { Component, Inject, OnInit } from '@angular/core';

  import { Employee } from '../../../Models/employee.model'; // Ensure correct import
  import { MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { MatDialogModule } from '@angular/material/dialog';
  import { MatButtonModule } from '@angular/material/button';
  import { CommonModule } from '@angular/common';


  @Component({
    selector: 'app-employee-details-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    templateUrl: './employee-details-dialog.component.html',
    styleUrls: ['./employee-details-dialog.component.css']
  })
  export class EmployeeDetailsDialogComponent {
  
  employees: Employee[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { employees: Employee[] }) {
    // Ensure data.employees is an array
    if (Array.isArray(data.employees)) {
      this.employees = data.employees;
    } else {
      console.error('Data received is not an array:', data.employees);
    }
  }
  }