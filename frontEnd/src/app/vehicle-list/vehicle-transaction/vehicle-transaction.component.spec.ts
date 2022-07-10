import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTransactionComponent } from './vehicle-transaction.component';

describe('VehicleTransactionComponent', () => {
  let component: VehicleTransactionComponent;
  let fixture: ComponentFixture<VehicleTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
