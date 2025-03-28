import { GlobalService } from './global.service';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Configuraciones } from '../../enviroments/configuraciones';
import { Usuario } from '../models/usuario';
import { Cuenta } from '../models/cuenta';
import { Login } from '../models/login.interface';
import { Observable, timeout } from 'rxjs';
import { Template } from '../models/template';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuarioActual: Usuario | any;
  public usuarioGrabado: Usuario | any;
  public templateActivo: Template | any;
  public logueado: boolean = false;
  public static instancia: UsuarioService;
  public servicioDisponible = false;
  public static conexion: any;
  public cuenta: Cuenta | any;
  public versionServicio: string | any;
  public versionGestagro: string | any;
  public configuraciones = Configuraciones;
  public msgLoginRepuesta: string | any;
  public timeOut : any;
  constructor(private http: HttpClient, private globalService: GlobalService) {}



  cambiarClave(cuenta: string, claveNueva: string, claveActual:string): Observable<any> {

    const url = this.getURLServicio(cuenta) + '/cambiarClaveDeAcceso';
    const tokenHashId = this.globalService.getTokenHashId()['hashId'];
    const claveActualMD5 = CryptoJS.MD5(claveActual).toString();
    const claveNuevaMD5 = CryptoJS.MD5(claveNueva).toString();
    const params = {
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': tokenHashId,
        'claveNueva': claveNuevaMD5,
        'claveAnterior': claveActualMD5,


      })
    };

    return this.http.post(url, params, httpOptions);
  }



  cambiarCorreo(cuenta: string, correo: string): Observable<any> {
    const url = this.getURLServicio(cuenta) + '/cambiarEmail';
    const tokenHashId = this.globalService.getTokenHashId()['hashId'];
    const params = {
     // email: correo
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': tokenHashId,
        'email': correo,

      })
    };
    return this.http.post(url, params, httpOptions);
  }


  pedirRestitucionDeClave(cuenta: string): Observable<any> {
    const url = this.getURLServicio(cuenta) + '/recuperarClave';
    const params = {
     //
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',



      })
    };
    return this.http.post(url, params, httpOptions);
  }


  cambiarConfirmarNuevaClave(cuenta: string, claveNueva: string, hashId: string): Observable<any> {
    const url = this.getURLServicio(cuenta) + '/resetearClaveDeAcceso';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'claveNueva': CryptoJS.MD5(claveNueva).toString(),
        'hashIdPedido': hashId



      })
    };
    return this.http.post(url, {}, httpOptions);
  }




  /*
    Éste método valida que se pueda hacer login con las credenciales guardadas.
    devuelve true o false según se pudo o no.
  */
  async trySavedLogin() {


    /*return new Promise(async (resolve, reject) => {
      try {*/
    let credenciales: any = localStorage.getItem('usuarioActual');
    this.usuarioGrabado = JSON.parse(credenciales);
    console.log('Hay credenciales! :) -> ' + credenciales);
    console.log('Token valido hasta: ' + this.usuarioGrabado.token.fechaHasta);
    const today = new Date();
    const fechaHoy = today.toDateString();
    const fechaToken = new Date(this.usuarioGrabado.token.fechaHasta);
    const fechaActual = new Date(fechaHoy);

    if (new Date(fechaToken) < new Date(fechaHoy)){
     this.logueado = false;
      this.logout();
      return this.logueado;

    }else{
      if (this.usuarioGrabado.token.hashId != '') {
        return new Promise(async (resolve, reject) => {
          let token: string = this.usuarioGrabado.token.hashId;
          let parametros: URLSearchParams = new URLSearchParams();

          try {
            const url =
              `${this.getUrlTestToken(this.usuarioGrabado.cuenta.id)}?` +
              parametros;
              const params = { parametros };
              const httpOptions = {
                headers: new HttpHeaders({
                  token: token,
                }),
              };

              this.http.get(url, httpOptions).subscribe((resp: any) => {
              let control = resp.control;
              if (control.codigo == 'OK') {
                this.logueado = true;

              } else {
                this.logueado = false;
              }
              resolve(this.logueado);
            })
            } catch (error: any) {

            const dataError = JSON.parse(error.error);
            reject(dataError.control.descripcion);
          }
        })
        ;


      } else {
        alert("ERROR")
        // no hay credenciales asi que lo mando a pantalla de login
      }
    }
  return "";
  }

  public logout(): void {
    this.globalService.logout();

  }

  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLServicio(usuario: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.miCuentaUrl+usuario;
  }


  public getUrlTestToken(usuario: string): string {
    return Configuraciones.authUrl + usuario + '/testToken';
  }



// Verificar si el usuario está autenticado
 isAuthenticated(): any {
  return this.globalService.getUsuarioLogueado() !== null;

}




  /**
   * Esta funcion devuelve la URL del recurso Dummy
   */
  private getURLDummy() {
    return Configuraciones.dummyUrl;
  }
}
