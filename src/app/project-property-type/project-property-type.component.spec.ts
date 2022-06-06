import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPropertyTypeComponent } from './project-property-type.component';

describe('ProjectPropertyTypeComponent', () => {
  let component: ProjectPropertyTypeComponent;
  let fixture: ComponentFixture<ProjectPropertyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPropertyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
