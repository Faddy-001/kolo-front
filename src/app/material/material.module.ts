import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'; 
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';





@NgModule({
  declarations: [],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ] ,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatMomentDateModule,
    MatCardModule,
    MatProgressSpinnerModule

  ],
  exports: [
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
