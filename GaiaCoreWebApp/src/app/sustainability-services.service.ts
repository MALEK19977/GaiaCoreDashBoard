import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SustainabilityServicesService {
  constructor(private http: HttpClient) { }

  getSustainabilityData() {
    return this.http.get('http://localhost:4200/sustainability');
  }
} 