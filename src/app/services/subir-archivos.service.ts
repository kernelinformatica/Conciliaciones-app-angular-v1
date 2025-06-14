import { Configuraciones } from './../../enviroments/configuraciones';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class SubirArchivosService {
private apiUrl = this.getURLServicio();

  constructor(private http: HttpClient,  private globalService: GlobalService) {}

  subirArchivos(file1: File, file2: File, cuentaConcilia: string): Observable<any> {
    const empresa =this.globalService.getEmpresa()
    const usuario = this.globalService.getUsuarioLogueado();
    const tipoConciliacion =1
    const formData = new FormData();
    formData.append('resu-banco', file1);
    formData.append('resu-contable', file2);
    formData.append('empresa', empresa['id']);
    formData.append('usuario', usuario['id']);
    formData.append('tipoConciliacion', tipoConciliacion.toString());
    formData.append('cuentaConcilia', cuentaConcilia);


    return this.http.post(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Error de cliente
      console.error('Error del lado del usuario:', error.error.message);
    } else {
      // Error del servidor
      console.error(`Error del servidor ${error.status}: ${error.message}`);
    }

    return throwError(() => new Error('Ocurrió un problema al subir los archivos. Inténtalo de nuevo más tarde.'));
  }

  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLServicio(): string {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.conciliacionesUrl;
  }
}
// Removed incorrect throwError implementation as it is imported from 'rxjs'.

