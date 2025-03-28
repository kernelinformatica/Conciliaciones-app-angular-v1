import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Configuraciones } from '../../enviroments/configuraciones';
@Injectable({
  providedIn: 'root'
})
export class EnviromentService {

  constructor() { }

  get version(): string {
    return environment.versionSistema;
  }
  get urlBase(): string {
    return Configuraciones.urlBase;
  }

  get urlBaseDescargaReportes():string {
    return Configuraciones.reporteCtactePdf as string;
  }
  get backgroundImageUrl():string{
    return "assets/multimedia/images/login/bg.jpg";
  }



}
