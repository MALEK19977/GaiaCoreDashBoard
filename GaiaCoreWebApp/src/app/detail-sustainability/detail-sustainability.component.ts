import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sustainability } from '../core/models/Sustainability';

@Component({
  selector: 'app-detail-sustainability',
  templateUrl: './detail-sustainability.component.html',
  styleUrls: ['./detail-sustainability.component.css']
})
export class DetailSustainabilityComponent implements OnInit {
  project: Sustainability | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('param');
    // Here you would typically fetch the project details from your service
    // For now, we'll use a mock project
    this.project = {
      id: 1,
      name: "Sample Project",
      address: "Tunis",
      image: "../../assets/images/sustainability1.jpg",
      status: "Active"
    };
  }

  goBack() {
    this.router.navigate(['/sustainability']);
  }
} 