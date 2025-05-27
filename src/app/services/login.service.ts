import { CerealesService } from './cereales.service';
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
export class LoginService {
  public usuarioActual: Usuario | any;
  public usuarioGrabado: Usuario | any;
  public templateActivo: Template | any;
  public logueado: boolean = false;
  public static instancia: LoginService;
  public servicioDisponible = false;
  public static conexion: any;
  public cuenta: Cuenta | any;
  public versionServicio: string | any;
  public versionGestagro: string | any;
  public configuraciones = Configuraciones;
  public msgLoginRepuesta: string | any;
  public timeOut : any;
  constructor(private http: HttpClient, private globalService: GlobalService, private cerealService : CerealesService) {}





  async loginUser(login: Login, remember?: boolean): Promise<string> {

    try {
      const hash = CryptoJS.MD5(login.clave);
      const url = this.getURLServicio(login.usuario);
      const params = {
        username:login.usuario,
        password: login.clave,
        clientId: 2
      };
      const httpOptions = {
        headers: new HttpHeaders({
          clave: hash.toString(),
        }),
      };

      const data: any = await this.http.post(url, params, httpOptions).toPromise();
      this.usuarioActual = data;

      //if (data.datos.empresa.accesoPlafaforma === true) {
        if (this.usuarioActual.control.estado === 'Ok') {
          const control = this.usuarioActual.control;
          this.usuarioActual = this.usuarioActual.usuario;
          this.globalService.setEmpresa(data.empresa);
          this.globalService.setUsuarioLogueado(this.usuarioActual);
          this.globalService.setPermisos(data.usuario.grupos.grupo.permisos)
          this.templateActivo = data.empresa.templates
          this.globalService.settemplateActivo(this.templateActivo)
          this.globalService.setToken(data.token);
          this.logueado = true;
          this.versionGestagro = control.versionLib;
          this.versionServicio = control.version;




          return control;

        //} else {
        //  this.logueado = false
        //  this.globalService.logout();
        //  return '';
        //}
      } else {
        this.logueado = false
        this.globalService.logout();
        return '';
      }
    } catch (error: any) {

      const dataError = JSON.stringify(error.error.control);
      return JSON.parse(dataError)

    }
  }



async consultarPedidoClave(hashIdPass: string,): Promise<any> {

  try {
    const hash =hashIdPass
    const url = this.getUrlConsultaPedidoCambioClave();
    const params = {};
    const httpOptions = {
      headers: new HttpHeaders({
        hashId: hash.toString(),
      }),
    };

    const data: any = await this.http.post(url, params, httpOptions).toPromise();
    return data.datos


  } catch (error: any) {

    const dataError = JSON.stringify(error.error.control);
    return JSON.parse(dataError)

  }
}



  recuperarClave(login: Login) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = this.getURLRecuperarClave(login.usuario);
        const params = {};
        const httpOptions = {};

        this.http.post(url, params, httpOptions).subscribe({
          next: (data: any) => {
            if (data.control.codigo == 'OK') {
              resolve({ email: data.control.descripcion });
            } else {
              resolve(null);
            }
          },
          error: (error: any) => {
            reject(error);
          },
        });
      } catch (error: any) {
        alert('Error: Ocurrio un error general, intente nuevamente más tarde.');
        const dataError = JSON.parse(error.error);
        reject(dataError.control.descripcion);
      }
    });
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
    return Configuraciones.authUrl;
  }

  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLRecuperarClave(usuario: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.authUrl + usuario + '/recuperarClave';
  }
 private getURLServicioResumen(cuenta: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.resumenUrl+cuenta;
  }


  public getUrlTestToken(usuario: string): string {
    return Configuraciones.authUrl + usuario + '/testToken';
  }

  public getUrlConsultaPedidoCambioClave(): string {
    return Configuraciones.authUrl +'traerPedidoCambioClave';
  }


// Verificar si el usuario está autenticado
 isAuthenticated(): any {
  return this.globalService.getUsuarioLogueado() !== null;

}




  /**
   * Esta funcion devuelve la URL del recurso Dummy
   */
  private getURLDummy() {
    return Configuraciones.dummyUrl
  }
}
