import { DetalleCtaCteDolar } from '../../models/detallectactedolar';
import { DescargaService } from '../../services/descarga.service';
import { Resumen } from './../../models/resumen';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  RendererFactory2,
  ViewChild,
} from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { ExportService } from '../../services/export.service';
import { StyleService } from '../../services/sytle.service';
import { CuentaCorrienteService } from '../../services/cuenta-corriente.service';
import { Usuario } from '../../models/usuario';
import { Empresa } from '../../models/empresa';
import { Cuenta } from '../../models/cuenta';
import { Configuraciones } from '../../../enviroments/configuraciones';
import { Funciones } from '../../models/funciones';
import { ActivatedRoute, Router } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

import { CommonModule, DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpHeaders,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import { SpinerComponent } from '../../components/spiner/spiner.component';
import { environment } from '../../../enviroments/enviroment.prod';
import { ReportesService } from '../../services/reportes.service';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Modal } from 'bootstrap';
import { UiService } from '../../services/ui.service';
import { TextosApp } from '../../../enviroments/textos-app';

@Component({
  selector: 'app-cuenta-corriente-dolar',
  imports: [CommonModule, TopbarComponent, SidebarComponent, SpinerComponent],
  templateUrl: './cuenta-corriente-dolar.component.html',
  styleUrl: './cuenta-corriente-dolar.component.css',
  standalone: true,
})
export class CuentaCorrienteDolarComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  public usuarioLogueado!: Usuario;
  public empresa: Empresa[] = [];
  
  public usuarioConectado: Usuario[] = [];
  public usuarioCuenta: Cuenta[] = [];
  public usuarioFunciones: Funciones[] = [];
  public AppNombre = Configuraciones.appNombre;
  public detalleCtaCte: any; // Usado para almacenar respuesta del servicio
  public detalleIvaPend: any;
  public cantidadMovimientos: number = 0;
  public cantidadMovimientosIvaPend: number = 0;
  public verModarDescargaPdf: boolean = false;
  permisos: string[] = [];
  public fechaHoy: Date;
  public copyRigth: string = Configuraciones.kernelCopyRigth;
  fechasIguales: boolean;
  codigoEmpresa:String = "";
  permisoDescargaCompDolar: string | 'N' | undefined;
  permisoIvaPendienteDolar:string | '' | undefined;
  tieneCtacteDolar: string | 'N' | undefined;
  fechaInfoActualizacion: string | '' | undefined;
  fechaSaldoActualizacion: string | '' | undefined;
  loading = true;
  totalNetoIvaPend : number = 0
  totalIvaPend : number = 0
  bgColorSideBar = '';
  msgSobreDisponiblidadPDFCtacte = TextosApp.mensajeSobreDisponiblidadPDFCtacte
  msgFechaActualizacion = TextosApp.mensajeFechaActualizacion
  //resumen: DetalleCtaCte | undefined;
  resumen: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private ctacteService: CuentaCorrienteService,
    private styleService: StyleService,
    private reportesService: ReportesService,
    private exportService: ExportService,
    private utilsService: UiService,
    private descargaService: DescargaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngAfterViewInit() {
    // Inicializar el modal después de que la vista se haya inicializado
  }


  calcularTotalesIvaPend(): void {
    this.totalNetoIvaPend = this.detalleIvaPend.reduce((acc, item) => acc + item.neto, 0);
    this.totalIvaPend = this.detalleIvaPend.reduce((acc, item) => acc + item.iva, 0);
  }


  async cargarResumen(): Promise<any> {
    this.loading = true;
    setTimeout(() => {
      //this.loading = false;
      //this.errorMessage = ""
    }, 5000);
    try {
      this.ctacteService.getCuentaCorrienteDolar(this.usuarioLogueado.cuenta.id)
        .subscribe((response: any) => {

          this.detalleCtaCte = response.datos.movimiento;
          this.cantidadMovimientos = response.datos.movimiento.length;

          const datetempSaldo = new Date(this.usuarioCuenta[0].ultActualizacion);
          const dateTemp = new Date(this.usuarioCuenta[0].ultActualizacion)

          this.fechaInfoActualizacion = this.utilsService.fechasFormatos(dateTemp, 0,1)
          this.fechaSaldoActualizacion = this.utilsService.fechasFormatos(datetempSaldo, 3, 1)

          this.loading = false;
        });

        this.cargarResumenIvaPendiente()

      // Handle successful login (e.g., navigate to another page)
    } catch (error: any) {
      this.loading = false;

      console.error('Login Error', error);
      //this.errorMessage = String(error);
    }
  }


  async cargarResumenIvaPendiente(): Promise<any> {
    this.loading = true;
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

          this.loading = false;
          this.calcularTotalesIvaPend()
        });

      // Handle successful login (e.g., navigate to another page)
    } catch (error: any) {
      this.loading = false;

      console.error('Login Error', error);
      //this.errorMessage = String(error);
    }

  }



  permisoTipoComprobante(item) {
    return this.globalService.getPermisoTipoComprobantesPermitidosDolar(item);
  }

  iconoArchivo(item){
    if (item.detalle == "FACTURA"){
      return "1"
    } else if (item.detalle == "NOTA CREDITO") {
      return "3"
    } else if (item.detalle == "NOTA DEBITO") {
      return "2"
    }else{
      return "1"

    }

  }
  getSaldoNumber(saldo): number {
    return parseFloat(saldo);
  }

  tipoComprobanteMostrar(item){
    if (item.detalle == "FACTURA") {
      return true;
  } else if (item.detalle == "NOTA CREDITO") {
      return true;
  } else if (item.detalle == "NOTA DEBITO") {
      return true;
  } else if (item.detalle == "Fact.No Canje") {
      return true;
  } else if (item.detalle == "Pesificacion") {
      return true;
  } else {
      return false;
  }
  }

  descargaComprobante(item) {
    // Armo el nombre del archivo


      const url = this.descargaService.getURLDescargaComprobante(item, "D");

      const cuenta = this.globalService.getUsuarioLogueado().cuenta.id;
      const [dia, mes, anio] = item.ingreso.split('/');
      const nc = item.numero.toString();
      const puntoVenta = nc.slice(0, 2); // Extrae los primeros 2 dígitos como punto de venta
      const restoNumero = nc.slice(2); // Extrae el resto del número
      const puntoVentaFormateado = puntoVenta.padStart(3, '0'); // Asegura que el punto de venta tenga 4 dígitos
      const numeroComprobante = puntoVentaFormateado + "-" + restoNumero;
      const fileName = `${anio + mes + dia + "-" + numeroComprobante + "-" + cuenta}.pdf`;

      // Crea un enlace
      const a = document.createElement('a');
      a.href = url
      a.download = fileName; // Nombre del archivo
      a.target = '_blank'; // Abre el enlace en una nueva pestaña
      document.body.appendChild(a); // Añade el enlace al DOM
      a.click(); // Hace clic en el enlace
      document.body.removeChild(a); // Elimina el enlace del DOM

  }

  ngOnInit(): void {
    if (this.globalService.getPermisoCtaCteUDolar()) {
      this.bgColorSideBar = this.styleService.getStyleTemplate(
        'navbar-nav',
        'background-color'
      );
      if (typeof document !== 'undefined') {
        // Código que usa el objeto document
        this.enableDismissTrigger();
      }
      if (this.globalService.getUsuarioLogueado() === null) {
        this.usuarioCuenta = [];
        this.globalService.logout();
        this.router.navigate(['/login']); // Adjust the path to your login page
      } else {
        this.usuarioLogueado = this.globalService.getUsuarioLogueado();
        if (this.usuarioLogueado) {

          this.permisoDescargaCompDolar = this.globalService.getPermisoDescargaComprobantesDolar();
          this.permisoIvaPendienteDolar = this.globalService.getPermisoIvaPendiente();
        
          this.usuarioCuenta = [
            {

              id: this.usuarioLogueado.cuenta.id,
              nombre: this.usuarioLogueado.cuenta.nombre,
              email: this.usuarioLogueado.cuenta.email,
              tipoUsuario: this.usuarioLogueado.cuenta.tipoUsuario,
              saldoPesos: this.usuarioLogueado.cuenta.saldoPesos,
              saldoDolar: this.usuarioLogueado.cuenta.saldoDolar,
              fecha: this.usuarioLogueado.cuenta.fecha,
              claveMarcaCambio: this.usuarioLogueado.cuenta.claveMarcaCambio,
              ultActualizacion : this.usuarioLogueado.cuenta.ultActualizacion
            },
          ];
          this.empresa = this.globalService.getEmpresa()
         

          this.fechaHoy = new Date();
          // Convertir la fecha en formato string a un objeto Date
          //
          const fechaComparar = new Date(
            this.usuarioCuenta[0].fecha + 'T00:00:00'
          );
          this.fechasIguales =
            this.fechaHoy.toDateString() === fechaComparar.toDateString();
        } else {
          this.globalService.logout();
          this.router.navigate(['/login']);
          // Handle the null case, e.g., redirect to login
        }
      }

      this.cargarResumen();
    } else {
      this.logout()
    }
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  descargarXlsCtaCte = (data) => {
    this.exportService.exportToExcel('data.xls', data);
  };

  descargarCsvCtaCte = (data) => {
    this.exportService.exportToCsv('data.csv', data);
  };

  descargarReporteCtaCte = () => {
    this.reportesService.validarServicioReportePdf().subscribe((response) => {
      const url =
        Configuraciones.dominioBaseDescargaPdf +
        `/resumen-ctacte-uss-${
          this.globalService.getUsuarioLogueado().cuenta.id
        }.pdf`;
      this.reportesService
        .descargarCtaCteDolarPdf()
        .subscribe((resp: any) => {});

      this.verModarDescargaPdf = true;
      setTimeout(() => {
        this.verModarDescargaPdf = false;

        const a = document.createElement('a');
        a.href = url;
        a.download = `resumen-ctacte-uss-${
          this.globalService.getUsuarioLogueado().cuenta.id
        }.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 2000); // 5000 milisegundos = 5 segundos de espera antes de ejecutar la descarga
    });
    (error) => {
      // Maneja el error en la solicitud HTTP

      let msg =
        'Error: El servicio de reportes pdf no esta disponible por el momento, intente nuevamente más tarde';
      alert(msg);
      console.error(msg);
    };
  };

  getStyleTemplate(elemento:string, propiedad:string) {

    return this.styleService.getStyleTemplate(elemento, propiedad);
  
  }

  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }
}
