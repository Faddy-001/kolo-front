import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectPropertyTypeComponent } from './add-project-property-type.component';

describe('AddProjectPropertyTypeComponent', () => {
  let component: AddProjectPropertyTypeComponent;
  let fixture: ComponentFixture<AddProjectPropertyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectPropertyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectPropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
