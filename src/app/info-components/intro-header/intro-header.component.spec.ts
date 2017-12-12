import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IntroHeaderComponent } from "./intro-header.component";

describe("IntroHeaderComponent", () => {
  let component: IntroHeaderComponent;
  let fixture: ComponentFixture<IntroHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
