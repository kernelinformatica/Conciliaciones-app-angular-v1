import { Cuenta } from '../models/cuenta';
import { Usuario } from '../models/usuario';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { DetalleCereal } from '../models/detallecereal';
import { LoginService } from './login.service';
//Agrego las configuraciones
import { Configuraciones } from '../../enviroments/configuraciones';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Template } from '../models/template';
@Injectable({
  providedIn: 'root'
})
export class CerealesService {
  public templateActivo: Template | any;
  public logueado: boolean = false;
  public static instancia: CerealesService;
  public servicioDisponible = false;
  public static conexion: any;
  public cuenta: Cuenta | any;
  public configuraciones = Configuraciones;
  public timeOut : any;

  constructor(private http: HttpClient, private globalService: GlobalService,) {}


 getResumenDeCereales(cuenta: string): Observable<any> {
  const usuario: string = cuenta
  const url = this.getURLServicioResumenCereal(usuario);
  const tokenHashId = this.globalService.getTokenHashId()['hashId'];
  const params = {};
  const httpOptions = {
    headers: new HttpHeaders({
      token: tokenHashId,
    }),
  };
    return this.http.get(url,  httpOptions)
  }
  getFichaDeCereales(cuenta: string, cereal: string, clase:string, cosecha:string): Observable<any> {
    const usuario: string = cuenta

    const url = this.getURLServicioFichaCereal(usuario);
    const tokenHashId = this.globalService.getTokenHashId()['hashId'];
    let params = new HttpParams()
    .set('cereal', cereal)
    .set('clase', clase)
    .set('cosecha', cosecha);

    const httpOptions = {
      headers: new HttpHeaders({
        token: tokenHashId,
      }),
      params: params
    };
      return this.http.get(url,  httpOptions)
    }

    getFichaRomPendientes(cuenta: string, cereal: string, clase:string, cosecha:string): Observable<any> {
      const usuario: string = cuenta

      const url = this.getURLServicioFichaRomaneos(usuario);
      const tokenHashId = this.globalService.getTokenHashId()['hashId'];
      let params = new HttpParams()
      .set('cereal', cereal)
      .set('clase', clase)
      .set('cosecha', cosecha);

      const httpOptions = {
        headers: new HttpHeaders({
          token: tokenHashId,
        }),
        params: params
      };
        return this.http.get(url,  httpOptions)
      }



  private getURLServicioResumenCereal(cuenta: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.resumenUrl+cuenta;
  }

  private getURLServicioFichaCereal(cuenta: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.detalleCerUrl+cuenta;
  }
  private getURLServicioFichaRomaneos(cuenta: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.detalleCerUrl+cuenta;
  }
}
