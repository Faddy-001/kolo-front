import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-property-type',
  templateUrl: './add-property-type.component.html',
  styleUrls: ['./add-property-type.component.scss']
})
export class AddPropertyTypeComponent implements OnInit {
  addPropertyTypeForm: FormGroup;
  errorMsg: string | undefined;
  constructor(public dialogRef: MatDialogRef<AddPropertyTypeComponent>, private formbuilder: FormBuilder,
    public toastr: ToastrService, private mainService: MainService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addPropertyTypeForm = this.formbuilder.group({
      name: [null, Validators.required],
      description: [null],
      area_type: [null],
    })
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  submit(value: any) {
    this.mainService.addPropertyType(value).subscribe((result) => {
      this.data = result;
      this.dialogRef.close(this.data);
      this.toastr.success(this.data.message)
    },
      err => {
        this.data = err;
        this.errorMsg = this.data.error.error.name;
        //this.dialogRef.close(this.errorMsg);
        this.toastr.error(this.errorMsg)
      })

  }


}
