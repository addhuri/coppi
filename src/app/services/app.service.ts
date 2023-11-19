import { Injectable, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store/app.rootReducer';
import { CreatePage, CreateWorkspace } from '../store/app.actions';
import { GreyPageText, WhitePageText } from './constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  saveEventEmitter: EventEmitter<void> = new EventEmitter();
  savePageEventEmitter: EventEmitter<void> = new EventEmitter();
  workspaces: any = {};
  newPage = { workspaceId: '' };

  constructor(private store: Store<RootState>, private modalService: NgbModal) { }

  parseText(text: string) {
    const sections = text.split("---");
    const sectionLines = sections.map(section => section.split("\n").filter(line => line.trim()));
    const sectionLineItems = sectionLines.map(section => {
      return section.map(line => {
        return line.trim().split(",,").filter(i => i.trim()).map(i => i.replace(/\\n/g, "\n"));
      });
    });
    return sectionLineItems;
  }
  newWorkspace(workspaceName: string, pageName: string, data: Array<any>) {
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
  newWorkspaceMultiplePages(workspaceName: string, pages: Array<any>) {
    const workspace: any = {
      id: +new Date(),
      name: workspaceName || 'New Workspace',
      pages: {}
    };
    pages.forEach((page: any) => {
      workspace.pages[page.id] = page;
    });
    this.store.dispatch(CreateWorkspace(workspace));
  }
  appendNewPage(pageName: string, data: Array<any>) {
    const page = {
      id: +new Date(),
      name: pageName || 'New Page',
      data
    };
    this.store.dispatch(CreatePage(this.newPage.workspaceId, page));
    this.modalService.dismissAll();
  }

  appendExampleWorkspace() {
    const workspaceName = 'Example Workspace';
    const pages = [
      {
        id: +new Date(),
        name: 'White Page',
        data: this.parseText(WhitePageText)
      },
      {
        id: + new Date() + 1,
        name: 'Grey Page',
        data: this.parseText(GreyPageText)
      }
    ];
    this.newWorkspaceMultiplePages(workspaceName, pages);
  }
}
