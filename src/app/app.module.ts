import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { StoreModule } from '@ngrx/store';
import { metaReducerLocalStorage, rootReducers } from './store/app.rootReducer';
import { NewPageFormComponent } from './components/new-page-form/new-page-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    InputFormComponent,
    NewPageFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    StoreModule.forRoot(rootReducers, { metaReducers: [metaReducerLocalStorage] }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
