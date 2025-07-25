import {
  Component,
  Inject,
  PLATFORM_ID,
  RendererFactory2,
} from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Configuraciones } from '../../../../enviroments/configuraciones';
import { TextosApp } from '../../../../enviroments/textos-app';
import { Empresa } from '../../../models/empresa';
import { Funciones } from '../../../models/funciones';
import { ExportService } from '../../../services/export.service';
import { GlobalService } from '../../../services/global.service';
import { SubirArchivosService } from '../../../services/subir-archivos.service';
import { ConciliacionesService } from '../../../services/conciliaciones-service.service';
import { StyleService } from '../../../services/sytle.service';
import { UiService } from '../../../services/ui.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { SpinerComponent } from '../../../components/spiner/spiner.component';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-concilia-informe',
  imports: [
    CommonModule,
    TopbarComponent,
    SidebarComponent,
    SpinerComponent,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './concilia-informe.component.html',
  styleUrl: './concilia-informe.component.css',
})
export class ConciliaInformeComponent {
  public usuarioLogueado!: Usuario;
  public empresa: Empresa[] = [];
  public usuarioConectado: Usuario[] = [];
  public usuarioCuenta: any;
  public usuarioFunciones: Funciones[] = [];
  public AppNombre = Configuraciones.appNombre;
  public detalleCtaCte: any; // Usado para almacenar respuesta del servicio
  public cantidadMovimientos: number = 0;
  public verModarDescargaPdf: boolean = false;
  public copyRigth: string = Configuraciones.kernelCopyRigth;
  csvGrabado: boolean = false;
  permisos: string[] = [];
  public fechaHoy: Date;
  fechasIguales: boolean;
  permisoDescargaComp: string | 'N' | undefined;
  tieneCtacteDolar: string | 'N' | undefined;
  fechaInfoActualizacion: string | '' | undefined;
  fechaSaldoActualizacion: string | '' | undefined;
  modalRespuestaConcilia: string | '' | undefined;

  bgColorSideBar = '';
  msgSobreDisponiblidadPDFCtacte = TextosApp.mensajeSobreDisponiblidadPDFCtacte;
  msgFechaActualizacion = TextosApp.mensajeFechaActualizacion;
  fileBanco?: File;
  fileContable?: File;
  loading : boolean = true;
  movimientos: any;
  todosSeleccionados: boolean = false;
  movimientosConciliados: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private styleService: StyleService,
    private exportService: ExportService,
    private utilsService: UiService,
    private conciliaService: ConciliacionesService,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  toggleSeleccionTodos(): void {
    this.movimientos.forEach(
      (item) => (item.seleccionado = this.todosSeleccionados)
    );
  }

  abrirModal(modal: any) {
    this.modalService.open(modal, { centered: true });
  }
  cerrarModal() {
    (window as any).$(`#respuestaModal`).modal('hide'); // Cierra el modal
  }
  /**
   *
   *
   * @memberof ConciliaInformeComponent
   */

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'banco') {
      this.fileBanco = file;
    } else if (type === 'contable') {
      this.fileContable = file;
    }
  }

  ngAfterViewInit() {
    // Inicializar el modal después de que la vista se haya inicializado
  }
  getStyleTemplate(elemento: string, propiedad: string) {
    return this.styleService.getStyleTemplate(elemento, propiedad);
  }
  getItemsSeleccionados(): any[] {
    return this.movimientos.filter((item) => item.seleccionado);
  }
  async cargarInfo(): Promise<any> {
    // Simular una llamada al servicio para obtener los movimientos

    setTimeout(() => {

      //this.errorMessage = ""
    }, 5000);

    try {
     this.conciliaService.getConciliaciones().subscribe({
        next: (response: any) => {
          if (response?.control?.codigo === '200') {
            const control = response.control;
            this.movimientos = response.datos.map((item: any) => ({
              ...item,
              seleccionado: false, // Agregar checkbox por defecto en false
            }));
            this.cantidadMovimientos = this.movimientos.length;
            console.log('Movimientos recibidos:', this.movimientos);
          } else {
            console.error(
              'Error en respuesta del servidor:',
              response.control.mensaje
            );

            alert(`Error: ${response.control.mensaje}`);
          }
          this.loading = false;

        },
        error: (error) => {
          this.logout();
          console.error('Error en la petición:', error);
          alert('Ocurrió un error al obtener los movimientos de conciliación.');
        },
      });
    } catch (error: any) {
      this.logout()
      console.error('Error inesperado:', error);
      alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
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


    this.bgColorSideBar = this.styleService.getStyleTemplate(
      'navbar-nav',
      'background-color'
    );
    if (typeof document !== 'undefined') {
      // Código que usa el objeto document
      this.enableDismissTrigger();
    }
    this.modalRespuestaConcilia = '';
    if (this.globalService.getUsuarioLogueado() === null) {
      this.usuarioCuenta = [];
      this.globalService.logout();
      this.router.navigate(['/login']); // Adjust the path to your login page
    } else {
      this.usuarioLogueado = this.globalService.getUsuarioLogueado();
      if (this.usuarioLogueado) {
        this.usuarioCuenta = [
          {
            id: this.usuarioLogueado['id'],
            nombre: this.usuarioLogueado['nombre_apellido'],
            email: this.usuarioLogueado['email'],
            tipoUsuario: this.usuarioLogueado['grupos']['grupo']['id_grupo'],
            tipoUsuarioNombre:
              this.usuarioLogueado['grupos']['grupo']['descripcion'],
            fecha: new Date(),
            claveMarcaCambio: this.usuarioLogueado['marca_cambio'],
            ultActualizacion: '',
          },
        ];

        this.fechaHoy = new Date();
        this.cargarInfo();
      } else {
        this.globalService.logout();
        this.router.navigate(['/login']);
        // Handle the null case, e.g., redirect to login
      }

    }
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  irAlhome() {
    this.router.navigate(['conciliacion']);
  }

  descargarXlsCtaCte = (data) => {
    this.exportService.exportToExcel('data.xls', data);
  };

  descargarCsvCtaCte = (data) => {
    this.exportService.exportToCsv('data.csv', data);
  };

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
  };

  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }

  CancelarConciliacion(): void {
    this.csvGrabado = false; 
    this.todosSeleccionados = false;
    this.movimientosConciliados = [];
    this.movimientos.forEach((item) => (item.seleccionado = false));
  }

  confirmarConciliacion(): void {

    this.movimientosConciliados = this.movimientos
      .filter((item) => item.seleccionado)
      .map((item) => ({
        ...item,
        cuenta_contable: item.cuenta_contable || '0' // Ajusta según sea necesario
      }));

    console.log('Registros conciliados:', this.movimientosConciliados);
}
  // TOTALIZADORES ///

  getTotalSaldo(): number {
    return this.movimientosConciliados.reduce(
      (total, item) => total + Number(item.saldo),
      0
    );
  }

  getTotalImporte(): number {
    return this.movimientosConciliados.reduce(
      (total, item) => total + Number(item.importe),
      0
    );
  }

confirmarConcilacionFinal(){
  try {
    if (this.csvGrabado)
    this.conciliaService.confirmaConciliacionFinal(this.movimientosConciliados).subscribe({
       next: (response: any) => {
         if (response?.control?.codigo === '200') {
           const control = response.control;
           this.movimientos = []
           this.movimientosConciliados = []
           this.cargarInfo();
           alert(control.mensaje)
           
          
         } else {
          this.movimientos = []
           this.movimientosConciliados = []
          const control = response.control;
          alert(control.mensaje)
           console.error(
             'Error en respuesta del servidor:',
             response.control.mensaje
           );

         
         }
         this.loading = false;

       },
       error: (error) => {
         this.logout();
         console.error('Error en la petición:', error);
         alert('Ocurrió un error al confirmar la conciliación.');
       },
     });
     else {
      alert("Debe generar el CSV antes de confirmar la conciliación");}
   } catch (error: any) {
     this.logout()
     console.error('Error inesperado:', error);
     alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
   }
  alert("ENVIO EL OBJECTO MOVIMIENTOS CONCILIADOS AL SERVICIO QUE GRABA LA CONCILIACION DEFINITIVAMENTE " + JSON.stringify(this.movimientosConciliados.length));

}



generarCsv():void{
  
  //alert(this.movimientosConciliados.length + " registros seleccionados para generar el CSV");
  this.csvGrabado = true;
  const obj = this.movimientosConciliados.map(item => ({
      ingreso : new Date(item.m_ingreso).toISOString().split('T')[0],
      asiento: item.asiento,
      asiento_conciliacion: item.asiento_conciliacion,
      codigo : item.codigo,
      concepto: item.concepto,
      detalle: item.detalle,
      importe: item.importe,
      plan_cuentas: item.plan_cuentas,
      saldo : item.saldo,
      cuenta_contable: item.cuenta_contable || '0' // Asegurarse de que siempre tenga un valor
    }));

   const csvContent = this.convertirAFormatoCSV(obj);

    // Crear un blob y descargar el archivo
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conciliacion.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


}
convertirAFormatoCSV(datos: any[]): string {
  if (!datos.length) return '';
  // Obtener encabezados
  const headers = Object.keys(datos[0]).join(',');
  // Mapear los datos a formato CSV
  const rows = datos.map(obj => Object.values(obj).join(','));
  // Unir todo en un solo string con saltos de línea
  return [headers, ...rows].join('\n');
}


validarCuentaContable(item: any): void {
  const regex = /^\d{1,10}$/; // Permite entre 1 y 10 dígitos
  if (!regex.test(item.cuenta_contable)) {
    item.cuenta_contable = item.cuenta_contable.slice(0, 10).replace(/\D/g, ''); // Limita a 10 números
  }
}


}
