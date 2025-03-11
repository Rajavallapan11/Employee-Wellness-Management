import { Component, Inject } from '@angular/core';
import { Employee, Gender, Role } from '../../Models/employee.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-employee-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule,MatOptionModule,MatSelectModule],
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']  // Fixed typo here
})
export class EmployeeModalComponent {
  employee: Employee = {
    employeeId: 0,
    name: '',
    role: Role.ROLE_USER,
    contactNumber: 0,
    email: '',
    age: '',
    gender: Gender.MALE,
    bloodgroup: '',
    bmi: 0,
    hobbies: '',
    department: '',
    password: '',
    wellnessEnrollments: [],
    challengeparticipation: [],
    eventregistration: []
  };
  Gender = Gender;
  Role = Role;

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.employee) {
      this.employee = { ...this.data.employee };
    }
  }

  save(): void {
    if (this.employee.employeeId) {
      // Update existing employee
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.dialogRef.close(true),
        (error) => console.error('Error updating employee', error)
      );
    } else {
      // Create new employee
      this.employeeService.createEmployee(this.employee).subscribe(
        () => this.dialogRef.close(true),
        (error) => console.error('Error creating employee', error)
      );
    }
  }

}
