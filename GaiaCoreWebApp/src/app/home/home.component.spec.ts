import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  toDay: Date = new Date();
  p = 'taper votre nom';
  residence = 'HamdiResidence';
  color = 'red';

 

  // Method for handling the button click
  clickMe() {
    alert('Bonjour, vous avez cliqué!');
  }

  // Method for showing location or address information
  showLocation(address: string) {
    if (address === 'inconnu') {
      alert('L\'adresse est inconnue');
    } else {
      alert('L\'adresse est ' + address);
    }
  }
}
