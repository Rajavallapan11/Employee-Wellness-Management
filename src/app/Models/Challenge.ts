import { Employee } from "./employee.model";

export interface Challenge {
  participationemployee: never[];
  challengeId?: number;                // Optional because it may not be provided during creation
  challengeName: string;
  description: string;
  challengeStartDate: string;          // Date in 'YYYY-MM-DD' format
  challengeEndDate: string;  
  challengeType: string;          // Date in 'YYYY-MM-DD' format
  score?: number;    
  enrolledemployees: Employee[]; // This is from the API response
  // Optional field
}



