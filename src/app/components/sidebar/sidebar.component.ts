import { Component, Input, OnInit } from '@angular/core';
import { Funciones } from '../../models/funciones';
import { Empresa } from '../../models/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { TemplateEstilos } from '../../models/template-estilos';
import { Template } from '../../models/template';

import { StyleService } from '../../services/sytle.service';

import 'bootstrap';
import { SidebarService } from '../../services/sidebar.service';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit  {

 isCollapsed: boolean = false;
 empresa:any;
 funciones: Funciones | undefined;
 permisos: string[] = []
 // ctacteng serve
 tieneResumenCtaCte : string | "N" | undefined;
 tieneResumenCtaCteDolar : string | "N" | undefined;
 tieneResumenCtacteDescargaCompUss: string | "N" | undefined;
 tieneResumenCtacteDescargaComp:string | "N" | undefined;
 //cereales
 tieneResumenCereal: string  | "N" | undefined;
 tieneFichaRemitos:string | "N" | undefined;
 tieneFichaCombustibles:string | "N" | undefined;
 tieneFichaCerealDescargaComp:string | "N" | undefined;
 tieneFichaRomaneosPendientes:string | "N" | undefined;
 //otros
 tieneCatalogoDeProductos:string | "N" | undefined;
 tienePedidoDeFondos:string | "N" | undefined;
 tieneOrdenesVentaDeCereal:string | "N" | undefined;
 tieneNoticias:string | "N" | undefined;

 tieneOFertasCaur:string | "N" | undefined;
 tieneOfertas:string | "N" | undefined;
 cambioClave : any;


constructor(
  private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private styleService: StyleService,
    private sidebarService: SidebarService
){

}


ngOnInit(): void {

  this.sidebarService.getSidebarState().subscribe((state: boolean) => {
    this.isCollapsed = state;
  });

  if (typeof document !== 'undefined') {
    // Código que usa el objeto document
    this.enableDismissTrigger();
  }

  const usuarioLogueado = this.globalService.getUsuarioLogueado()
  this.cambioClave = usuarioLogueado.cuenta.claveMarcaCambio
  this.permisos = this.globalService.getPermisos();

  // Construyo el menu basado en la lista de funciones
  this.armaMenu();
  this.empresa = usuarioLogueado.empresa
 }


irAdashboard(){
  this.router.navigate(['/gestagro']);
}

getStyleTemplate(elemento:string, propiedad:string) {

  return this.styleService.getStyleTemplate(elemento, propiedad);

}

  irAlhome(){
    if(this.cambioClave> 0){
      this.router.navigate(['gestagro']);
    }
  }


  armaMenu(){

    if (this.permisos && this.permisos.length > 0){
      for (let i = 0; i < this.permisos.length; i++) {

        if (this.permisos[i] == "resumenCtaCte"){
          this.tieneResumenCtaCte = "S";
        }else if(this.permisos[i] == "resumenCereal"){
          this.tieneResumenCereal = "S"
        }else if(this.permisos[i] == "detalleCtaCteDolar"){
          this.tieneResumenCtaCteDolar = "S"
        }else if(this.permisos[i] == "detalleCtaCteDolar"){
          this.tieneResumenCtaCteDolar = "S"
        }else if(this.permisos[i] == "fichaRemitos"){
          this.tieneFichaRemitos = "S"
        }else if(this.permisos[i] == "fichaRomaneosPendientes"){
          this.tieneFichaRomaneosPendientes = "S"
        }else if(this.permisos[i] == "ordenesDeVentaDeCerealWeb"){
          this.tieneOrdenesVentaDeCereal = "N"
        }else if(this.permisos[i] == "pedidoDeFondosWeb"){
          this.tienePedidoDeFondos = "N"
        } else if(this.permisos[i] == "fichaCombustibles"){
           this.tieneFichaCombustibles = "N"
        }


      }
    } else {
      alert("Error: No se pudo cargar sus opciones de menu, porque esta vacio o no es válido, póngase en contacto con el administrador de la empresa.")
      console.log('El array está vacío o es null');
    }

  }



  irCuentaACereales(){
    this.router.navigate(['/resumen-de-cereales']);
  }

   /* links */
  irCuentaCorriente(){
    this.router.navigate(['/cuenta-corriente']);
  }

  irCuentaCorrienteDolar(){

    this.router.navigate(['/cuenta-corriente-dolar']);

  }


  irCereales(){

  }

  irRemitos(){

  }
  irRomaneosPendientes(){

  }

  irOrdenesDeVentaDeCereal(){

  }

  irPedidosDinero(){

  }

  irNoticias(){

  }



  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }



}
