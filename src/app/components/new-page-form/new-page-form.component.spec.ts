import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPageFormComponent } from './new-page-form.component';

describe('NewPageFormComponent', () => {
  let component: NewPageFormComponent;
  let fixture: ComponentFixture<NewPageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPageFormComponent]
    });
    fixture = TestBed.createComponent(NewPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
