import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysFollowUpComponent } from './todays-follow-up.component';

describe('TodaysFollowUpComponent', () => {
  let component: TodaysFollowUpComponent;
  let fixture: ComponentFixture<TodaysFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysFollowUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
