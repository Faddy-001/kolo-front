import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeptDialogComponent } from './edit-dept-dialog.component';

describe('EditDeptDialogComponent', () => {
  let component: EditDeptDialogComponent;
  let fixture: ComponentFixture<EditDeptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeptDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
