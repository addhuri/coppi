import { Injectable, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store/app.rootReducer';
import { CreatePage, CreateWorkspace, ToggleSidebar, UpdatePage } from '../store/app.actions';
import { GreyPageText, WhitePageText } from './constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Page, PageData, PageMode, Workspace, Workspaces } from './app.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  saveEventEmitter: EventEmitter<void> = new EventEmitter();
  savePageEventEmitter: EventEmitter<void> = new EventEmitter();
  workspaces: Workspaces = {};
  newPage = { workspaceId: 0, pageId: 0 };
  currentPageMode = PageMode.VIEW;
  isVisibleSidebar = true;

  constructor(private store: Store<RootState>, private modalService: NgbModal) {
    if (localStorage.getItem('theme') === 'light') {
      this.changeTheme('light');
    } else {
      this.changeTheme('dark');
    }
  }

  parseTextToData(text: string) {
    const sections = text.split("---");
    const sectionLines = sections.map(section => section.split("\n").filter(line => line.trim()));
    const sectionLineItems = sectionLines.map(section => {
      return section.map(line => {
        return line.trim().split(",,").filter(i => i.trim()).map(i => i.replace(/\\n/g, "\n"));
      });
    });
    return sectionLineItems;
  }
  parseDataToText(data: string[][][]) {
    return data.map(section => {
      return section.map(line => {
        return line.map(item => item.replace(/\n/g, "\\n")).join(",,");
      }).join("\n");
    }).join("\n---\n");
  }
  newWorkspace(workspaceName: string, pageName: string, data: PageData) {
    const page = {
      id: +new Date(),
      name: pageName || 'New Page',
      data
    };

    const workspace = {
      id: +new Date(),
      name: workspaceName || 'New Workspace',
      pages: {
        [page.id]: page
      }
    };
    this.store.dispatch(CreateWorkspace(workspace));
    this.modalService.dismissAll();
  }
  newWorkspaceMultiplePages(workspaceName: string, pages: Array<Page>) {
    const workspace: Workspace = {
      id: +new Date(),
      name: workspaceName || 'New Workspace',
      pages: {}
    };
    pages.forEach((page) => {
      workspace.pages[page.id] = page;
    });
    this.store.dispatch(CreateWorkspace(workspace));
  }
  appendNewPage(pageName: string, data: PageData) {
    const page = {
      id: +new Date(),
      name: pageName || 'New Page',
      data
    };
    this.store.dispatch(CreatePage(this.newPage.workspaceId, page));
    this.modalService.dismissAll();
  }
  updatePage(workspaceName: string, pageName: string, data: PageData) {
    const page = {
      id: this.newPage.pageId,
      name: pageName || 'New Page',
      data
    };
    this.store.dispatch(UpdatePage(this.newPage.workspaceId, workspaceName, page));
    this.modalService.dismissAll();
  }

  appendExampleWorkspace() {
    const workspaceName = 'Example Workspace';
    const pages = [
      {
        id: +new Date(),
        name: 'White Page',
        data: this.parseTextToData(WhitePageText)
      },
      {
        id: + new Date() + 1,
        name: 'Grey Page',
        data: this.parseTextToData(GreyPageText)
      }
    ];
    this.newWorkspaceMultiplePages(workspaceName, pages);
  }

  changeTheme(mode: 'light' | 'dark') {
    document.body.setAttribute('data-bs-theme', mode);
    localStorage.setItem('theme', mode);
  }
  ut_toggleSidebar() {
    this.store.dispatch(ToggleSidebar());
  }
}
