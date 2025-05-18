// src/app/components/prediction-form/prediction-form.component.ts
import { Component } from '@angular/core';
import { EquipmentPredictionService } from 'src/app/services/equipment-prediction.service';

@Component({
  selector: 'app-prediction-form',
  templateUrl: './equipment-prediction.component.html',
  styleUrls: ['./equipment-prediction.component.css']
})
export class PredictionFormComponent {
  formData = {
    Manufacturer: '',
    Energy_Type: '',
    Estimated_Lifetime_Years: 0,
    CO2_Emissions_kg: 0,
    Energy_Consumption_kWh: 0
  };

  knnResult: any;
  svmResult: any;
  dtreeResult: any;
  allResults: any;
  isLoading = false;
  errorMessage = '';

  constructor(private predictionService: EquipmentPredictionService) { }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Appel à l'API pour tous les modèles
    this.predictionService.predictWithAllModels(this.formData).subscribe({
      next: (results) => {
        this.allResults = results;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Une erreur est survenue lors de la prédiction';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  // Méthodes pour tester chaque modèle individuellement
  testKNN() {
    this.predictionService.predictWithKNN(this.formData).subscribe({
      next: (result) => this.knnResult = result,
      error: (err) => console.error(err)
    });
  }

  testSVM() {
    this.predictionService.predictWithSVM(this.formData).subscribe({
      next: (result) => this.svmResult = result,
      error: (err) => console.error(err)
    });
  }

  testDecisionTree() {
    this.predictionService.predictWithDecisionTree(this.formData).subscribe({
      next: (result) => this.dtreeResult = result,
      error: (err) => console.error(err)
    });
  }
}