import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDialogComponent } from './car-dialog.component';

describe('CarDialogComponent', () => {
  let component: CarDialogComponent;
  let fixture: ComponentFixture<CarDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarDialogComponent]
    });
    fixture = TestBed.createComponent(CarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
