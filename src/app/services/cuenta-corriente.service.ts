import { GlobalService } from './global.service';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Configuraciones } from '../../enviroments/configuraciones';
import { Usuario } from '../models/usuario';
import { Cuenta } from '../models/cuenta';
import { ResumenCuenta } from '../models/resumenctacte';
import { Login } from '../models/login.interface';
import { Observable, timeout } from 'rxjs';
import { Template } from '../models/template';
import { formatDate } from '@angular/common';



@Injectable({
  providedIn: 'root',
})
export class CuentaCorrienteService {
  public templateActivo: Template | any;
  public logueado: boolean = false;
  public static instancia: CuentaCorrienteService;
  public servicioDisponible = false;
  public static conexion: any;
  public cuenta: Cuenta | any;
  public configuraciones = Configuraciones;
  public timeOut : any;
  constructor(private http: HttpClient, private globalService: GlobalService,) {}




  getCuentaCorrienteDolar(cuenta: string): Observable<any> {


    const usuario: string = cuenta
    const url = this.getURLServicioDolar(usuario);
    const tokenHashId = this.globalService.getTokenHashId()['hashId'];
    const params = {};
    const httpOptions = {
      headers: new HttpHeaders({
        token: tokenHashId,
      }),
    };
      return this.http.get(url,  httpOptions)
  }


  getCuentaCorrienteDolarIvaPendiente(cuenta: string): Observable<any> {


    const usuario: string = cuenta
    const url = this.getURLServicioDolarIvaPend(usuario);
    const tokenHashId = this.globalService.getTokenHashId()['hashId'];
    const params = {};
    const httpOptions = {
      headers: new HttpHeaders({
        token: tokenHashId,
      }),
    };
      return this.http.get(url,  httpOptions)
  }

 getCuentaCorrientePesos(cuenta: string): Observable<any> {
  const usuario: string = cuenta
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





  private getURLServicio(cuenta: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.urlBase+"/detallecc/"+cuenta;
  }
  private getURLServicioDolarIvaPend(cuenta: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.urlBase+"/detalleccuss/"+cuenta+"/ivapend";
  }
  private getURLServicioDolar(cuenta: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.urlBase+"/detalleccuss/"+cuenta;
  }



}
