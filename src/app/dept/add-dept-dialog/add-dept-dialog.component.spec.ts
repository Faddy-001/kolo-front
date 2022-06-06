import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeptDialogComponent } from './add-dept-dialog.component';

describe('AddDeptDialogComponent', () => {
  let component: AddDeptDialogComponent;
  let fixture: ComponentFixture<AddDeptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeptDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
