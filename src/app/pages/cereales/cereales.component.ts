import { CerealesService } from './../../services/cereales.service';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { Configuraciones } from '../../../enviroments/configuraciones';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { StyleService } from '../../services/sytle.service';
import { ReportesService } from '../../services/reportes.service';
import { ExportService } from '../../services/export.service';
import { UiService } from '../../services/ui.service';
import { Usuario } from '../../models/usuario';
import { Empresa } from '../../models/empresa';
import { Cuenta } from '../../models/cuenta';
import { Funciones } from '../../models/funciones';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SpinerComponent } from '../../components/spiner/spiner.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
@Component({
  selector: 'app-cereales',
  imports: [CommonModule, TopbarComponent, SidebarComponent, SpinerComponent, TooltipModule],
  templateUrl: './cereales.component.html',
  styleUrl: './cereales.component.css'
})
export class CerealesComponent  implements OnInit, AfterViewInit {


  public usuarioLogueado!: Usuario;
  public empresa: Empresa[] = []
  public usuarioConectado: Usuario[] = [];
  public usuarioCuenta: Cuenta[] = [];
  public usuarioFunciones: Funciones[] =[]
  public AppNombre = Configuraciones.appNombre;
  public resumenCereal: any;  // Usado para almacenar respuesta del servicio
  public cantidadMovimientos: number = 0;
  public verModarDescargaPdf: boolean = false;
  public copyRigth: string = Configuraciones.kernelCopyRigth
  permisos: string[] = []
  public fechaHoy :Date;
  fechasIguales: boolean;
  permisoDescargaComp:string | "N" | undefined;
  permisoRemitos:string | "N" | undefined;
  fechaInfoActualizacion:string | "" | undefined;
  fechaSaldoActualizacion: string | "" | undefined;
  loading = true;
  bgColorSideBar = "";



  fichaRemitos: any;
  public cantMovResuCereal: number = 0;
  public cantMovFichaRemitos: number = 0;

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
    @Inject(PLATFORM_ID) private platformId: Object

  ) {

  }
  ngAfterViewInit() {
    // Inicializar el modal después de que la vista se haya inicializado

  }




   async cargarResumen(): Promise<any> {
    this.loading = true;
      setTimeout(() => {
        this.loading = false;
        //this.errorMessage = ""
      }, 2000);
      try {
        this.cerealesService.getResumenDeCereales(this.usuarioLogueado.cuenta.id).subscribe((response: any) => {
         let empresa = this.globalService.getEmpresa()
         if (empresa.id == 11){
          // solo si es coopar ( porque en coopar el combustible viene dentro del la ficha de cereales, para los demós no, entonces lo que hago es sacar el ultimo elemento del array)
          const resumenCerealFiltrado = response.datos.resumenCereal.filter(cereal => cereal.cerealId !== "0" &&  cereal.cerealId !== "99" && cereal.cerealId !== "98").reverse();
          this.resumenCereal =resumenCerealFiltrado.reverse()

        }else{
          this.resumenCereal = response.datos.resumenCereal.reverse()
         }


          this.cantMovResuCereal = this.resumenCereal.length

          if( this.globalService.getPermisoFichaRemitos()){
            this.fichaRemitos = response.datos.fichaRemito;
            this.cantMovFichaRemitos =  this.resumenCereal.length
          }
        });



        // Handle successful login (e.g., navigate to another page)
      } catch (error: any) {

        this.loading = false;

        console.error('Login Error', error);
        //this.errorMessage = String(error);
      }




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
      this.usuarioLogueado = this.globalService.getUsuarioLogueado()
      if (this.usuarioLogueado) {

        this.permisoDescargaComp = this.globalService.getPermisoDescargaComprobantes();
        this.permisoRemitos = this.globalService.getPermisoFichaRemitos()

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
        this.cargarResumen()
      } else {
        this.globalService.logout();
         this.router.navigate(['/login']);
        // Handle the null case, e.g., redirect to login
      }
    }



  }else{
    this.logout()
    }

  }

  irAFichaDeCereal(item) {
    this.router.navigate(['/ficha-de-cereales'], { state: { data: item } });
  }

  irARemitosPendientes(item) {
    this.router.navigate(['/ficha-de-remitos-pendientes'], { state: { data: item } });
  }

  logout(){
    this.router.navigate(['/logout']);


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
        const url = Configuraciones.dominioBaseDescargaPdf+`/resumen-cereales-${this.globalService.getUsuarioLogueado().cuenta.id}.pdf`
        this.reportesService.descargarCtaCtePdf().subscribe((resp: any) => {});

        this.verModarDescargaPdf = true;
          setTimeout(() => {
            this.verModarDescargaPdf = false;

            const a = document.createElement('a');
            a.href = url;
            a.download = `resumen-cereales-${this.globalService.getUsuarioLogueado().cuenta.id}.pdf`;
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
