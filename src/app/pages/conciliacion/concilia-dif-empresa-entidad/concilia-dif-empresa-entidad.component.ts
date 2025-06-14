import { Component, Inject, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Configuraciones } from '../../../../enviroments/configuraciones';
import { TextosApp } from '../../../../enviroments/textos-app';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { SpinerComponent } from '../../../components/spiner/spiner.component';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import { Empresa } from '../../../models/empresa';
import { Funciones } from '../../../models/funciones';
import { Usuario } from '../../../models/usuario';
import { ConciliacionesService } from '../../../services/conciliaciones-service.service';
import { ExportService } from '../../../services/export.service';
import { GlobalService } from '../../../services/global.service';
import { StyleService } from '../../../services/sytle.service';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-concilia-dif-empresa-entidad',
  imports: [ CommonModule,
    TopbarComponent,
    SidebarComponent,
    SpinerComponent,
    MatTableModule,
    FormsModule,],
  templateUrl: './concilia-dif-empresa-entidad.component.html',
  styleUrl: './concilia-dif-empresa-entidad.component.css'
})
export class ConciliaDifEmpresaEntidadComponent {
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
  filtroConcepto: string = '';
  filtroImporte: string = '';
  filtroDetalle:string = '';
  bgColorSideBar = '';
  msgSobreDisponiblidadPDFCtacte = TextosApp.mensajeSobreDisponiblidadPDFCtacte;
  msgFechaActualizacion = TextosApp.mensajeFechaActualizacion;
  fileBanco?: File;
  fileContable?: File;
  loading : boolean = true;
  movimientos: any;
  todosSeleccionados: boolean = false;

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
     this.conciliaService.getDifEmpresaEntidad().subscribe({
        next: (response: any) => {
          if (response?.control?.codigo === '200') {
            const control = response.control;
            this.movimientos = response.datos.map((item: any) => ({
              ...item,
              //seleccionado: false, // Agregar checkbox por defecto en false
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


  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }

  CancelarConciliacion(): void {

    this.todosSeleccionados = false;

    this.movimientos.forEach((item) => (item.seleccionado = false));
  }

  confirmarConciliacion(): void {

     this.movimientos = this.movimientosFiltrados()
      .filter((item) => item.seleccionado)
      .map((item) => ({
        ...item,
        cuenta_contable: item.cuenta_contable || '0' // Ajusta según sea necesario
      }));

    console.log('Registros procesados:', this.movimientos);
}
  // TOTALIZADORES ///
  movimientosFiltrados() {
    return this.movimientos.filter(item =>
      (!this.filtroConcepto || item.concepto.toLowerCase().includes(this.filtroConcepto.toLowerCase())) &&
      (!this.filtroImporte || item.importe.toString().includes(this.filtroImporte)) &&
      (!this.filtroDetalle || item.detalle.toLowerCase().includes(this.filtroDetalle.toLowerCase()))

    );
  }


  getTotalImporte(): number {
    return this.movimientosFiltrados().reduce(
      (total, item) => total + Number(item.importe),
      0
    );
  }



validarCuentaContable(item: any): void {
  const regex = /^\d{1,10}$/; // Permite entre 1 y 10 dígitos
  if (!regex.test(item.cuenta_contable)) {
    item.cuenta_contable = item.cuenta_contable.slice(0, 10).replace(/\D/g, ''); // Limita a 10 números
  }
}



generarCsv():void{
  const info = this.movimientosFiltrados()
  debugger
  info.filter(item => item.plan_cuentas && item.plan_cuentas > 0)
    .map(item => ({
      ingreso: item.m_ingreso,
      concepto: item.concepto,
      detalle: item.detalle,
      plan_cuentas: item.plan_cuentas,
      asiento: item.m_asiento,
      nro_comp:item.nro_comp,
      importe: item.importe,

  }));

   const csvContent = this.convertirAFormatoCSV(info);

    // Crear un blob y descargar el archivo
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'diferencias-empresa-entidad.csv';
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




}
