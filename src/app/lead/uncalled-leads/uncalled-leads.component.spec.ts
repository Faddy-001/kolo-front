import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncalledLeadsComponent } from './uncalled-leads.component';

describe('UncalledLeadsComponent', () => {
  let component: UncalledLeadsComponent;
  let fixture: ComponentFixture<UncalledLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UncalledLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UncalledLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
