import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private key!: string
    private apiUrl!: string
    currentUser!: any
    currentCompany!: any

    constructor(@Inject('config') config: any, private readonly http: HttpClient) {
        const { key, url } = config

        if (!key) {
            throw new Error('Invalid api key')
        }

        this.key = key
        this.apiUrl = url
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
        window.parent.postMessage({
            action: 'navigateTo',
            url: url
        }, 'http://localhost:4200/content')
    }

    createModule(data: any) {
        return this.http.post(`${this.apiKey}/modules`, data)
    }
}
