import { GlobalService } from './global.service';
import { Notificaciones } from '../models/notificaciones';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Configuraciones } from '../../enviroments/configuraciones';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService implements OnInit {
  private notificaciones = new BehaviorSubject<Notificaciones[]>([]);
  public notificaciones$ = this.notificaciones.asObservable();



  constructor(private globalService: GlobalService, private http: HttpClient,) {}





  agregarNotificacion(notificacion: Notificaciones) {
    const notificacionesActuales = this.notificaciones.getValue();
    this.notificaciones.next([...notificacionesActuales, notificacion]);
  }

  eliminiarNotificacion(notificacionId: number) {
    const currentNotifications = this.notificaciones.getValue().filter(n => n.idMensaje !== notificacionId);
    this.notificaciones.next(currentNotifications);
  }

  getNotificaciones(): Observable<any> {
   const usuario: string = this.globalService.getUsuarioLogueado().cuenta.id;
   const url = this.getURLServicio(usuario);
   const tokenHashId = this.globalService.getTokenHashId()['hashId'];
   const params = {};
   const httpOptions = {
     headers: new HttpHeaders({
       token: tokenHashId,
     }),
   };
     return this.http.get(url,  httpOptions)
   }

   setClavarElVisto(id:any): Observable<any> {
    const usuario: string = this.globalService.getUsuarioLogueado().cuenta.id;
    const url = this.getURLServicio(usuario)+"/visto/"
    const tokenHashId = this.globalService.getTokenHashId()['hashId'];
    const params = {};
    const httpOptions = {
      headers: new HttpHeaders({
        token: tokenHashId,
        idMensaje : id
      }),
    };
      return this.http.post(url, params, httpOptions)
    }



    borrarNotificacion(id:any): Observable<any> {
      const usuario: string = this.globalService.getUsuarioLogueado().cuenta.id;
      const url =  this.getURLServicio(usuario)+"/borrar/"
      const tokenHashId = this.globalService.getTokenHashId()['hashId'];
      const params = {};
      const httpOptions = {
        headers: new HttpHeaders({
          token: tokenHashId,
          idMensaje : id
        }),
      };
        return this.http.post(url,  params, httpOptions)
      }






  ngOnInit(): void {


  }






  // Verificar si el usuario está autenticado
  isAuthenticated(): any {
    return this.globalService.getUsuarioLogueado() !== null;

  }
   private getURLServicio(cuenta: string) {
      // Por ahora devuelvo el string como esta, despues hay que usar el token
      return Configuraciones.urlBase+"/notificaciones/"+cuenta;
    }



}
