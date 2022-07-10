import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignorBillComponent } from './consignor-bill.component';

describe('ConsignorBillComponent', () => {
  let component: ConsignorBillComponent;
  let fixture: ComponentFixture<ConsignorBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignorBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignorBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
