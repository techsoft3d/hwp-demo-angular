import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTreeItemComponent } from './model-tree-item.component';

describe('ModelTreeItemComponent', () => {
  let component: ModelTreeItemComponent;
  let fixture: ComponentFixture<ModelTreeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelTreeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
