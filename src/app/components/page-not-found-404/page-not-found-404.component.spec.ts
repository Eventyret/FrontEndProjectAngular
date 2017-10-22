import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFound404Component } from './page-not-found-404.component';

describe('PageNotFound404Component', () => {
  let component: PageNotFound404Component;
  let fixture: ComponentFixture<PageNotFound404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFound404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFound404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
