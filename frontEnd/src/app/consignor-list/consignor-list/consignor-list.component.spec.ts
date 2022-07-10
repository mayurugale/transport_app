import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignorListComponent } from './consignor-list.component';

describe('ConsignorListComponent', () => {
  let component: ConsignorListComponent;
  let fixture: ComponentFixture<ConsignorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
