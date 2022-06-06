import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnameFieldComponent } from './editname-field.component';

describe('EditnameFieldComponent', () => {
  let component: EditnameFieldComponent;
  let fixture: ComponentFixture<EditnameFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnameFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnameFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
