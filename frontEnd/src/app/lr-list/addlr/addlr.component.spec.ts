import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlrComponent } from './addlr.component';

describe('AddlrComponent', () => {
  let component: AddlrComponent;
  let fixture: ComponentFixture<AddlrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
