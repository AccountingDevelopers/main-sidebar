import {SystemService} from 'projects/core/src/shared/services/system/system.service'
import { Injectable } from '@angular/core';
import { Observable, fromEvent, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemDialogService {
  constructor(private readonly systemService: SystemService) { }

  open(dialogName: string, data: any): {onClose: Observable<any>} {
    this.systemService.sendMessage('openDialog', {
      dialogName,
      ...data
    })

    return {
      onClose: fromEvent(window, 'message')
    }
  }
}
