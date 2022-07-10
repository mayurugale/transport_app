import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignorTransactionComponent } from './consignor-transaction.component';

describe('ConsignorTransactionComponent', () => {
  let component: ConsignorTransactionComponent;
  let fixture: ComponentFixture<ConsignorTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignorTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignorTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
