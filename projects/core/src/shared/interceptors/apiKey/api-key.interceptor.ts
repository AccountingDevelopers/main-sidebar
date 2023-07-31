import { ApiService } from 'projects/core/src/shared/services/api/api.service'
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from, lastValueFrom } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor(private readonly apiService: ApiService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next))
  }

  async handle(request: HttpRequest<any>, next: HttpHandler) {
    const apiKey = this.apiService.apiKey
    request = request.clone({
      setHeaders: {
        apikey: apiKey,
        Accept: 'application/json'
      }
    })
    
    return await lastValueFrom(next.handle(request))
  }
}
