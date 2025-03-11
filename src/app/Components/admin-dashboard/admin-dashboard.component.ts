import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartboxComponent } from "../chartbox/chatbox.component";
import { HealthProviderComponent } from "../health-provider/health-provider.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ChartboxComponent, HealthProviderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  selectedDate: string | undefined;

  constructor(private router: Router) {}

  // Method for navigation when a card is clicked
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
