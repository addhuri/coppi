import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Workspaces } from 'src/app/services/app.interface';
import { AppService } from 'src/app/services/app.service';
import { EmptyPage, GreyPageText, WhitePageText } from 'src/app/services/constants';
import { RootState, get_workspaces } from 'src/app/store/app.rootReducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  readonly subscription = new Subscription();
  sectionLineItems = this.appService.parseTextToData(WhitePageText);
  // sectionLineItems = this.appService.parseTextToData(GreyPageText);
  workspaces: Workspaces = {}
  workspaceId: string = '';
  pageId: string = '';


  constructor(private appService: AppService, private store: Store<RootState>, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription.add(this.store.select(get_workspaces).subscribe(workspaces => {
      this.workspaces = workspaces;
      this.updateView(); // to update on CRUD operations
    }));

    this.subscription.add(this.activatedRoute.params.subscribe((params: Params) => {
      const { workspaceId, pageId } = params;
      if (workspaceId && pageId) {
        this.workspaceId = workspaceId;
        this.pageId = pageId;
        this.updateView(); // to update on route change/navigation
      } else {
        this.sectionLineItems = EmptyPage;
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private updateView() {
    if (this.workspaceId && this.pageId) {
      this.sectionLineItems = this.workspaces[this.workspaceId]?.pages[this.pageId]?.data || EmptyPage;
    } else {
      this.sectionLineItems = EmptyPage
    }
  }


  ut_action(event: any, text: string) {
    if (event.ctrlKey) {
      window.open(text, '_blank');
    } else {
      this.copy(text);
    }
  }
  private copy(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
