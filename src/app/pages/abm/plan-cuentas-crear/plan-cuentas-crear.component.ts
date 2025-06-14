import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Configuraciones } from '../../../../enviroments/configuraciones';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { SpinerComponent } from '../../../components/spiner/spiner.component';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import { Empresa } from '../../../models/empresa';
import { TipoCuentasContables } from '../../../models/tipos-cuentas-contables';
import { Funciones } from '../../../models/funciones';
import { Usuario } from '../../../models/usuario';
import { ConciliacionesService } from '../../../services/conciliaciones-service.service';
import { ExportService } from '../../../services/export.service';
import { GlobalService } from '../../../services/global.service';
import { StyleService } from '../../../services/sytle.service';
import { UiService } from '../../../services/ui.service';
import { Control } from '../../../models/control';

@Component({
  selector: 'app-plan-cuentas-crear',
  imports: [CommonModule,
    TopbarComponent,
    SidebarComponent,
    SpinerComponent,
    MatTableModule,
    FormsModule,],
  templateUrl: './plan-cuentas-crear.component.html',
  styleUrl: './plan-cuentas-crear.component.css'
})
export class PlanCuentasCrearComponent {
  public usuarioLogueado!: Usuario;
  public empresa: Empresa[] = [];
  public usuarioConectado: Usuario[] = [];
  public usuarioCuenta: any;
  public usuarioFunciones: Funciones[] = [];
  public AppNombre = Configuraciones.appNombre;
  public cantidadMovimientos: number = 0;
  public verModarDescargaPdf: boolean = false;
  public copyRigth: string = Configuraciones.kernelCopyRigth;
  permisos: string[] = [];
  public fechaHoy: Date;
  fechasIguales: boolean;
  permisoDescargaComp: string | 'N' | undefined;
  filtroConcepto: string = '';
  filtroFecha: string = '';
  bgColorSideBar = '';
  fileBanco?: File;
  fileContable?: File;
  loading : boolean = true;
  movimientos: any;
  todosSeleccionados: boolean = false;
  cuentasContablesTipo:any;
  cantidadTiposCtaCble: number = 0;
  nuevaCuenta: TipoCuentasContables = new TipoCuentasContables({id: 0, tipo_cuenta: 0, descripcion: '', plan_cuentas: ''});
  modalRespuestaConcilia: string;
  control: Control = new Control({codigo: 0, mensaje: ''});
  abm:number = 0; // 0: Crear, 1: Editar, 2: Ver
  http: any;

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



  onSubmit() {
    this.loading = true
    this.abm = 1
    this.nuevaCuenta.tipo_cuenta = this.cuentasContablesTipo.tipo_cuenta
    this.nuevaCuenta.descripcion = this.cuentasContablesTipo.descripcion
    this.nuevaCuenta.plan_cuentas = this.cuentasContablesTipo.plan_cuentas



    this.conciliaService.getAbmCuentasContables(this.nuevaCuenta, this.abm).subscribe({
    next: (response: any) => {
      this.control = response.control
      if (response?.control?.codigo === '200') {


        this.modalRespuestaConcilia = this.control.mensaje;
        this.nuevaCuenta = new TipoCuentasContables({id: 0, tipo_cuenta: 0, descripcion: '', plan_cuentas: ''});

        // Aquí puedes redirigir a otra página o realizar alguna acción adicional.

      } else {
        this.control = response.control
        console.error(
          'Error en respuesta del servidor:',
          this.control.mensaje
        );
        this.modalRespuestaConcilia = this.control.mensaje;
        this.nuevaCuenta = new TipoCuentasContables({id: 0, tipo_cuenta: 0, descripcion: '', plan_cuentas: ''});

      }
      this.loading = false
    },
    error: (error) => {
      this.modalRespuestaConcilia = this.control.mensaje;
      this.nuevaCuenta = new TipoCuentasContables({id: 0, tipo_cuenta: 0, descripcion: '', plan_cuentas: ''});

    },
  });


   // Aquí puedes agregar la lógica para guardar la cuenta en la base de datos.
  }

  async cargarInfo(): Promise<any> {
    // Simular una llamada al servicio para obtener los movimientos

    setTimeout(() => {

      //this.errorMessage = ""
    }, 5000);
    this.conciliaService.getTipoCuentasContables().subscribe({
      next: (response: any) => {
        if (response?.control?.codigo === '200') {
          this.cuentasContablesTipo = response.datos;
          this.cuentasContablesTipo = response.datos.map((item: any) => ({
            ...item


          }));


          console.log('Tipos de cuentas:', this.cuentasContablesTipo);
        } else {
          console.error(
            'Error en respuesta del servidor:',
            response.control.mensaje
          );
          alert(`Error: ${response.control.mensaje}`);
        }
        this.loading = false
      },
      error: (error) => {
        console.error('Error al obtener cuentas contables:', error);
        alert('Ocurrió un error al obtener las cuentas contables.');
      },
    });
   //// llamamda a algun servicio
    this.loading = false;
  }



  ngOnInit(): void {


    this.bgColorSideBar = this.styleService.getStyleTemplate(
      'navbar-nav',
      'background-color'
    );
    if (typeof document !== 'undefined') {
      // Código que usa el objeto document
      //this.enableDismissTrigger();
    }

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
  irACuentasContables(){
    this.router.navigate(['plan-cuentas']);
  }
}
