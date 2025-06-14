import { Configuraciones } from './../../enviroments/configuraciones';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class ConciliacionesService   {


  constructor(private http: HttpClient,  private globalService: GlobalService) {}





  getConciliaciones(): Observable<any> {
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getURLServicioConciliacion();
    const tokenHashId = this.globalService.getTokenHashId();
    const empresa = this.globalService.getEmpresa();
    const params = {
      token: tokenHashId["token"],
      id_usuario: usuario["id"],
      id_empresa: empresa["id"],
      id_conciliacion: 1
    };

    console.log("Enviando petición con estos parámetros:", params);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, params, httpOptions);
  }


  getAbmCuentasContables(cuentaContable, abm): Observable<any> {
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getServcioUrlAbmCuentas();
    const tokenHashId = this.globalService.getTokenHashId();
    const empresa = this.globalService.getEmpresa();

    const params = {
      token: tokenHashId["token"],
      id_usuario: usuario["id"],
      id_empresa: empresa["id"],
      abm : abm, // 0 para crear, 1 para editar, 2 para ver
      cuenta : cuentaContable,
      id_conciliacion: 1

    };

    console.log("Enviando petición con estos parámetros:", params);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, params, httpOptions);

  }

  getTotales(): Observable<any> {
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getServcioUrlTotales();
    const tokenHashId = this.globalService.getTokenHashId();
    const empresa = this.globalService.getEmpresa();

    const params = {
      token: tokenHashId["token"],
      id_usuario: usuario["id"],
      id_empresa: empresa["id"],
      id_conciliacion: 1
    };

    console.log("Enviando petición con estos parámetros:", params);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, params, httpOptions);
  }


  getDifEntidadEmpresa(): Observable<any> {
    alert("Diferencias Entidad Empresa")
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getURLServicioEntidadEmpresa();
    const tokenHashId = this.globalService.getTokenHashId();
    const empresa = this.globalService.getEmpresa();
    const params = {
      token: tokenHashId["token"],
      id_usuario: usuario["id"],
      id_empresa: empresa["id"],
      id_conciliacion: 1
    };

    console.log("Enviando petición con estos parámetros:", params);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, params, httpOptions);
  }

  getDifEmpresaEntidad(): Observable<any> {
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getURLServicioEmpresaEntidad();
    const tokenHashId = this.globalService.getTokenHashId();
    const empresa = this.globalService.getEmpresa();
    const params = {
      token: tokenHashId["token"],
      id_usuario: usuario["id"],
      id_empresa: empresa["id"],
      id_conciliacion: 1
    };

    console.log("Enviando petición con estos parámetros:", params);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, params, httpOptions);
  }






  getCuentasContables(idTipo=0): Observable<any> {
    // id_tipo = 0 // 0 para todas las cuentas contables, 1 para cuentas de empresa, 2 para cuentas de gastos
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getServcioUrlCtasCbles();
    const tokenHashId = this.globalService.getTokenHashId();
    const empresa = this.globalService.getEmpresa();

    const params = {
      token: tokenHashId["token"],
      id_usuario: usuario["id"],
      id_empresa: empresa["id"],
      id_tipo :idTipo // 1 para cuenta a conciliar de empresa, 2 para para cuentas de gastos
    };



    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, params, httpOptions);
  }

  getTipoCuentasContables(){
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getServcioUrlCtasCblesTipo();
    const tokenHashId = this.globalService.getTokenHashId();
    const empresa = this.globalService.getEmpresa();

    const params = {
      token: tokenHashId["token"],
      id_usuario: usuario["id"],
      id_empresa: empresa["id"],

    };



    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, params, httpOptions);

  }
  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLServicioConciliacion(): string {
    return Configuraciones.urlBase+"/concilia/traer-conciliacion";
  }
  private getURLServicioEmpresaEntidad(): string {
    return Configuraciones.urlBase+"/concilia/traer-dif-empresa-entidad";
  }
  private getURLServicioEntidadEmpresa(): string {
    return Configuraciones.urlBase+"/concilia/traer-dif-entidad-empresa";
  }
  private getServcioUrlTotales(): string {
    return Configuraciones.urlBase+"/concilia/traer-totales";
  }
  private getServcioUrlCtasCbles(): string {
    return Configuraciones.urlBase+"/concilia/traer-cuentas-contables";
  }
  private getServcioUrlCtasCblesTipo(): string {
    return Configuraciones.urlBase+"/concilia/traer-cuentas-contables-tipos";
  }
  private getServcioUrlAbmCuentas(): string {
    return Configuraciones.urlBase+"/concilia/cuentas-contables-abm";
  }


}
// Removed incorrect throwError implementation as it is imported from 'rxjs'.

