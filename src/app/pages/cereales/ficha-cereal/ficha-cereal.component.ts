
import { CerealesService } from './../../../services/cereales.service';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { Configuraciones } from '../../../../enviroments/configuraciones';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { StyleService } from '../../../services/sytle.service';
import { ReportesService } from '../../../services/reportes.service';
import { ExportService } from '../../../services/export.service';
import { UiService } from '../../../services/ui.service';
import { Usuario } from '../../../models/usuario';
import { Empresa } from '../../../models/empresa';
import { Cuenta } from '../../../models/cuenta';
import { Funciones } from '../../../models/funciones';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { SpinerComponent } from '../../../components/spiner/spiner.component';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import { TextosApp } from '../../../../enviroments/textos-app';
import { DescargaService } from '../../../services/descarga.service';

@Component({
  selector: 'app-ficha-cereal',
  imports: [CommonModule, TopbarComponent, SidebarComponent, SpinerComponent],
  templateUrl: './ficha-cereal.component.html',
  styleUrl: './ficha-cereal.component.css'
})
export class FichaCerealComponent {


  public usuarioLogueado!: Usuario;
  public empresa: Empresa[] = []
  public usuarioConectado: Usuario[] = [];
  public usuarioCuenta: Cuenta[] = [];
  public usuarioFunciones: Funciones[] =[]
  public AppNombre = Configuraciones.appNombre;
  public fichaCereal: any;  // Usado para almacenar respuesta del servicio
  public cantidadMovimientos: number = 0;
  public verModarDescargaPdf: boolean = false;
  public copyRigth: string = Configuraciones.kernelCopyRigth;
  permisos: string[] = []
  public fechaHoy :Date;
  fechasIguales: boolean;
  permisoDescargaComp:string | "N" | undefined;
  permisoCereales:string | "N" | undefined;
  permisoFicharemitos:string | "N" | undefined;
  fechaInfoActualizacion:string | "" | undefined;
  fechaSaldoActualizacion: string | "" | undefined;
  paramsRecibidos : any;
  loading = true;
  bgColorSideBar = "";
  mensajePdfDescarga = TextosApp.mensajeFechaCereales
  public fichaRomPendiente: any;  // Usado para almacenar respuesta del servicio
  public cantMovFichaRoma: number = 0;
  public cantMovFichaCereal: number = 0;


  //resumen: DetalleCtaCte | undefined;
  resumen: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private cerealesService: CerealesService,
    private styleService: StyleService,
    private reportesService: ReportesService,
    private exportService: ExportService,
    private utilsService: UiService,
    private descargaService : DescargaService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {
    const navegacion = this.router.getCurrentNavigation();
    this.paramsRecibidos = navegacion?.extras?.state?.['data'];

  }
  ngAfterViewInit() {
    // Inicializar el modal después de que la vista se haya inicializado

  }
 

  descargaComprobante(item) {
    // Armo el nombre del archivo


      const url = this.descargaService.getURLDescargaComprobante(item, "CER");

      const cuenta = this.globalService.getUsuarioLogueado().cuenta.id;
      const [dia, mes, anio] = item.fecha.split('/');
      const nc = item.numeroComprobante.toString();

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

  async cargarResumen(): Promise<any> {
    this.loading = true;
      setTimeout(() => {
        //this.loading = false;
        //this.errorMessage = ""
      }, 2000);
      try {
        this.cerealesService.getFichaDeCereales(this.usuarioLogueado.cuenta.id, this.paramsRecibidos.cerealId , this.paramsRecibidos.claseId ,this.paramsRecibidos.cosecha).subscribe((response: any) => {

          this.fichaCereal = response.datos.movimiento;
          this.cantMovFichaCereal = response.datos.cantidadRegistros
          this.permisoFicharemitos = this.globalService.getPermisoFichaRemitos()
          // rom pendientes
          if (this.permisoFicharemitos){
            this.fichaRomPendiente = response.datos.romaneo;
            this.cantMovFichaRoma = response.datos.romaneo.length
          }
          this.loading = false


        });



        // Handle successful login (e.g., navigate to another page)
      } catch (error: any) {

        this.loading = false;

        console.error('Login Error', error);
        //this.errorMessage = String(error);
      }




  }


  permisoTipoComprobante(item){

    return this.globalService.getPermisoTipoComprobantesPermitidosCereales(item);
  }

  ngOnInit(): void {

    if (this.globalService.getPermisoCereales()) {

    this.bgColorSideBar = this.styleService.getStyleTemplate('navbar-nav', 'background-color')
    if (typeof document !== 'undefined') {
      // Código que usa el objeto document
      this.enableDismissTrigger();
    }
    if (this.globalService.getUsuarioLogueado() === null) {
      this.usuarioCuenta = []
      this.globalService.logout();
      this.router.navigate(['/login']); // Adjust the path to your login page
    }else{
      if(this.paramsRecibidos.cerealId &&  this.paramsRecibidos.claseId && this.paramsRecibidos.cosecha){
        this.usuarioLogueado = this.globalService.getUsuarioLogueado()
        if (this.usuarioLogueado) {

          this.permisoDescargaComp = this.globalService.getPermisoDescargaComprobantesCereales();

          this.permisoCereales = this.globalService.getPermisoCereales()

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
              ultActualizacion: this.usuarioLogueado.cuenta.ultActualizacion

            }
          ];

          this.fechaHoy = new Date();
          // Convertir la fecha en formato string a un objeto Date
          //
          const fechaComparar = new Date(this.usuarioCuenta[0].fecha+ 'T00:00:00');
          this.fechasIguales = this.fechaHoy.toDateString() === fechaComparar.toDateString();
          this.cargarResumen()
        } else {
          this.globalService.logout();
           this.router.navigate(['/login']);
          // Handle the null case, e.g., redirect to login
        }
      }else{
        alert("Atención: No se pudo analizar la información suministrada, inténte nuevamente más tarde.")
        this.router.navigate(['/resumen-de-cereales']);
        }

    }



  }else{
    this.logout()
    }

  }

  irAResumenCereales(){
   this.router.navigate(["/resumen-de-cereales"]);
  }


  logout(){
    this.router.navigate(['/logout']);


  }
  irAInicio(){
    this.router.navigate(['/gestagro']);


  }
  irARemitosPendientes(item){
    this.router.navigate(['/ficha-de-remitos-pendientes'], item);

  }

  getStyleTemplate(elemento:string, propiedad:string) {
    return this.styleService.getStyleTemplate(elemento, propiedad);

    }

  descargarXlsCtaCte =(data) => {
    this.exportService.exportToExcel('data.xls', data);
  }


  descargarCsvCtaCte =(data) => {
    this.exportService.exportToCsv('data.csv', data);
  }

  descargarReporteCereales = () => {


    this.reportesService.validarServicioReportePdf().subscribe(response => {
        const url = Configuraciones.dominioBaseDescargaPdf+`/ficha-cereal-${this.globalService.getUsuarioLogueado().cuenta.id}.pdf`
        this.reportesService.descargarFichaCerealPdf(this.paramsRecibidos.cerealId, this.paramsRecibidos.claseId, this.paramsRecibidos.cosecha).subscribe((resp: any) => {});

        this.verModarDescargaPdf = true;
          setTimeout(() => {
            this.verModarDescargaPdf = false;

           const a = document.createElement('a');
            a.href = url;
            a.download = `ficha-cereal-${this.globalService.getUsuarioLogueado().cuenta.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

          }, 5000); // 5000 milisegundos = 5 segundos de espera antes de ejecutar la descarga




      })
      error => {
        // Maneja el error en la solicitud HTTP

        let msg = "Error: El servicio de reportes pdf no esta disponible por el momento, intente nuevamente más tarde";
        alert(msg)
        console.error(msg);




    }

  }
  descargarReporteCerealesFichaRoma = () => {


    this.reportesService.validarServicioReportePdf().subscribe(response => {
        const url = Configuraciones.dominioBaseDescargaPdf+`/ficha-romaneo-${this.globalService.getUsuarioLogueado().cuenta.id}.pdf`
        this.reportesService.descargarFichaRomaneosPdf(this.paramsRecibidos.cerealId, this.paramsRecibidos.claseId, this.paramsRecibidos.cosecha).subscribe((resp: any) => {});

        this.verModarDescargaPdf = true;
          setTimeout(() => {
            this.verModarDescargaPdf = false;

           const a = document.createElement('a');
            a.href = url;
            a.download = `ficha-romaneo-${this.globalService.getUsuarioLogueado().cuenta.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

          }, 5000); // 5000 milisegundos = 5 segundos de espera antes de ejecutar la descarga




      })
      error => {
        // Maneja el error en la solicitud HTTP

        let msg = "Error: El servicio de reportes pdf no esta disponible por el momento, intente nuevamente más tarde";
        alert(msg)
        console.error(msg);




    }

  }
  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }





}
