import { Employee } from './employee.model';
import { EventStatus, EventType } from './Event';

export interface EventsApiResponse {
  eventId: number;
  eventName: string;
  description: string;
  eventType: EventType;
  eventDate: string; // Ensure the type matches the API response
  hostName: string;
  eventStatus: EventStatus;
  eventregister: Employee[]; // This should match the field in the API response
}
