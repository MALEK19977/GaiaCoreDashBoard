import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://votre-api.com/auth'; // Remplacez par votre URL d'API
  private currentUser: any = null;
  
  // Liste des accès utilisateurs (à remplacer par un appel API si nécessaire)
  private userAccessList = [
    {
      email: "hamdimalek0097@gmail.com",
      page: "RES_Maintenance",
      url: "https://app.powerbi.com/reportEmbed?reportId=53b53292-fb76-4152-bb2c-fb91474a4183&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&filterPaneEnabled=false&$filter=ReportPage eq 'RES_Maintenance'"
    },
    {
      email: "jeljliamin28@gmail.com",
      page: "RES_Environmental",
      url: "https://app.powerbi.com/reportEmbed?reportId=53b53292-fb76-4152-bb2c-fb91474a4183&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&filterPaneEnabled=false&$filter=ReportPage eq 'RES_Environmental'"
    },
    {
      email: "eyat887@gmail.com",
      page: "RES_Energy Efficiency",
      url: "https://app.powerbi.com/groups/me/reports/5f4b7220-39ca-40d0-9ab3-57aebce00ec2/e16e0a3944fb4d092559?experience=power-bi'"
    }
  ];

  constructor(private http: HttpClient) {}

  /**
   * Méthode de connexion
   */
  login(email: string): Observable<{success: boolean, message: string, page?: string}> {
    // En production, remplacez par un vrai appel API
    return this.http.post<{success: boolean, message: string, page?: string}>(`${this.apiUrl}/login`, { email })
      .pipe(
        tap(response => {
          if (response.success) {
            this.currentUser = { email, page: response.page };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          }
        })
      );
    
    // Version simulée pour test :
    /*
    const user = this.userAccessList.find(u => u.email.toLowerCase() === email.toLowerCase());
    const res = {
      success: !!user,
      message: user ? 'Connexion réussie' : 'Email non reconnu',
      page: user?.page
    };
    return of(res).pipe(delay(1000));
    */
  }

  /**
   * Récupère les accès utilisateur
   */
  getUserAccess(email: string): { page: string; url: string } | null {
    const user = this.userAccessList.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user ? { page: user.page, url: user.url } : null;
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return !!this.currentUser || !!localStorage.getItem('currentUser');
  }

  /**
   * Récupère la page autorisée
   */
  getAllowedPage(): string | null {
    const user = this.currentUser || JSON.parse(localStorage.getItem('currentUser') || null);
    return user?.page || null;
  }

  /**
   * Déconnexion
   */
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  /**
   * Récupère l'email de l'utilisateur courant
   */
  getUserEmail(): string | null {
    const user = this.currentUser || JSON.parse(localStorage.getItem('currentUser') || null);
    return user?.email || null;
  }
}