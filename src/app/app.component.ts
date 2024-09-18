import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coppi';
  readonly currentYear = new Date().getFullYear();

  constructor() {
    if (localStorage.getItem('theme') === 'light') {
      this.theme('light');
    } else {
      this.theme('dark');
    }
  }
  theme(mode: string) {
    document.body.setAttribute('data-bs-theme', mode);
    localStorage.setItem('theme', mode);
  }
}
