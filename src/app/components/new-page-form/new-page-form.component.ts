import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PageMode } from 'src/app/services/app.interface';
import { AppService } from 'src/app/services/app.service';
import { GreyPageText } from 'src/app/services/constants';
import { RootState } from 'src/app/store/app.rootReducer';

@Component({
  selector: 'app-new-page-form',
  templateUrl: './new-page-form.component.html',
  styleUrls: ['./new-page-form.component.scss']
})
export class NewPageFormComponent {
  readonly subscription = new Subscription();
  readonly sampleText = GreyPageText;
  workspaceName: string = '';
  pageName: string = '';
  textInput: string = '';
  isDisabledWorkspaceName = true;
  pageId: number = new Date().getTime();
  workspaceId: number = new Date().getTime();

  constructor(private appService: AppService, private store: Store<RootState>) { }

  ngOnInit(): void {
    this.workspaceName = this.appService.workspaces[this.appService.newPage.workspaceId]?.name || '';
    this.init()
    this.subscription.add(this.appService.savePageEventEmitter.subscribe(() => {
      this.save();
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private init() {
    const workspacePage = this.appService.workspaces[this.appService.newPage.workspaceId]?.pages[this.appService.newPage.pageId];
    switch (this.appService.currentPageMode) {
      case PageMode.EDIT:
        this.pageName = workspacePage.name;
        this.pageId = workspacePage.id;
        this.workspaceId = this.appService.newPage.workspaceId;
        this.textInput = this.appService.parseDataToText(workspacePage.data);
        this.isDisabledWorkspaceName = false;
        break;
      case PageMode.VIEW:
        this.pageName = workspacePage.name;
        this.pageId = workspacePage.id;
        this.workspaceId = this.appService.newPage.workspaceId;
        this.textInput = this.appService.parseDataToText(workspacePage.data);
        break;
      default:
        break;
    }
  }
  private save() {
    this.textInput = this.textInput.trim();
    if (this.textInput === '') {
      alert('Text input is empty');
      return;
    }
    const data = this.appService.parseTextToData(this.textInput);
    switch (this.appService.currentPageMode) {
      case PageMode.NEW:
        this.appService.appendNewPage(this.pageName.trim(), data);
        break;
      case PageMode.EDIT:
        this.workspaceName = this.workspaceName.trim() || 'Example Workspace';
        this.appService.updatePage(this.workspaceName, this.pageName.trim(), data);
        break;

      default:
        break;
    }
  }
}
