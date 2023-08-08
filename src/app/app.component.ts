import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccApiService } from 'ng-accounting';
import { AccDialogService } from 'ng-accounting';
import { AccSystemService } from 'ng-accounting';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        private readonly accApiService: AccApiService,
        public readonly accSystemService: AccSystemService,
        private readonly accDialogService: AccDialogService
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
        this.subscription.add(this.accApiService.getModules({}).subscribe({
            next: ({ modules }) => {
                this.modules = modules
            }
        }))
    }

    onCreateModule() {
        this.subscription.add(this.accDialogService.open('createModule', { mode: 'create' }).onClose.subscribe({
            next: (event: MessageEvent) => {
                const { action, config } = event.data
                if (action === 'dialogResponse') {
                    this.createModule(config)
                }
            }
        }))
    }

    createModule(data: any) {
        this.subscription.add(this.accApiService.createModule(data).subscribe({
            next: () => {
                this.fetchModules()
            }
        }))
    }

    openModule(module: any) {
        const url = `content/${module.identifier}`
        this.navigateTo(url)
        this.accSystemService.addTab({
            label: module.label,
            routerLink: url
        })
    }

    navigateTo(url: string | string[], addTabConf?: { label: string }): void {
        this.accApiService.navigateTo(url)

        if (addTabConf) {
            this.accSystemService.addTab({
                label: addTabConf.label,
                routerLink: url
            })
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
