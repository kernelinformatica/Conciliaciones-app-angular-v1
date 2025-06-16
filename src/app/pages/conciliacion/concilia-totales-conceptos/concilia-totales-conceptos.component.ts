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
  selector: 'app-concilia-totales-bancos',
  imports: [
    CommonModule,
    TopbarComponent,
    SidebarComponent,
    SpinerComponent,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './concilia-totales-conceptos.component.html',
  styleUrl: './concilia-totales-conceptos.component.css'
})
export class ConciliaTotalesConceptosComponent {

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
  permisos: string[] = [];
  public fechaHoy: Date;
  fechasIguales: boolean;
  permisoDescargaComp: string | 'N' | undefined;
  tieneCtacteDolar: string | 'N' | undefined;
  fechaInfoActualizacion: string | '' | undefined;
  fechaSaldoActualizacion: string | '' | undefined;
  modalRespuestaConcilia: string | '' | undefined;
  cuentaConcilia:string | '' | undefined;
  bgColorSideBar = '';
  msgSobreDisponiblidadPDFCtacte = TextosApp.mensajeSobreDisponiblidadPDFCtacte;
  msgFechaActualizacion = TextosApp.mensajeFechaActualizacion;
  fileBanco?: File;
  fileContable?: File;
  loading = true;
  movimientos: any;
  totalesBancosFinal: { concepto: string; plan_cuenta_concilia: string; importe: number; plan_cuentas: number }[] = [];

  totalCuentaConcilia:number = 0;
  cuentasContables:any;
  cantidadCuentasContables: number = 0;
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
  getTotalImporteAsiento(): number {
    return this.totalesBancosFinal?.reduce((total, item) => total + (item.importe || 0), 0) || 0;
  }

  async cargarInfo(): Promise<any> {

    setTimeout(() => {

      //this.errorMessage = ""
    }, 5000);

    try {
      this.conciliaService.getTotales().subscribe({
        next: (response: any) => {
          if (response?.control?.codigo === '200') {
            const control = response.control;
            this.movimientos = response.datos.map((item: any) => ({
              ...item,
              seleccionado: false, // Agregar checkbox por defecto en false
            }));
            this.cantidadMovimientos = this.movimientos.length;
            this.cuentaConcilia = this.movimientos[0]["plan_cuenta_concilia"] || '';


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
          this.loading = false;
          console.error('Error en la petición:', error);
          alert('Ocurrió un error al obtener los movimientos de conciliación.');
        },
      });
    } catch (error: any) {
      console.error('Error inesperado:', error);
      alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
    }


    /*

    traigo las cuentas contables cargadas para el cliente
    */

    this.conciliaService.getCuentasContables(2).subscribe({
      next: (response: any) => {
        if (response?.control?.codigo === '200') {
          this.cuentasContables = response.datos;
          this.cuentasContables = response.datos.map((item: any) => ({
            ...item


          }));
          this.cantidadCuentasContables = this.cuentasContables.length;

          console.log('Cuentas contables recibidas:', this.cuentasContables);
        } else {
          console.error(
            'Error en respuesta del servidor:',
            response.control.mensaje
          );
          alert(`Error: ${response.control.mensaje}`);
        }
      },
      error: (error) => {
        console.error('Error al obtener cuentas contables:', error);
        alert('Ocurrió un error al obtener las cuentas contables.');
      },
    });


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

    this.todosSeleccionados = false;
    this.movimientosConciliados = [];
    this.movimientos.forEach((item) => (item.seleccionado = false));
  }

  /*agregarItemAsientoTalesConceptos(): void {
    this.totalesBancosFinal = this.movimientos

    .filter(item => item.plan_cuentas && item.plan_cuentas > 0)
    .map(item => ({
      concepto: item.concepto,
      plan_cuenta_concilia: item.plan_cuenta_concilia,
      importe: Number(item.importe), // Asegura que el valor sea numérico
      plan_cuentas: item.plan_cuentas
    }));
    this.totalCuentaConcilia = this.getTotalImporteAsiento() *-1
    debugger

}*/
agregarItemAsientoTalesConceptos(): void {
  // Calcular el total de los importes de los elementos filtrados
  this.totalCuentaConcilia = this.movimientos
    .filter(item => Number(item.plan_cuentas) > 0)
    .reduce((total, item) => total + (Number(item.importe) || 0), 0) * -1;

  const conceptoFijo = {
    concepto: 'CONCILIAR CONTRA',
    plan_cuenta_concilia: this.cuentaConcilia,
    importe: this.totalCuentaConcilia, // Ahora tiene el valor correcto
    plan_cuentas: 0
  };

  const nuevosElementos = this.movimientos
    .filter(item => Number(item.plan_cuentas) > 0)
    .map(item => ({
      concepto: item.concepto || 'Sin concepto',
      plan_cuenta_concilia: 0,
      importe: Number(item.importe) || 0,
      plan_cuentas: item.plan_cuentas || 0
    }));

  // Se conserva el elemento fijo y se agregan los nuevos sin reemplazo
  this.totalesBancosFinal = [conceptoFijo, ...nuevosElementos];

  console.debug('Total cuenta concilia:', this.totalCuentaConcilia);
}


cancelarAsientoConciliacion(): void {
  this.totalCuentaConcilia = 0;
  this.totalesBancosFinal = [];
  console.debug('Operación cancelada. Estado reseteado.');
}


generarCsv():void{
  const totalesBancosFinal = this.movimientos
    .filter(item => item.plan_cuentas && item.plan_cuentas > 0)
    .map(item => ({
      concepto: item.concepto,
      plan_cuenta_concilia: item.plan_cuenta_concilia,
      importe: item.importe,
      plan_cuentas: item.plan_cuentas
    }));

   const csvContent = this.convertirAFormatoCSV(totalesBancosFinal);

    // Crear un blob y descargar el archivo
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'totales_bancos.csv';
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




confirmarConcilacionFinal(){
  const x = this.movimientosConciliados
  debugger
  alert("ENVIO EL OBJECTO MOVIMIENTOS CONCILIADOS AL SERVICIO QUE GRABA LA CONCILIACION DEFINITIVAMENTE " + JSON.stringify(this.movimientosConciliados.length));

}

validarCuentaContable(item: any): void {
  const regex = /^\d{1,10}$/; // Permite entre 1 y 10 dígitos
  if (!regex.test(item.cuenta_contable)) {
    item.cuenta_contable = item.cuenta_contable.slice(0, 10).replace(/\D/g, ''); // Limita a 10 números
  }
}


}
