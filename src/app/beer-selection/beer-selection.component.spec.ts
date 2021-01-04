import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerSelectionComponent } from './beer-selection.component';

describe('BeerSelectionComponent', () => {
  let component: BeerSelectionComponent;
  let fixture: ComponentFixture<BeerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
