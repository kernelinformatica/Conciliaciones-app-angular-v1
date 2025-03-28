import { Configuraciones } from './../../enviroments/configuraciones';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) {}
  private apiUrl = Configuraciones.urlBase

  traerEmpresa(hashId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'hashId' : hashId
    });
    let endPoint="/empresa/traer-empresa"
    return this.http.post<any>(this.apiUrl+endPoint, "", { headers });

  }

}
