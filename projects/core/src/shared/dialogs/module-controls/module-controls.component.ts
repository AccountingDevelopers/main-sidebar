import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'lib-module-controls',
  templateUrl: './module-controls.component.html',
  styleUrls: ['./module-controls.component.scss']
})
export class ModuleControlsComponent {
  constructor(public readonly ref: DynamicDialogRef) {}

  createModuleForm: FormGroup = new FormGroup({
    label: new FormControl(null, [Validators.required]),
    identifier: new FormControl(null, [Validators.required, Validators.pattern(/[a-z]/)])
})

  onClose() {
    this.ref.close(this.createModuleForm.value)
  }
}
