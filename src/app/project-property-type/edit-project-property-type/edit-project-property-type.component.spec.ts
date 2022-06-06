import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectPropertyTypeComponent } from './edit-project-property-type.component';

describe('EditProjectPropertyTypeComponent', () => {
  let component: EditProjectPropertyTypeComponent;
  let fixture: ComponentFixture<EditProjectPropertyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectPropertyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectPropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
