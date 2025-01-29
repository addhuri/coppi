import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coppi';
  readonly currentYear = new Date().getFullYear();
  readonly buildInfo = `Coppi\nVersion: ${environment.APP_VERSION}\nBuild: ${environment.APP_BUILD_DATE}`;

  constructor(public appService: AppService) { }
}
