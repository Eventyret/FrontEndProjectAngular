import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MoviefactsComponent } from "./moviefacts.component";

describe("MoviefactsComponent", () => {
  let component: MoviefactsComponent;
  let fixture: ComponentFixture<MoviefactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviefactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviefactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
