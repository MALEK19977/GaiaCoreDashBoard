// src/app/services/equipment-prediction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PredictionInput {
  Manufacturer: string;
  Energy_Type: string;
  Estimated_Lifetime_Years: number;
  CO2_Emissions_kg: number;
  Energy_Consumption_kWh: number;
}

interface PredictionOutput {
  model: string;
  prediction: number;
  probability: number;
  prediction_text: string;
}

interface AllModelsOutput {
  knn: {
    prediction: number;
    probability: number;
  };
  svm: {
    prediction: number;
    probability: number;
  };
  dtree: {
    prediction: number;
    probability: number;
  };
  ensemble: PredictionOutput;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentPredictionService {
 private apiUrl = '/api/predict'; // Assurez-vous que l'URL correspond à votre API Flask

  constructor(private http: HttpClient) { }

  // Prédiction avec KNN
  predictWithKNN(data: PredictionInput): Observable<PredictionOutput> {
    return this.http.post<PredictionOutput>(`${this.apiUrl}/knn`, data);
  }

  // Prédiction avec SVM
  predictWithSVM(data: PredictionInput): Observable<PredictionOutput> {
    return this.http.post<PredictionOutput>(`${this.apiUrl}/svm`, data);
  }

  // Prédiction avec Decision Tree
  predictWithDecisionTree(data: PredictionInput): Observable<PredictionOutput> {
    return this.http.post<PredictionOutput>(`${this.apiUrl}/dtree`, data);
  }

  // Prédiction avec tous les modèles
  predictWithAllModels(data: PredictionInput): Observable<AllModelsOutput> {
    return this.http.post<AllModelsOutput>(`${this.apiUrl}/all`, data);
  }
}