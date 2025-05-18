import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  darkMode: boolean = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    
    // Apply dark mode to home page and residences page content
    const homeContent = document.querySelector('.home-content');
    const residencesContent = document.querySelector('.residences-container');

    if (homeContent) homeContent.classList.toggle('dark-mode', this.darkMode);
    if (residencesContent) residencesContent.classList.toggle('dark-mode', this.darkMode);
  }
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    // The authService.logout() method already navigates to '/login'.
  }
}
