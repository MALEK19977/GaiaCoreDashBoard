import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Added ActivatedRoute

import { AuthService,AuthResponse } from '../core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'error';
  isLoading: boolean = false;
  private returnUrl: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to get returnUrl
  ) { }

  ngOnInit(): void {
    // Get the return URL from route parameters or default to dashboard with allowed page
    this.route.queryParams.subscribe(params => {
        this.returnUrl = params['returnUrl'];
    });

    // If already logged in, try to navigate to returnUrl or their allowed dashboard page
    if (this.authService.isAuthenticated()) {
      const allowedPage = this.authService.getAllowedPage();
      if (this.returnUrl && this.returnUrl.startsWith('/dashboard')) {
        // If returnUrl is a dashboard, ensure it's the correct one or redirect
        const returnUrlParams = new URLSearchParams(this.returnUrl.split('?')[1]);
        const returnReportId = returnUrlParams.get('reportId');
        if (allowedPage && returnReportId && returnReportId.toLowerCase() === allowedPage.toLowerCase()) {
            this.router.navigateByUrl(this.returnUrl);
            return;
        }
      } 
      // Default to their allowed page if no valid returnUrl or if returnUrl is not their allowed dashboard
      if (allowedPage) {
        this.router.navigate(['/dashboard'], { queryParams: { reportId: allowedPage } });
      } else {
        this.router.navigate(['/home']); // Fallback if no page defined (should not happen for authenticated user)
      }
    }
  }

  handleLogin(): void {
    if (!this.email) {
      this.message = 'Please enter an email address.';
      this.messageType = 'error';
      return;
    }
    this.isLoading = true;
    this.message = '';

    this.authService.login(this.email).subscribe((response: AuthResponse) => {
      this.isLoading = false;
      this.message = response.message;
      
      if (response.success && response.page && response.url) {
        this.messageType = 'success';
        // Redirection vers le dashboard avec le bon reportId
        this.router.navigate(['/dashboard'], { 
          queryParams: { 
            reportId: response.page
          }
        });
      } else {
        this.messageType = 'error';
      }
    });
  }
}

