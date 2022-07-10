import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTransactionComponent } from './driver-transaction.component';

describe('DriverTransactionComponent', () => {
  let component: DriverTransactionComponent;
  let fixture: ComponentFixture<DriverTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
