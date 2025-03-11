import { Employee } from "./employee.model";

export enum WellnessProgramStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  ONGOING = 'ONGOING'
}

export interface WellnessProgram {
  
    programID: number;
    wellnessProgramName: string;
    wellnessProgramStartDate: Date;
    wellnessProgramEndDate: Date;
    category: string;
    description: string;
    instructorName: string;
    wellnessProgramStatus: WellnessProgramStatus;
    enrolledEmployees: Employee[];
}
