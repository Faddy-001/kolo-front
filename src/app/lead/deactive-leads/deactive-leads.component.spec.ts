import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveLeadsComponent } from './deactive-leads.component';

describe('DeactiveLeadsComponent', () => {
  let component: DeactiveLeadsComponent;
  let fixture: ComponentFixture<DeactiveLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactiveLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
