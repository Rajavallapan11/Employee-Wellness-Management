import { Challenge } from "./Challenge";
import { Event } from "./Event";
import { ChallengeEnrollment, EventEnrollment, WellnessEnrollment } from "./WellnessEnrollment ";
import { WellnessProgram } from "./WellnessProgram";

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
}

export interface Employee {

  employeeId: number;
  name: string;
  password: string;
  role: Role;
  contactNumber: number;
  email: string;
  age: string;
  gender: Gender;
  bloodgroup: string;
  bmi: number;
  hobbies: string;
  department: string;
  //wellnessEnrollments: WellnessProgram[];   // Required field
  challengeparticipation: ChallengeEnrollment[]; 
  eventregistration:EventEnrollment[];
  wellnessEnrollments: WellnessEnrollment[]; 

}
