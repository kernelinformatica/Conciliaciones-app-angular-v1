import { Configuraciones } from './../../enviroments/configuraciones';
import { Injectable, NgProbeToken } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class ConciliacionesService   {


  constructor(private http: HttpClient,  private globalService: GlobalService) {}


  tokenHashId : any;
  getParametros(grupo, nombre_parametro): Observable<any> {
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getURLTraerParametros();
    this.tokenHashId = this.globalService.getTokenHashId();
    let token: string | undefined;
    if (this.tokenHashId && typeof this.tokenHashId === 'object') {
      if ('token' in this.tokenHashId && typeof this.tokenHashId.token === 'string') {
        token = this.tokenHashId.token;
        
      }else{
        token = this.tokenHashId.token.token;
        
      }
    } else if (typeof this.tokenHashId === 'string') {
      token = this.tokenHashId
      
    }
    const empresa = this.globalService.getEmpresa();
    const params = {
      token: token,
      id_usuario: usuario["id"],
      id_empresa: empresa["id"],
      id_conciliacion: 1,
      grupo :grupo,
      nombre_parametro : nombre_parametro

    };

    console.log("Enviando petición con estos parámetros:", params);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, params, httpOptions);
  }

  getConciliaciones(): Observable<any> {
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getURLServicioConciliacion();
    this.tokenHashId = this.globalService.getTokenHashId();
    let token: string | undefined;
    if (this.tokenHashId && typeof this.tokenHashId === 'object') {
      if ('token' in this.tokenHashId && typeof this.tokenHashId.token === 'string') {
        token = this.tokenHashId.token;
        
      }else{
        token = this.tokenHashId.token.token;
        
      }
    } else if (typeof this.tokenHashId === 'string') {
      token = this.tokenHashId
      
    }
    const empresa = this.globalService.getEmpresa();
    debugger
    const params = {
      token: token,
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
    this.tokenHashId = this.globalService.getTokenHashId();
    let token: string | undefined;
    if (this.tokenHashId && typeof this.tokenHashId === 'object') {
      if ('token' in this.tokenHashId && typeof this.tokenHashId.token === 'string') {
        token = this.tokenHashId.token;
        
      }else{
        token = this.tokenHashId.token.token;
        
      }
    } else if (typeof this.tokenHashId === 'string') {
      token = this.tokenHashId
      
    }
    const empresa = this.globalService.getEmpresa();
    debugger
    const params = {
      token: token,
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
    this.tokenHashId = this.globalService.getTokenHashId();
    let token: string | undefined;
    if (this.tokenHashId && typeof this.tokenHashId === 'object') {
      if ('token' in this.tokenHashId && typeof this.tokenHashId.token === 'string') {
        token = this.tokenHashId.token;
        
      }else{
        token = this.tokenHashId.token.token;
        
      }
    } else if (typeof this.tokenHashId === 'string') {
      token = this.tokenHashId
      
    }
    const empresa = this.globalService.getEmpresa();

    const params = {
      token: token,
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

    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getURLServicioEntidadEmpresa();
    this.tokenHashId = this.globalService.getTokenHashId();
    let token: string | undefined;
    if (this.tokenHashId && typeof this.tokenHashId === 'object') {
      if ('token' in this.tokenHashId && typeof this.tokenHashId.token === 'string') {
        token = this.tokenHashId.token;
        
      }else{
        token = this.tokenHashId.token.token;
        
      }
    } else if (typeof this.tokenHashId === 'string') {
      token = this.tokenHashId
      
    }
    const empresa = this.globalService.getEmpresa();
    const params = {
      token: token,
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
    this.tokenHashId = this.globalService.getTokenHashId();
    let token: string | undefined;
    if (this.tokenHashId && typeof this.tokenHashId === 'object') {
      // Verificamos si tiene la propiedad "token"

      if ('token' in this.tokenHashId && typeof this.tokenHashId.token === 'string') {
        token = this.tokenHashId.token;
        
      }else{
        token = this.tokenHashId.token.token;
        
      }
    } else if (typeof this.tokenHashId === 'string') {
      token = this.tokenHashId
      
    }
    const empresa = this.globalService.getEmpresa();
    const params = {
      token: token,
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



  getCuentasContables(idTipo=0, idCuenta=0): Observable<any> {
    // id_tipo = 0 // 0 para todas las cuentas contables, 1 para cuentas de empresa, 2 para cuentas de gastos
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getServcioUrlCtasCbles();
    this.tokenHashId  = this.globalService.getTokenHashId() 
    let token: string | undefined;
    
    if (this.tokenHashId && typeof this.tokenHashId === 'object') {
      // Verificamos si tiene la propiedad "token"

      if ('token' in this.tokenHashId && typeof this.tokenHashId.token === 'string') {
        token = this.tokenHashId.token;
        
      }else{
        token = this.tokenHashId.token.token;
        
      }
    } else if (typeof this.tokenHashId === 'string') {
      token = this.tokenHashId
      
    }
    
    
    

    
    

    const empresa = this.globalService.getEmpresa();

    const params = {
      token: token,
      id_usuario: usuario["id"],
      id_empresa: empresa["id"],
      id_tipo :idTipo,
      id_cuenta: idCuenta// 1 para cuenta a conciliar de empresa, 2 para para cuentas de gastos
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
    this.tokenHashId  = this.globalService.getTokenHashId() 
    let token: string | undefined;
    
    if (this.tokenHashId && typeof this.tokenHashId === 'object') {
      // Verificamos si tiene la propiedad "token"

      if ('token' in this.tokenHashId && typeof this.tokenHashId.token === 'string') {
        token = this.tokenHashId.token;
        
      }else{
        token = this.tokenHashId.token.token;
        
      }
    } else if (typeof this.tokenHashId === 'string') {
      token = this.tokenHashId
      
    }
    const empresa = this.globalService.getEmpresa();

    const params = {
      token: token,
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
  private getURLTraerParametros(): string {
    return Configuraciones.urlBase+"/concilia/traer-parametros";
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

