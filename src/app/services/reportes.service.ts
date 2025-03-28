import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, timeout, throwError  } from 'rxjs';
import { Configuraciones } from '../../enviroments/configuraciones';
import { Template } from '../models/template';
import { catchError,  map,  tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private empresa: any = null;
  private usuarioLogueado: any = null;
  private token: any = null;
  public servicioDisponible = false;
  public templateActivo: Template | undefined;


  constructor(private http: HttpClient, globalService: GlobalService) {
    this.empresa = globalService.getEmpresa();
    this.usuarioLogueado = globalService.getUsuarioLogueado();
    this.token = globalService.getTokenHashId()

  }

/**
 *
 *
 * @private
 * @memberof ReportesService
 */

/*
  Verificacion si el servicio de reportes pdf esta disponible o no
  */

  validarServicioReportePdf(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });
    return this.http.get(this.getURLDummy());
  }





descargarCtaCtePdf(): Observable<Blob> {
  const cuenta = this.usuarioLogueado.cuenta.id;
  const reporte = 'resumen-ctacte';
  const coope = this.usuarioLogueado.empresa.id;

  const jsonPayload = {
    cuenta: cuenta,
    tipo: reporte,
    coope: coope
  };

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'token': this.token.hashId
  });

  return new Observable<Blob>((observer) => {
    this.http.post(this.getURLCtaCteReportes(), jsonPayload, { headers, responseType: 'blob' as 'json' })
      .subscribe(
        (response: Blob) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          alert('Error en la solicitud al intentar generar el PDF:');
          observer.error(error);
        }
      );
  });
}

descargarFichaRomaneosPdf(cereal:string, clase:string, cosecha:string): Observable<Blob> {

  const cuenta = this.usuarioLogueado.cuenta.id;
  const reporte = 'ficha-romaneo';
  const coope = this.usuarioLogueado.empresa.id;
  const cer = cereal
  const cla = clase
  const cos = cosecha
  const jsonPayload = {
    cuenta: cuenta,
    tipo: reporte,
    coope: coope,
    cereal: cer,
    clase: cla,
    cosecha: cos

  };

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'token': this.token.hashId
  });

  return new Observable<Blob>((observer) => {
    this.http.post(this.getURLCtaCteReportes(), jsonPayload, { headers, responseType: 'blob' as 'json' })
      .subscribe(
        (response: Blob) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          alert('Error en la solicitud al intentar generar el PDF de ficha de cereal:');
          observer.error(error);
        }
      );
  });
}

descargarFichaCerealPdf(cereal:string, clase:string, cosecha:string): Observable<Blob> {
  debugger
  const cuenta = this.usuarioLogueado.cuenta.id;
  const reporte = 'ficha-cereal';
  const coope = this.usuarioLogueado.empresa.id;
  const cer = cereal
  const cla = clase
  const cos = cosecha
  const jsonPayload = {
    cuenta: cuenta,
    tipo: reporte,
    coope: coope,
    cereal: cer,
    clase: cla,
    cosecha: cos

  };

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'token': this.token.hashId
  });

  return new Observable<Blob>((observer) => {
    this.http.post(this.getURLCtaCteReportes(), jsonPayload, { headers, responseType: 'blob' as 'json' })
      .subscribe(
        (response: Blob) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          alert('Error en la solicitud al intentar generar el PDF de ficha de cereal:');
          observer.error(error);
        }
      );
  });
}

descargarCtaCteDolarPdf(): Observable<Blob> {
  const cuenta = this.usuarioLogueado.cuenta.id;
  const reporte = 'resumen-ctacte-uss';
  const coope = this.usuarioLogueado.empresa.id;

  const jsonPayload = {
    cuenta: cuenta,
    tipo: reporte,
    coope: coope
  };

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'token': this.token.hashId
  });

  return new Observable<Blob>((observer) => {
    this.http.post(this.getURLCtaCteReportes(), jsonPayload, { headers, responseType: 'blob' as 'json' })
      .subscribe(
        (response: Blob) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          alert('Error en la solicitud al intentar generar el PDF:');
          observer.error(error);
        }
      );
  });
}







/*
Esto devuelve el url del servicio web de descarga de comprobantes de cuenta corrriente
*/
public getURLCtaCteReportes() {
  return Configuraciones.reporteCtactePdf;
 }

  /**
   * Esta funcion devuelve la URL del recurso Dummy
   */
  private getURLDummy() {
    return Configuraciones.dominioBaseReportes+"/dummy";
  }

}
