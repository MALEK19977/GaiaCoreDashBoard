import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PredictionFormComponent} from 'src/app/equipment-prediction/equipment-prediction.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SustainabilityComponent } from './sustainability/sustainability.component';
import { DetailSustainabilityComponent } from './detail-sustainability/detail-sustainability.component';
import { HomeComponent } from './home/home.component';
import { NoyFoundComponent } from './noy-found/noy-found.component';
import { AddSustainabilityComponent } from './add-sustainability/add-sustainability.component';
import { SustainabilityServicesService } from './sustainability-services.service';


// Power BI Components and Services
import { PowerbiDashboardComponent } from './components/powerbi-dashboard/powerbi-dashboard.component';
import { PowerbiService } from './core/models/powerbi.service';
import { DataComponent } from './data/data.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SustainabilityComponent,
    DetailSustainabilityComponent,
    HomeComponent,
    NoyFoundComponent,
    AddSustainabilityComponent,
    PowerbiDashboardComponent,
    DataComponent,
    LoginComponent,
    PredictionFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    SustainabilityServicesService,
    PowerbiService, // Add Power BI service to providers
    // Add if using role-based access
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };