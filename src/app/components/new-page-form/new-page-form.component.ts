import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from 'src/app/services/app.service';
import { GreyPageText } from 'src/app/services/constants';
import { RootState } from 'src/app/store/app.rootReducer';

@Component({
  selector: 'app-new-page-form',
  templateUrl: './new-page-form.component.html',
  styleUrls: ['./new-page-form.component.scss']
})
export class NewPageFormComponent {
  readonly sampleText = GreyPageText;
  workspaceName: string = '';
  pageName: string = '';
  textInput: string = '';

  constructor(private appService: AppService, private store: Store<RootState>) { }

  ngOnInit(): void {
    this.workspaceName = this.appService.workspaces[this.appService.newPage.workspaceId]?.name || '';
    this.appService.savePageEventEmitter.subscribe(() => {
      this.save();
    });
  }
  private save() {
    this.textInput = this.textInput.trim();
    if (this.textInput === '') {
      alert('Text input is empty');
      return;
    }
    const data = this.appService.parseText(this.textInput);
    this.appService.appendNewPage(this.pageName.trim(), data);
  }
}
