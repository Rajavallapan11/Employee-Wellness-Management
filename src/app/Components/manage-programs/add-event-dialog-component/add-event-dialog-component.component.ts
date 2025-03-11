import { Component, Inject } from '@angular/core'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event, EventType, EventStatus } from '../../../Models/Event';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-event-dialog-component.component.html',
  styleUrls: ['./add-event-dialog-component.component.css']
})
export class AddEventDialogComponentComponent {
  eventTypes = Object.values(EventType);
  eventStatuses = Object.values(EventStatus);


  event: Event = {
    eventId: 0,
    eventName: '',
    description: '',
    eventType: EventType.ONLINE,
    eventDate: new Date(),
    hostName: '',
    eventStatus: EventStatus.UPCOMING,
    enrolledemployees: []
  };

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.event) {
      this.event = data.event;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.event);
  }
}
