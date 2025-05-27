import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, RendererFactory2, ViewChild } from '@angular/core';
import { Configuraciones } from '../../../../enviroments/configuraciones';
import { Usuario } from '../../../models/usuario';
import { Empresa } from '../../../models/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { TextosApp } from '../../../../enviroments/textos-app';
import { Cuenta } from '../../../models/cuenta';
import { Funciones } from '../../../models/funciones';
import { CuentaCorrienteService } from '../../../services/cuenta-corriente.service';
import { DescargaService } from '../../../services/descarga.service';
import { ExportService } from '../../../services/export.service';
import { GlobalService } from '../../../services/global.service';
import { ReportesService } from '../../../services/reportes.service';
import { StyleService } from '../../../services/sytle.service';
import { UiService } from '../../../services/ui.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { SpinerComponent } from '../../../components/spiner/spiner.component';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import {SubirArchivosService} from '../../../services/subir-archivos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-concilia-importa',
  imports: [CommonModule, TopbarComponent, SidebarComponent, SpinerComponent],
  templateUrl: './concilia-importa.component.html',
  styleUrl: './concilia-importa.component.css'
})
export class ConciliaImportaComponent implements OnInit, AfterViewInit {

  public usuarioLogueado!: Usuario;
  public empresa: Empresa[] = []
  public usuarioConectado: Usuario[] = [];
  public usuarioCuenta: any;
  public usuarioFunciones: Funciones[] =[]
  public AppNombre = Configuraciones.appNombre;
  public detalleCtaCte: any;  // Usado para almacenar respuesta del servicio
  public cantidadMovimientos: number = 0;
  public verModarDescargaPdf: boolean = false;
  public copyRigth: string = Configuraciones.kernelCopyRigth;
  permisos: string[] = []
  public fechaHoy :Date;
  fechasIguales: boolean;
  permisoDescargaComp:string | "N" | undefined;
  tieneCtacteDolar:string | "N" | undefined;
  fechaInfoActualizacion:string | "" | undefined;
  fechaSaldoActualizacion: string | "" | undefined;
  modalRespuestaConcilia :string | "" | undefined;
  loading = true;
  bgColorSideBar = "";
  msgSobreDisponiblidadPDFCtacte = TextosApp.mensajeSobreDisponiblidadPDFCtacte
  msgFechaActualizacion = TextosApp.mensajeFechaActualizacion
  fileBanco?: File;
  fileContable?: File;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private styleService: StyleService,
    private exportService: ExportService,
    private utilsService: UiService,
    private subirarchivosService:SubirArchivosService,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {

  }

  abrirModal(modal: any) {
    this.modalService.open(modal, { centered: true });
  }
  cerrarModal() {
    (window as any).$(`#respuestaModal`).modal('hide');  // Cierra el modal
  }



  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'banco') {
      this.fileBanco = file;
    } else if (type === 'contable') {
      this.fileContable = file;
    }
  }

  uploadFiles(event: Event) {
    this.loading = true;
    event.preventDefault(); // Evita que la página se recargue
    this.modalRespuestaConcilia= ""
    if (this.fileBanco && this.fileContable) {
      this.subirarchivosService.subirArchivos(this.fileBanco, this.fileContable).subscribe({
        next: (response) => {
          this.loading = false;
          this.modalRespuestaConcilia = response.mensaje
          this.abrirModal(this.modalRespuestaConcilia)
          console.log('Archivos subidos correctamente:', response);
        },
        error: (error) => {
          this.loading = false;
          this.modalRespuestaConcilia = error.mensaje
          this.abrirModal(this.modalRespuestaConcilia)
          console.error('Error al subir los archivos:', error);

        }
      });
    } else {
      this.loading = false;
      this.modalRespuestaConcilia = 'Debes seleccionar ambos archivos antes de subir.'
      this.abrirModal(this.modalRespuestaConcilia)
      console.warn('Debes seleccionar ambos archivos antes de subir.');
    }
  }


  ngAfterViewInit() {
    // Inicializar el modal después de que la vista se haya inicializado

  }
  getStyleTemplate(elemento:string, propiedad:string) {

    return this.styleService.getStyleTemplate(elemento, propiedad);

  }
   async cargarConfig(): Promise<any> {
    this.loading = true;

      setTimeout(() => {
        //this.loading = false;
        //this.errorMessage = ""
      }, 5000);
      try {
         } catch (error: any) {

        this.loading = false;

        console.error('Login Error', error);
        //this.errorMessage = String(error);
      }




  }









  descargaComprobante(item) {
    // Armo el nombre del archivo


      /*const url = this.descargaService.getURLDescargaComprobante(item, "P");

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
      document.body.removeChild(a); // Elimina el enlace del DOM*/

  }



  ngOnInit(): void {

    this.loading = true
    this.bgColorSideBar = this.styleService.getStyleTemplate('navbar-nav', 'background-color')
    if (typeof document !== 'undefined') {
      // Código que usa el objeto document
      this.enableDismissTrigger();
    }
    this.modalRespuestaConcilia = ""
    if (this.globalService.getUsuarioLogueado() === null) {
      this.usuarioCuenta = []
      this.globalService.logout();
      this.router.navigate(['/login']); // Adjust the path to your login page
    }else{
      this.usuarioLogueado = this.globalService.getUsuarioLogueado()
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

        this.fechaHoy = new Date();
        // Convertir la fecha en formato string a un objeto Date
        //
        const fechaComparar = new Date(this.usuarioCuenta[0].fecha+ 'T00:00:00');
        this.fechasIguales = this.fechaHoy.toDateString() === fechaComparar.toDateString();

      } else {
        this.globalService.logout();
         this.router.navigate(['/login']);
        // Handle the null case, e.g., redirect to login
      }
      this.loading = false;
    }



  }






  logout(){
    this.router.navigate(['/logout']);


  }


  irAlhome(){
    this.router.navigate(['conciliacion']);
  }

  descargarXlsCtaCte =(data) => {
    this.exportService.exportToExcel('data.xls', data);
  }


  descargarCsvCtaCte =(data) => {
    this.exportService.exportToCsv('data.csv', data);
  }

  descargarReporteCtaCte = () => {


    /*this.reportesService.validarServicioReportePdf().subscribe(response => {
        const url = Configuraciones.dominioBaseDescargaPdf+`/resumen-ctacte-${this.globalService.getUsuarioLogueado().cuenta.id}.pdf`
        this.reportesService.descargarCtaCtePdf().subscribe((resp: any) => {});

        this.verModarDescargaPdf = true;
          setTimeout(() => {
            this.verModarDescargaPdf = false;

            const a = document.createElement('a');
            a.href = url;
            a.download = `resumen-ctacte-${this.globalService.getUsuarioLogueado().cuenta.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

          }, 2000); // 5000 milisegundos = 5 segundos de espera antes de ejecutar la descarga




      })
      error => {
        // Maneja el error en la solicitud HTTP

        let msg = "Error: El servicio de reportes pdf no esta disponible por el momento, intente nuevamente más tarde";
        alert(msg)
        console.error(msg);




    }*/

  }



  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }
}
