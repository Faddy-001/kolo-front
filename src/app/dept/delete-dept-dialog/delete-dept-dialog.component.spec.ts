import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeptDialogComponent } from './delete-dept-dialog.component';

describe('DeleteDeptDialogComponent', () => {
  let component: DeleteDeptDialogComponent;
  let fixture: ComponentFixture<DeleteDeptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDeptDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDeptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
