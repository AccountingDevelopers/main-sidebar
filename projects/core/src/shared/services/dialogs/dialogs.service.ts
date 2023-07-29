import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ModuleControlsComponent } from '../../dialogs/module-controls/module-controls.component';
import { from, fromEvent, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  constructor(private readonly dialogService: DialogService) { }

  open(dialogName: string, data: any) {
    window.postMessage({
      action: dialogName,
      ...data
    })

    return {
      onClose: fromEvent(window, 'message').pipe(tap((response: any) => response.data))
    }
  }
}
