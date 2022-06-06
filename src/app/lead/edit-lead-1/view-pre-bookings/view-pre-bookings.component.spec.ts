import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPreBookingsComponent } from './view-pre-bookings.component';

describe('ViewPreBookingsComponent', () => {
  let component: ViewPreBookingsComponent;
  let fixture: ComponentFixture<ViewPreBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPreBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPreBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
