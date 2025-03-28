import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { EnviromentService } from './enviroment.service';
import { GlobalService } from './global.service';
@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(
    private environmentService: EnviromentService,
    private globalService: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getBackgroundImageUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return this.environmentService.backgroundImageUrl;
    } else if (isPlatformServer(this.platformId)) {
      return this.environmentService.backgroundImageUrl; // Servir una URL por defecto en SSR
    }
    return '';
  }




  getStyleTemplate(elemento: string, propiedad: string): string {
    const template = this.globalService.getTemplateActivo();
    
    // Verificar si el template existe y no es null
    if (!template || !template[0] || !template[0].estilos) {
        console.error('Template no encontrado o inválido');
        return '';
    }

    for (let i = 0; i < template[0].estilos.length; i++) {
        const estilo = template[0].estilos[i];
        if (estilo.elemento === elemento && estilo.propiedad === propiedad) {
            return estilo.valor;
        }
    }

    // Si no se encuentra el estilo, retornar un valor por defecto o vacío
    return '';
}


}
