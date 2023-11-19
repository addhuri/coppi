import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { DeletePage, DeleteWorkspace } from 'src/app/store/app.actions';
import { RootState, get_workspaces } from 'src/app/store/app.rootReducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  readonly subscription = new Subscription();
  readonly buildInfo = `Coppi\nVersion: ${environment.APP_VERSION}\nBuild: ${environment.APP_BUILD_DATE}`;
  treeNodes: any[] = [];

  constructor(private modalService: NgbModal, private appService: AppService, private store: Store<RootState>) { }

  ngOnInit(): void {
    this.subscription.add(this.store.select(get_workspaces).subscribe(workspaces => {
      this.appService.workspaces = workspaces;
      const tree = Object.values(workspaces).filter(w => w).map((workspace: any) => {
        const children = workspace ? Object.values(workspace.pages) : [];
        return {
          name: workspace.name, id: workspace.id, children
        }
      });
      this.treeNodes = tree;
      this.checkAndAddExampleWorkspace(tree);
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private checkAndAddExampleWorkspace(tree: Array<any>) {
    const exampleWorkspace = tree.find(workspace => workspace.name === 'Example Workspace');
    if (!exampleWorkspace) {
      this.appService.appendExampleWorkspace();
    }
  }

  ut_open(content: any, workspaceId: string = "") {
    this.appService.newPage.workspaceId = workspaceId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }
  ut_save() {
    this.appService.saveEventEmitter.emit();
    // this.modalService.dismissAll();
  }
  ut_addNewPage() {
    this.appService.savePageEventEmitter.emit();
  }
  ut_deleteWorkspace(workspaceId: string) {
    this.store.dispatch(DeleteWorkspace(workspaceId))
  }
  ut_deletePage(workspaceId: string, pageId: string) {
    this.store.dispatch(DeletePage(workspaceId, pageId))
  }
}
