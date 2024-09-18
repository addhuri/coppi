import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Page, PageMode, TreeNode } from 'src/app/services/app.interface';
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
  PageMode = PageMode
  readonly subscription = new Subscription();
  readonly buildInfo = `Coppi\nVersion: ${environment.APP_VERSION}\nBuild: ${environment.APP_BUILD_DATE}`;
  treeNodes: Array<TreeNode> = [];
  pageModalTitle = 'Create new page';
  constructor(private modalService: NgbModal, public appService: AppService, private store: Store<RootState>) { }

  ngOnInit(): void {
    this.subscription.add(this.store.select(get_workspaces).subscribe(workspaces => {
      this.appService.workspaces = workspaces;
      const tree = Object.values(workspaces).filter(w => w).map((workspace) => {
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
  private checkAndAddExampleWorkspace(tree: Array<TreeNode>) {
    const exampleWorkspace = tree.find(workspace => workspace.name === 'Example Workspace');
    if (!exampleWorkspace) {
      this.appService.appendExampleWorkspace();
    }
  }

  ut_open(content: any, workspaceId: number = 0) {
    this.appService.newPage.workspaceId = workspaceId;
    this.modalService.open(content, { size: 'xl' });
  }
  ut_save() {
    this.appService.saveEventEmitter.emit();
    // this.modalService.dismissAll();
  }
  ut_addNewPage() {
    this.appService.savePageEventEmitter.emit();
  }
  ut_updatePage() {
    this.appService.savePageEventEmitter.emit();
  }
  ut_deleteWorkspace(workspaceId: number) {
    this.store.dispatch(DeleteWorkspace(workspaceId))
  }
  ut_deletePage(workspaceId: number, pageId: number) {
    this.store.dispatch(DeletePage(workspaceId, pageId))
  }
  ut_dropdown(event: any) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
  ut_action(action: PageMode, node: TreeNode, child: Page | null, content: any) {
    this.appService.currentPageMode = action;
    this.appService.newPage.workspaceId = node.id;
    if (child?.id) {
      this.appService.newPage.pageId = child.id;
    }
    switch (action) {
      case PageMode.NEW:
        this.pageModalTitle = 'Create new page';
        this.appService.newPage.pageId = 0;
        this.modalService.open(content, { size: 'xl' });
        break;
      case PageMode.VIEW:
        this.pageModalTitle = 'View page';
        this.modalService.open(content, { size: 'xl' });
        break;
      case PageMode.EDIT:
        this.pageModalTitle = 'Edit page';
        this.modalService.open(content, { size: 'xl' });
        break;
      case PageMode.DUPLICATE:
        if (child) {
          this.appService.appendNewPage(child.name + ' Copy', child.data);
        }
        break;
      case PageMode.DELETE:
        if (child?.id) {
          this.store.dispatch(DeletePage(node.id, child.id))
        }
        break;
      default:
        break;
    }
  }
}
