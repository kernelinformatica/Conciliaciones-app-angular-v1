import { Configuraciones } from './../../enviroments/configuraciones';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class ConciliacionesService   {
private apiUrl = this.getURLServicio();

  constructor(private http: HttpClient,  private globalService: GlobalService) {}



  getConciliacion(): Observable<any> {
    const usuario = this.globalService.getUsuarioLogueado();
    const url = this.getURLServicio();
    const tokenHashId = this.globalService.getTokenHashId();
    const empresa = this.globalService.getEmpresa();

    const params = {
      token: tokenHashId,
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


  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLServicio(): string {
    return Configuraciones.urlBase+"/concilia/traer-conciliacion";
  }
}
// Removed incorrect throwError implementation as it is imported from 'rxjs'.

