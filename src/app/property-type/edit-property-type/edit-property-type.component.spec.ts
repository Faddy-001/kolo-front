import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertyTypeComponent } from './edit-property-type.component';

describe('EditPropertyTypeComponent', () => {
  let component: EditPropertyTypeComponent;
  let fixture: ComponentFixture<EditPropertyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPropertyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
