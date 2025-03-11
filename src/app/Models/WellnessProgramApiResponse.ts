// wellness-program-api-response.model.ts
import { Employee } from '../Models/employee.model';
import { WellnessProgramStatus } from './WellnessProgram';

export interface WellnessProgramApiResponse {
  programID: number;
  wellnessProgramName: string;
  wellnessProgramStartDate: Date;
  wellnessProgramEndDate: Date;
  category: string;
  description: string;
  instructorName: string;
  wellnessProgramStatus: WellnessProgramStatus;
  enrolledemployees: Employee[]; 
}
