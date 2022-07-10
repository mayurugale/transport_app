import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrListComponent } from './lr-list.component';

describe('LrListComponent', () => {
  let component: LrListComponent;
  let fixture: ComponentFixture<LrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LrListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
