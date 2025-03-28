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
  public usuarioLogueado!: Usuario;

  public empresa: Empresa[] = []
  public usuarioConectado: Usuario[] = [];
  public usuarioCuenta: Cuenta[] = [];
  public usuarioFunciones: Funciones[] =[]
  public AppNombre = Configuraciones.appNombre;
  public actualizacionValida = false;
  public fechaHoy :Date;
  fechasIguales: boolean;
  permisos: string[] = []
  resumenCereal: any;
  fichaRemitos: any;
  detalleIvaPend : any;
  cantidadMovimientosIvaPend : any;
  totalNetoIvaPend:number = 0;
  totalIvaPend:number = 0;
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
        //this.permisos =  this.globalService.getUsuarioLogueado().funciones.listaFunciones
        this.tieneCtacteDolar = this.globalService.getPermisoCtaCteUDolar();
        this.tieneresumenCereales = this.globalService.getPermisoCtaCteUDolar();
        this. tieneresumenCombustible =  this.globalService.getPermisoCtaCteUDolar();
        this.tienePendientesFacturar = this.globalService.getPermisoCtaCteUDolar();
        this.permisoIvaPendienteDolar = this.globalService.getPermisoIvaPendiente();
        if(this.permisoIvaPendienteDolar){
          this.cargarResumenIvaPendiente();

        }  


        // Safe to access cuenta property
        this.usuarioCuenta = [
          {
            id : this.usuarioLogueado.cuenta.id,
            nombre: this.usuarioLogueado.cuenta.nombre,
            email: this.usuarioLogueado.cuenta.email,
            tipoUsuario: this.usuarioLogueado.cuenta.tipoUsuario,
            saldoPesos : this.usuarioLogueado.cuenta.saldoPesos,
            saldoDolar: this.usuarioLogueado.cuenta.saldoDolar,
            fecha: this.usuarioLogueado.cuenta.fecha,
            claveMarcaCambio : this.usuarioLogueado.cuenta.claveMarcaCambio,
            ultActualizacion : this.usuarioLogueado.cuenta.ultActualizacion


          }
        ];
        const dateSaldo = new Date(this.usuarioCuenta[0].ultActualizacion);
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
  irACtaCte(){
    this.router.navigate(['/cuenta-corriente']);
  }
  irACtaCteDolar(){
    this.router.navigate(['/cuenta-corriente-dolar']);
  }

  logout(){
    this.router.navigate(['/logout']);
  }

  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }


  calcularTotalesIvaPend(): void {
    this.totalNetoIvaPend = this.detalleIvaPend.reduce((acc, item) => acc + item.neto, 0);
    this.totalIvaPend = this.detalleIvaPend.reduce((acc, item) => acc + item.iva, 0);
  }
  async cargarResumenIvaPendiente(): Promise<any> {
    
    setTimeout(() => {
      //this.loading = false;
      //this.errorMessage = ""
    }, 5000);
    try {

      this.ctacteService.getCuentaCorrienteDolarIvaPendiente(this.usuarioLogueado.cuenta.id)
        .subscribe((response: any) => {
          debugger
          this.detalleIvaPend = response.datos.movimiento;
          this.cantidadMovimientosIvaPend = response.datos.movimiento.length;

         
          this.calcularTotalesIvaPend()
        });

      // Handle successful login (e.g., navigate to another page)
    } catch (error: any) {
      //this.loading = false;

      console.error('Login Error', error);
      //this.errorMessage = String(error);
    }

  }






 resumen (): any{

  this.cerealService.getResumenDeCereales(this.usuarioLogueado.cuenta.id).subscribe((response: any) => {
    this.resumenCereal = response.datos.resumenCereal;
    this.cantMovResuCereal = this.resumenCereal.length

    if( this.globalService.getPermisoFichaRemitos()){
      //this.fichaRemitos = response.datos.fichaRemito;
      
       


      this.fichaRemitos = response.datos.fichaRemito.map((remito: any) => {
       debugger
        if(remito.idRubroCtacte.idRubroCtacte == "2"){
        
        // remito pendientes
        const descri =  remito.descripcion.split(" ")
        let cant = descri[1]
        if (cant == ""){
          cant= 0

        }
        return { ...remito, cantidadComputada: cant }; 
      }else if (remito.idRubroCtacte.idRubroCtacte == "1"){
        // canje cereales
      
        return { ...remito, cantidadComputada: remito.r1KilosCer };
      }else if (remito.idRubroCtacte.idRubroCtacte == "3"){
        // combustibles
        return { ...remito, cantidadComputada: remito.r2Cantidad };
       }
        
      
      });
     


      this.cantMovFichaRemitos =  this.resumenCereal.length
      
    }


  });
 }
  isLoggedIn(): boolean {
    return this.globalService.getUsuarioLogueado();
   }





}
