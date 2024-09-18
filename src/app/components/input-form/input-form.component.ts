import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { WhitePageText } from 'src/app/services/constants';
import { RootState } from 'src/app/store/app.rootReducer';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent {
  readonly subscription = new Subscription();
  readonly sampleText = WhitePageText;
  workspaceName: string = '';
  pageName: string = '';
  textInput: string = '';

  constructor(private appService: AppService, private store: Store<RootState>) { }

  ngOnInit(): void {
    this.subscription.add(this.appService.saveEventEmitter.subscribe(() => {
      this.save();
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private save() {
    this.workspaceName = this.workspaceName.trim();
    this.pageName = this.pageName.trim();
    this.textInput = this.textInput.trim();
    if (this.textInput === '') {
      alert('Text input is empty');
      return;
    }
    const data = this.appService.parseTextToData(this.textInput);
    this.appService.newWorkspace(this.workspaceName, this.pageName, data);
  }
}
