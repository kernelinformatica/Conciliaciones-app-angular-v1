import { UiService } from './../../services/ui.service';

import { FichaRemitos } from './../../models/fichaRemitos';
import { CerealesService } from './../../services/cereales.service';
import { CuentaCorrienteService } from '../../services/cuenta-corriente.service';
import { Funciones } from './../../models/funciones';
import { Component, Inject, OnInit, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { StyleService } from './../../services/sytle.service';
import { EmpresaService } from '../../services/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextosApp } from '../../../enviroments/textos-app';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { Cuenta } from '../../models/cuenta';
import { Empresa } from '../../models/empresa';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Configuraciones } from '../../../enviroments/configuraciones';
import { environment } from '../../../enviroments/enviroment';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

//import 'datatables.net';
//import 'datatables.net-dt/css/jquery.dataTables.css';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TopbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  public usuarioLogueado!: any;

  public empresa: Empresa[] = []
  public usuarioConectado: any;
  public usuarioCuenta: any;
  public usuarioFunciones: Funciones[] =[]
  public AppNombre = Configuraciones.appNombre;
  public actualizacionValida = false;
  public fechaHoy :Date;
  fechasIguales: boolean;
  permisos: string[] = []
  resumenCereal: any;
  fichaRemitos: any;
  fichaCombustibles:any;
  detalleIvaPend : any;
  cantidadMovimientosIvaPend : any;
  totalNetoIvaPend:number = 0;
  totalIvaPend:number = 0;
  totalIvaPendDiferido:number = 0;
  totalIvaPendVencido:number = 0;
  totalNetoPendDiferido:number = 0;
  totalNetoPendVencido:number = 0;
  public copyRigth: string = Configuraciones.kernelCopyRigth;
  public cantMovResuCereal: number = 0;
  public cantMovFichaRemitos: number = 0;
  tieneCtacteDolar:string | "N" | undefined;
  tieneresumenCereales:string | "N" | undefined;
  tieneresumenCombustible:string | "N" | undefined;
  tienePendientesFacturar:string | "N" | undefined;
  fechaSaldoActualizacion: string | "";
  permisoIvaPendienteDolar:string | '' | undefined;
  // Logout Modal //
  modalSalirTitulo = TextosApp.modaldialogTituloSalir;
  modalSalirMensaje = TextosApp.modaldialogMensajeSalir;
  mensajeFechasActualizacion = TextosApp.mensajeFechaActualizacion
  bgColorSideBar = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private cerealService: CerealesService,
    private utilsService : UiService,
    private styleService: StyleService,
    private ctacteService: CuentaCorrienteService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){




  }
  getStyleTemplate(elemento:string, propiedad:string) {

    return this.styleService.getStyleTemplate(elemento, propiedad);

  }
  getEmpresa():any{
    this.empresa = this.globalService.getEmpresa();
    return this.empresa;

  }
  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      // Código que usa el objeto   document
      this.enableDismissTrigger();
    }

    if (this.globalService.getUsuarioLogueado() === null) {

      this.usuarioCuenta = []
      this.globalService.logout();
      this.router.navigate(['/logout']); // Adjust the path to your login page
    }else{
      this.usuarioLogueado = this.globalService.getUsuarioLogueado()
      this.bgColorSideBar = this.styleService.getStyleTemplate('navbar-nav','background-color' );
      
      if (this.usuarioLogueado) {
        
        this.usuarioCuenta = [
          {
            id : this.usuarioLogueado["id"],
            nombre:this.usuarioLogueado["nombre_apellido"],
            email: this.usuarioLogueado["email"],
            tipoUsuario :this.usuarioLogueado["grupos"]["grupo"]["id_grupo"],
            tipoUsuarioNombre : this.usuarioLogueado["grupos"]["grupo"]["descripcion"],   
            fecha:  new Date(),
            claveMarcaCambio : this.usuarioLogueado["marca_cambio"],
            ultActualizacion : "",



          }
        ];
        const dateSaldo = "";
        this.fechaSaldoActualizacion = this.utilsService.fechasFormatos(dateSaldo, 3, 1)
        this.fechaHoy = new Date();
        // Convertir la fecha en formato string a un objeto Date
        //
        const fechaComparar = new Date(this.usuarioCuenta[0].ultActualizacion);

        this.fechasIguales = this.fechaHoy.toDateString() === fechaComparar.toDateString();




        this.resumen();


        // defino usuario
        // defino empresa



      } else {
         this.logout()

      }
    }
  }
 
  logout(){
    this.router.navigate(['/logout']);
  }

  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }


 
 
 resumen (): any{

 
 }
  isLoggedIn(): boolean {
    return this.globalService.getUsuarioLogueado();
   }


   


}
