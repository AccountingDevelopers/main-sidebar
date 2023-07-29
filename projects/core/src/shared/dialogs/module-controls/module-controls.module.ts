import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleControlsComponent } from './module-controls.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ModuleControlsComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  exports: [ModuleControlsComponent]
})
export class ModuleControlsModule { }
