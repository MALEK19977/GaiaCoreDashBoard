import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            // Logged in, so return true
            const allowedPage = this.authService.getAllowedPage();
            const requestedPage = route.queryParams['reportId'];

            // If a specific reportId is requested by the route, check if the user is allowed to see it
            if (requestedPage && allowedPage && requestedPage.toLowerCase() !== allowedPage.toLowerCase()) {
                console.warn(`User not authorized for report ${requestedPage}. Allowed: ${allowedPage}`);
                // Optionally, redirect to an 'unauthorized' page or back to login/home
                // For now, let's redirect to login, which will then redirect to their allowed page if they re-authenticate
                // Or, better, redirect to their *actual* allowed dashboard page if they are already logged in.
                this.router.navigate(['/dashboard'], { queryParams: { reportId: allowedPage } });
                return false;
            }
            return true;
        }

        // Not logged in, so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

