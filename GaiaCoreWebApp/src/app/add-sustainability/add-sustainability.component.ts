import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sustainability } from '../core/models/Sustainability';

@Component({
  selector: 'app-add-sustainability',
  templateUrl: './add-sustainability.component.html',
  styleUrls: ['./add-sustainability.component.css']
})
export class AddSustainabilityComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      image: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const newProject: Sustainability = {
        id: Date.now(), // Temporary ID
        ...this.projectForm.value
      };
      // Here you would typically send the data to your service
      console.log('New project:', newProject);
    }
  }
} 