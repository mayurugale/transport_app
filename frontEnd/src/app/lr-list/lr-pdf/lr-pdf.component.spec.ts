import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrPdfComponent } from './lr-pdf.component';

describe('LrPdfComponent', () => {
  let component: LrPdfComponent;
  let fixture: ComponentFixture<LrPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LrPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
