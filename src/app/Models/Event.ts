import { Role, Gender, Employee } from './employee.model';

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  FINISHED = 'FINISHED',
  ONGOING = 'ONGOING',
}

export enum EventType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export interface Event {
  eventId: number;
  eventName: string;
  description: string;
  eventType: EventType;
  eventDate: Date;
  hostName: string;
  eventStatus: EventStatus;
  enrolledemployees: Employee[];
}
