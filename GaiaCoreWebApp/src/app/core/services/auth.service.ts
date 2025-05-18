import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface UserAccess {
  email: string;
  page: string; // e.g., "RES_Maintenance"
  url: string;  // e.g., "https://app.powerbi.com/..."
}

interface DbData {
  user_access: UserAccess[];
}

export interface AuthResponse {
  success: boolean;
  page?: string;
  url?: string; // Added URL property
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // IMPORTANT: Make sure your db.json now contains the "url" field for each user.
  // Use the db_with_urls.json content for your actual db.json file.
  private dbUrl = 'assets/db.json'; // Path to your db.json in the assets folder
  private currentUserSubject: BehaviorSubject<UserAccess | null>;
  public currentUser: Observable<UserAccess | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserAccess | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserAccess | null {
    return this.currentUserSubject.value;
  }

  login(email: string): Observable<AuthResponse> {
    return this.http.get<DbData>(this.dbUrl).pipe(
      map(data => {
        if (!data || !data.user_access) {
          console.error('Invalid db.json structure or data.user_access is missing:', data);
          return { success: false, message: 'Login configuration error. Check db.json structure.' };
        }
        const user = data.user_access.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user && user.url) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return { 
            success: true, 
            page: user.page, 
            url: user.url, 
            message: `Login successful! Redirecting to ${user.page}.` 
          };
        } else if (user && !user.url) {
          console.error('User found but URL is missing in db.json for:', user.email);
          return { success: false, message: 'Login configuration error: User URL not found.' };
        } else {
          return { success: false, message: 'Invalid email or no access rights.' };
        }
      }),
      catchError(error => {
        console.error('Error fetching or processing db.json:', error);
        if (error.status === 404) {
          return of({ success: false, message: 'Login data file not found. Please check assets/db.json path.' });
        }
        return of({ success: false, message: 'An error occurred during login. Please try again.' });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  getAllowedPage(): string | undefined {
    return this.currentUserValue?.page;
  }

  getAllowedUrl(): string | null {
    const user = this.currentUserSubject.value;
    return user?.url || null;
  }
}

