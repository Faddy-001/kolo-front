import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebookingComponent } from './prebooking.component';

describe('PrebookingComponent', () => {
  let component: PrebookingComponent;
  let fixture: ComponentFixture<PrebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrebookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
