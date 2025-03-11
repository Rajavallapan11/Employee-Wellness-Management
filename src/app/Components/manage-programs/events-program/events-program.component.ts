import { Component } from '@angular/core';
import { EventService } from '../../../Services/EventService.service';
import { Event } from '../../../Models/Event';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponentComponent } from '../add-event-dialog-component/add-event-dialog-component.component';

@Component({
  selector: 'app-events-program',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-program.component.html',
  styleUrl: './events-program.component.css'
})
export class EventsProgramComponent {
  events: Event[] = [];

  constructor(private eventService: EventService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }

  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.events = this.events.filter((e) => e.eventId !== eventId);
    });
  }

  openAddEventDialog(): void {
    const dialogRef = this.dialog.open(AddEventDialogComponentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.createEvent(result).subscribe(() => {
          this.loadEvents();
        });
      }
    });
  }

  openEditEventDialog(event: Event): void {
    const dialogRef = this.dialog.open(AddEventDialogComponentComponent, {
      data: { event }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.updateEvent(result.eventId, result).subscribe(() => {
          this.loadEvents();
        });
      }
    });
  }}
