import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HwpViewerComponent } from './hwp-viewer.component';

describe('HwpViewerComponent', () => {
  let component: HwpViewerComponent;
  let fixture: ComponentFixture<HwpViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HwpViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HwpViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
