import { Challenge } from './Challenge';
import { Event } from './Event';
import { WellnessProgram } from './WellnessProgram';

export interface WellnessEnrollment {
  enrollmentId: number;
  employee: number; 
  enrollDate: Date;
  wellnessEnrollmentStatus: string; 
  wellnessProgram: WellnessProgram;
}

export interface EventEnrollment {
    enrollmentId: number;
    employee: number; 
    enrollDate: Date;
    wellnessEnrollmentStatus: string; 
    event: Event;
  }


  export interface ChallengeEnrollment {
    enrollmentId: number;
    employee: number; 
    enrollDate: Date;
    wellnessEnrollmentStatus: string; 
    challenge: Challenge;
  }
