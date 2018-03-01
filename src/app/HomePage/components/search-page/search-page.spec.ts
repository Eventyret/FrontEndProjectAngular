import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CardStyleComponent } from "./card-style.component";

describe("CardStyleComponent", () => {
  let component: CardStyleComponent;
  let fixture: ComponentFixture<CardStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
