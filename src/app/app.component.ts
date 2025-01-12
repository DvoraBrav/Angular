import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MY APP';
  keyValuesList = '';
  

  getWelcomingAcordingToHour() {
    const hours = new Date().getHours();

    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

}
