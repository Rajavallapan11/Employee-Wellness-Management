import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from '@angular/router'; 
import { NgIf } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterModule, NgIf, FooterComponent], 
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'] 
})
export class BaseComponent {
  isLoading: boolean = false;

  constructor() { }
}
