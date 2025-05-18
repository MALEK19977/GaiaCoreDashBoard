import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; // Adjust path as needed
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-powerbi-dashboard',
  templateUrl: './powerbi-dashboard.component.html',
  styleUrls: ['./powerbi-dashboard.component.css']
})
export class PowerbiDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('reportContainerHost', { static: false }) reportContainerHost!: ElementRef;

  currentReportUrl: SafeResourceUrl | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  allowedPageForUser: string | undefined;
  private routeSub: Subscription | undefined;

  
  dashboardPages = [
    { id: 'RES_Maintenance', label: 'RES_Maintenance' },
    { id: 'RES_Environmental', label: 'RES_Environmental' },
    { id: 'RES_Energy Efficiency', label: 'RES_Energy Efficiency' }
  ];

  constructor(
    public route: ActivatedRoute, // Made public for template access to route.snapshot.queryParams['reportId']
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private renderer: Renderer2 // Renderer2 might not be used explicitly in this version, can be reviewed for removal if not needed.
  ) { }

  ngOnInit(): void {
    console.log('PowerBI Dashboard Component Initializing...');
    
    this.allowedPageForUser = this.authService.getAllowedPage();
    console.log('Allowed page for user:', this.allowedPageForUser);

    if (!this.authService.isAuthenticated()) {
      console.error('User not authenticated');
      this.handleError('User not authenticated. Please login.');
      this.router.navigate(['/login']);
      return;
    }

    const embedUrl = this.authService.getAllowedUrl();
    console.log('Embed URL from auth service:', embedUrl);

    if (!embedUrl) {
      console.error('No embed URL found for user');
      this.handleError('No dashboard URL found for your account.');
      return;
    }

    this.routeSub = this.route.queryParams.subscribe(params => {
      const reportIdFromUrl = params['reportId'];
      console.log('Report ID from URL:', reportIdFromUrl);
      console.log('Allowed page:', this.allowedPageForUser);

      if (!reportIdFromUrl) {
        if (this.allowedPageForUser) {
          console.log('No reportId in URL, redirecting to allowed page:', this.allowedPageForUser);
          this.router.navigate(['/dashboard'], { queryParams: { reportId: this.allowedPageForUser } });
        } else {
          this.handleError('No report page assigned to your account.');
        }
        return;
      }

      if (reportIdFromUrl.toLowerCase() !== this.allowedPageForUser?.toLowerCase()) {
        console.warn(`User attempting to access unauthorized report: ${reportIdFromUrl}`);
        this.handleError(`You are not authorized to view this report. Redirecting to your assigned dashboard.`);
        this.router.navigate(['/dashboard'], { queryParams: { reportId: this.allowedPageForUser } });
        return;
      }

      this.loadReport(embedUrl);
    });
  }

  private loadReport(embedUrl: string): void {
    console.log('Loading report with URL:', embedUrl);
    this.isLoading = true;
    this.errorMessage = null;

    try {
      this.currentReportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      console.log('URL sanitized and set');
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading report:', error);
      this.handleError('Error loading the dashboard. Please try again later.');
    }
  }

  private handleError(message: string): void {
    console.error('Dashboard error:', message);
    this.errorMessage = message;
    this.isLoading = false;
    this.currentReportUrl = null;
  }

  isTabVisible(tabId: string): boolean { // tabId is mixed case from dashboardPages array
    return this.allowedPageForUser ? tabId.toLowerCase() === this.allowedPageForUser.toLowerCase() : false;
  }

  navigateToReport(reportId: string): void { // reportId is mixed case from dashboardPages array
    if (this.isTabVisible(reportId)) {
        this.router.navigate(['/dashboard'], { queryParams: { reportId: reportId } });
    } else {
        console.warn("Attempt to navigate to an unauthorized tab from UI: ", reportId);
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}

