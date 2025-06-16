import { Control } from './../../../models/control';
import { Component, Inject, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TextosApp } from '../../../../enviroments/textos-app';
import { Configuraciones } from '../../../../enviroments/configuraciones';
import { Empresa } from '../../../models/empresa';
import { Funciones } from '../../../models/funciones';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConciliacionesService } from '../../../services/conciliaciones-service.service';
import { ExportService } from '../../../services/export.service';
import { GlobalService } from '../../../services/global.service';
import { StyleService } from '../../../services/sytle.service';
import { UiService } from '../../../services/ui.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { SpinerComponent } from '../../../components/spiner/spiner.component';
import { TopbarComponent } from '../../../components/topbar/topbar.component';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-plan-cuentas',
  imports: [CommonModule,
    TopbarComponent,
    SidebarComponent,
    SpinerComponent,
    MatTableModule,
    FormsModule,],
  templateUrl: './plan-cuentas.component.html',
  styleUrl: './plan-cuentas.component.css'
})
export class PlanCuentasComponent {
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
  cuentasContables:any;
  cantidadCuentasContables: number = 0;
  modalRespuestaConcilia: string;
  abm :number = 0; // 0: Crear, 1: Editar, 2: Ver
  control: Control = new Control({codigo: 0, mensaje: ''});
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
    this.conciliaService.getCuentasContables(0,0).subscribe({
      next: (response: any) => {
        if (response?.control?.codigo === '200') {
          this.cuentasContables = response.datos;
          this.cuentasContables = response.datos.map((item: any) => ({
            ...item


          }));
          this.cantidadCuentasContables = this.cuentasContables.length;

          console.log('Cuentas contables:', this.cuentasContables);
        } else {
          debugger
          console.error(
            'Error en respuesta del servidor:',
            response.control.mensaje
          );
          if (response.control.codigo === 401) {
           this.logout()

          }
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
   // this.loading = false;
  }


  ngOnInit(): void {

    this.loading = true
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


editarCuentaContable(item: any): void {
  this.router.navigate(['plan-cuentas-editar'], { queryParams: { idCuentaContable: item.id } });

}

  borrarCuentaContable(item: any): void {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta cuenta contable?");

    if (!confirmacion) {
      return; // Si el usuario cancela, no ejecutamos el código de borrado.
    }
  this.abm = 2; // Establecer el modo de borrado
  this.loading = true; // Mostrar el spinner de carga
  this.conciliaService.getAbmCuentasContables(item, this.abm).subscribe({
      next: (response: any) => {
      this.control = response.control
      if (response?.control?.codigo === '200') {


        this.modalRespuestaConcilia = this.control.mensaje;
        alert(this.modalRespuestaConcilia)
        this.cargarInfo()
       // this.nuevaCuenta = new TipoCuentasContables({id: 0, tipo_cuenta: 0, descripcion: '', plan_cuentas: ''});

        // Aquí puedes redirigir a otra página o realizar alguna acción adicional.

      } else {
        this.control = response.control
        console.error(
          'Error en respuesta del servidor:',
          this.control.mensaje
        );
        alert(this.control.mensaje)
        this.modalRespuestaConcilia = this.control.mensaje;
        alert(this.modalRespuestaConcilia)
      }
      this.loading = false
    },
    error: (error) => {
      this.modalRespuestaConcilia = this.control.mensaje;
      alert(this.modalRespuestaConcilia)

    },
  });




  }




  logout() {
    this.router.navigate(['/logout']);
  }

  irAlhome() {
    this.router.navigate(['conciliacion']);
  }
  irAlPlanCuentasCrear() {
    this.router.navigate(['plan-cuentas-crear']);
  }

  validarCuentaContable(item: any): void {
    const regex = /^\d{1,10}$/; // Permite entre 1 y 10 dígitos
    if (!regex.test(item.cuenta_contable)) {
      item.cuenta_contable = item.cuenta_contable.slice(0, 10).replace(/\D/g, ''); // Limita a 10 números
    }
  }


}
