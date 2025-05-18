import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SustainabilityComponent } from './sustainability/sustainability.component';
import { DetailSustainabilityComponent } from './detail-sustainability/detail-sustainability.component';
import { HomeComponent } from './home/home.component';
import { NoyFoundComponent } from './noy-found/noy-found.component';
import { AddSustainabilityComponent } from './add-sustainability/add-sustainability.component';
import { PowerbiDashboardComponent } from './components/powerbi-dashboard/powerbi-dashboard.component'; // Added Power BI component
import { DataComponent } from './data/data.component'; 
import { LoginComponent } from './login/login.component'; // Or './components/login/login.component'
import { AuthGuard } from './core/guards/auth.guard';
import { PredictionFormComponent} from 'src/app/equipment-prediction/equipment-prediction.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  
  // Power BI Dashboard Route (Added)
  { 
    path: 'dashboard', 
    component: PowerbiDashboardComponent,
    canActivate: [AuthGuard],
    
    data: { title: 'Analytics Dashboard' } 
  },
  { 
    path: 'data', 
    component: DataComponent,
    data: { title: 'Data Management' } 
  },
  
  // Sustainability Section
  {
    path: 'sustainability',
    component: SustainabilityComponent,
    children: [
      { path: 'details', component: DetailSustainabilityComponent }
    ]
  },
  
  // Other Routes
  { path: 'addSustainability', component: AddSustainabilityComponent },
  { path: 'sustainabilityDetails/:param', component: DetailSustainabilityComponent },
   { 
    path: 'ml-insights', 
    component: PredictionFormComponent,
    data: { title: 'ML Insights' } 
  },
  // 404 Handler (Keep as last route)
  { path: '**', component: NoyFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }