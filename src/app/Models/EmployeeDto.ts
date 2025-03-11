// src/app/Models/Challenge.ts

export interface EmployeeDto {
    employeeId: number;
    name: string;
    password: string;
    role: string;
    contactNumber: number;
    email: string;
    age: number;
    gender: string;
    bloodgroup: string;
    bmi: number;
    hobbies: string;
    department: string;
  }
  
  export interface Challenge {
    challengeId: number;
    challengeName: string;
    description: string;
    challengeType: string;
    challengeStartDate: string | null; 
    challengeEndDate: string; 
    score: number | null;
    participationemployee: EmployeeDto[]; 
  }
  