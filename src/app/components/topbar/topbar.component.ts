// topbar.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Cuenta } from '../../models/cuenta';
import { Mensajes } from '../../models/mensajes';
import { Funciones } from '../../models/funciones';
import { Empresa } from '../../models/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { Usuario } from '../../models/usuario';
import { SidebarService } from '../../services/sidebar.service';
import { StyleService } from '../../services/sytle.service';
import { Configuraciones } from '../../../enviroments/configuraciones';
import { TextosApp } from '../../../enviroments/textos-app';
import { NotificacionesComponent } from "../notificaciones/notificaciones.component";
import { UiService } from '../../services/ui.service';
@Component({
  imports: [CommonModule, NotificacionesComponent],
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})

export class TopbarComponent  implements OnInit {
  @Input() usuarioCuenta: Cuenta[] = [];
// @Input() usuarioLogueado: any;
fechaHoy: string
 empresa: any;
 isCollapsed = false
 cambioClave:any;
   modalSalirTitulo = TextosApp.modaldialogTituloSalir;
   modalSalirMensaje = TextosApp.modaldialogMensajeSalir;
constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private sidebarService : SidebarService,
    private styleService: StyleService,
    private utilsService: UiService,
){

}
  ngOnInit(): void {
    const usuarioLogueado = this.globalService.getUsuarioLogueado()
    this.cambioClave = usuarioLogueado.cuenta.claveMarcaCambio
    this.empresa = usuarioLogueado.empresa
    const today = new Date();
    this.fechaHoy = this.utilsService.fechasFormatos(today, 3, 1);

    this.sidebarService.getSidebarState().subscribe((state: boolean) => {
      this.isCollapsed = state;
    });


  }
  getStyleTemplate(elemento:string, propiedad:string) {
    return this.styleService.getStyleTemplate(elemento, propiedad);

    }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  irAMiCuenta(){

    this.router.navigate(['/mi-cuenta']);
  }

  logout(){
    this.router.navigate(['/logout']);
  }

}
