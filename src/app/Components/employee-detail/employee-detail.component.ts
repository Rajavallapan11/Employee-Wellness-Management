import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../Models/employee.model';
import { CommonModule, NgIfContext } from '@angular/common';
import { Challenge } from '../../Models/Challenge';
import { WellnessProgram } from '../../Models/WellnessProgram';
import { AuthService } from '../../Services/service.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {

  employee: Employee | null = null;
  errorMessage: string | null = null;
  errorTemplate: TemplateRef<NgIfContext<Employee | null>> | null | undefined;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private authservic: AuthService
  ) {}

  ngOnInit(): void {
    const employeeId = this.authservic.getEmployeeId();
    console.log('Employee ID from URL:', employeeId);
  
    if (employeeId) {
      this.getEmployeeDetails(employeeId);
    } else {
      this.errorMessage = 'Invalid employee ID';
    }
  }

  getEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      (data: Employee) => {
        console.log('Employee data fetched successfully:', data);
        this.employee = data;
        console.log('Challenge Participation:', this.employee.challengeparticipation);
        console.log('Wellness Enrollments:', this.employee.eventregistration); // Log the wellnessEnrollments
        console.log('Wellness Enrollments:', this.employee.wellnessEnrollments); // Log the wellnessEnrollments
      },
      (error) => {
        console.error('Error fetching employee details:', error);
        this.errorMessage = 'Error fetching employee details';
      }
    );
  }
}
