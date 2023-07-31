import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'projects/core/src/shared/services/api/api.service';
import { SystemDialogService } from 'projects/core/src/shared/services/dialogs/system-dialog.service';
import { SystemService } from 'projects/core/src/shared/services/system/system.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: []
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        private readonly apiService: ApiService,
        public readonly systemService: SystemService,
        private readonly systemDialogService: SystemDialogService
    ) { }

    subscription: Subscription = new Subscription()
    modules: any[] = []
    loadingConfig = {
        isLoadingData: false
    }


    ngOnInit(): void {
        this.fetchModules()
    }

    fetchModules(): void {
        this.subscription.add(this.apiService.getModules({}).subscribe({
            next: ({ modules }) => {
                this.modules = modules
            }
        }))
    }

    onCreateModule() {
        this.systemDialogService.open('createModule', { mode: 'create' }).onClose.subscribe({
            next: (event: MessageEvent) => {
                const { action, config } = event.data
                if (action === 'dialogResponse') {
                    this.createModule(config)
                }
            }
        })
    }

    createModule(data: any) {
        this.subscription.add(this.apiService.createModule(data).subscribe({
            next: () => {
                this.fetchModules()
            }
        }))
    }


    openModule(module: any) {
        const url = `content/${module.identifier}`
        this.navigateTo(url)
        this.systemService.addTab({
            label: module.label,
            routerLink: url
        })
    }

    navigateTo(url: string | string[]): void {
        this.apiService.navigateTo(url)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
