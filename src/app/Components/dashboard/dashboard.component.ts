import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ChartboxComponent } from "../chartbox/chatbox.component";
import { EventBookComponent } from "../event-book/event-book.component";
import { HealthProviderComponent } from "../health-provider/health-provider.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, ChartboxComponent, EventBookComponent, RouterOutlet, HealthProviderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedDate: string | undefined;

  constructor(private router: Router) {}

  // Method for navigation when a card is clicked
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

}
