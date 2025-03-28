import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona la solicitud para agregar el encabezado de autenticación
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer YOUR_AUTH_TOKEN')
    });

    // Pasa la solicitud clonada en lugar de la original al siguiente manejador
    return next.handle(authReq);
  }
}
