import { SystemService } from 'projects/core/src/shared/services/system/system.service'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private key!: string
    private apiUrl!: string
    currentUser!: any
    currentCompany!: any

    constructor(@Inject('config') config: any, private readonly http: HttpClient, private readonly systemService: SystemService) {
        const { key } = config
        const { server } = config.url

        if (!key) {
            throw new Error('Invalid api key')
        }

        this.key = key
        this.apiUrl = server
    }

    get apiKey(): string {
        return this.key
    }

    set apiKey(value: string) {
        this.key = value
    }

    getModules(filter: any = {}): Observable<{ modules: any[] }> {
        return this.http.get<{ modules: any[] }>(`${this.apiUrl}/modules/fetch`, {
            params: new HttpParams({
                fromObject: {
                    filter: JSON.stringify(filter)
                }
            })
        })
    }

    getCurrentCompany(): Observable<{ company: any }> {
        return this.http.get<{ company: any }>(`${this.apiUrl}/companies/current`)
    }

    navigateTo(url: string | string[]) {
        url = Array.isArray(url) ? url.join('/') : url;
        this.systemService.sendMessage('navigateTo', url)
    }

    createModule(data: any) {
        return this.http.post(`${this.apiUrl}/modules`, data)
    }
}
