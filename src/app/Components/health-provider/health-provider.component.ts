import { Component, OnInit } from '@angular/core';
import { HEALTH_PROVIDERS } from '../../Models/HEALTHPROVIDERS';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-health-provider',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './health-provider.component.html',
  styleUrl: './health-provider.component.css'
})
export class HealthProviderComponent implements OnInit{
  providers = HEALTH_PROVIDERS;

  ngOnInit(): void {
    
  }
}