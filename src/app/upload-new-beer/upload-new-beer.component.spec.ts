import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNewBeerComponent } from './upload-new-beer.component';

describe('UploadNewBeerComponent', () => {
  let component: UploadNewBeerComponent;
  let fixture: ComponentFixture<UploadNewBeerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadNewBeerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNewBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
