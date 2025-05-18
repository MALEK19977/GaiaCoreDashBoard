import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sustainability } from '../core/models/Sustainability';

@Component({
  selector: 'app-sustainability',
  templateUrl: './sustainability.component.html',
  styleUrls: ['./sustainability.component.css'],
})
export class SustainabilityComponent {
  title = 'Sustainability Projects';
  color = 'green';
  placeholder = 'Enter your name';
  today: Date = new Date();

  constructor(private router: Router) {}

  clickMe() {
    return alert("Welcome to our sustainability projects!");
  }

  listProjects: Sustainability[] = [
    {id: 1, name: "Organic Farming", address: "Tunis", image: "../../assets/images/sustainability1.jpg", status: "Active"},
    {id: 2, name: "Water Conservation", address: "Sousse", image: "../../assets/images/sustainability2.jpg", status: "Active"},
    {id: 3, name: "Renewable Energy", address: "Sfax", image: "../../assets/images/sustainability3.jpg", status: "Completed"},
    {id: 4, name: "Waste Management", address: "Bizerte", image: "../../assets/images/sustainability4.jpg", status: "Planning"}
  ];

  showLocation(address: string) {
    if (address === 'unknown') {
      return alert("Location is not specified");
    } else {
      return alert("Project location is " + address);
    }
  }

  viewDetails(projectId: number) {
    this.router.navigate(['/sustainabilityDetails', projectId]);
  }
} 