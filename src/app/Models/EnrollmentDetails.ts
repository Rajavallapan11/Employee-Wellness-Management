import { Gender, Role } from "./employee.model";

export interface EnrollmentDetails {
  name: string;
  email: string;
  contactNumber: number;
  department: string;
  gender: Gender;
  bloodgroup: string;
  age: string;
  bmi: number;
  hobbies: string;
  employeeId: number;
  password: string;
  role: Role;
}
