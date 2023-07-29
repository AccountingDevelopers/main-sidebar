
import { NgModule, ModuleWithProviders, OnInit, APP_INITIALIZER } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { IConfiguration } from "./shared/interfaces/package.interfaces";
import { CoreComponent } from "./core.component";
import { ApiKeyInterceptor } from "./shared/interceptors/apiKey/api-key.interceptor";
import { ModuleControlsModule } from "./shared/dialogs/module-controls/module-controls.module";
import { DialogService } from "primeng/dynamicdialog";
import { SystemService } from "./shared/services/system/system.service";

@NgModule({
    declarations: [CoreComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ModuleControlsModule
    ],
    providers: [
        DialogService,
        [{
            provide: HTTP_INTERCEPTORS,
            useClass: ApiKeyInterceptor,
            multi: true
        }],
        {
            provide: APP_INITIALIZER,
            useFactory: (service: SystemService) => function () { 
                return service.init()
            },
            deps: [SystemService],
            multi: true
        }
    ]
})
export class CoreModule {
    static forRoot(configuration: IConfiguration): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: 'config',
                    useValue: configuration.api
                }
            ]
        }
    }
}