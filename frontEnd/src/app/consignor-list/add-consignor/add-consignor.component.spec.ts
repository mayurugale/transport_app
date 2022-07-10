import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsignorComponent } from './add-consignor.component';

describe('AddConsignorComponent', () => {
  let component: AddConsignorComponent;
  let fixture: ComponentFixture<AddConsignorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConsignorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsignorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
