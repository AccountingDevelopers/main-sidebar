import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private apiUrl!: string
  private clientUrl!: string

  constructor(@Inject('config') config: any, private readonly http: HttpClient) {
    const { client, server } = config.url
    this.apiUrl = server
    this.clientUrl = client
  }

  currentUser!: any
  currentCompany!: any

  async init() {
    const { company } = await lastValueFrom(this.getCurrentCompany())
    const { user } = await lastValueFrom(this.getCurrentUser())

    this.currentCompany = company
    this.currentUser = user
  }

  getCurrentCompany(): Observable<{ company: any }> {
    return this.http.get<{ company: any }>(`${this.apiUrl}/companies/current`)
  }

  getCurrentUser(): Observable<{ user: any }> {
    return this.http.get<{ user: any }>(`${this.apiUrl}/users/current`)
  }

  sendMessage(action: string, data: any) {
    return (window.parent.postMessage({
      action: action,
      config: data
    }, this.clientUrl))
  }


  addTab(tabData: any) {
    this.sendMessage('addTab', tabData)
  }
}
