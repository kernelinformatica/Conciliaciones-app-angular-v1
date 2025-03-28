import { UsuarioService } from './../../../services/usuario.service';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, RendererFactory2, TemplateRef, ViewChild } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { StyleService } from '../../../services/sytle.service';
import { Usuario } from '../../../models/usuario';
import { Empresa } from '../../../models/empresa';
import { Configuraciones } from '../../../../enviroments/configuraciones';
import { TextosApp } from '../../../../enviroments/textos-app';
import { ActivatedRoute, Router } from '@angular/router';
import { TopbarComponent } from "../../../components/topbar/topbar.component";
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { CommonModule, DatePipe } from '@angular/common';
import { SpinerComponent } from '../../../components/spiner/spiner.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { EmpresaService } from '../../../services/empresa.service';
declare var $: any;

@Component({
  selector: 'app-recuperar-clave',
  imports: [CommonModule,  SpinerComponent, ReactiveFormsModule, NgbModule ],
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.css'
})
export class RecuperarClaveComponent {
  @ViewChild('error') template: TemplateRef<any>;
  envioMailForm: FormGroup;
  modalRef: NgbModalRef;
  msg: any;
  private hashId: string = ''
  imagenFondo : string = "/assets/multimedia/images/login/bg-login-image.png"

  public empresa: Empresa[] = []
  public AppNombre = Configuraciones.appNombre;
  public fechaHoy :Date;
  loading = true;
  emailEnviado = false
  permisoLogueoPorEmpresa = false;
  bgColorSideBar = "";
  public backgroundImageUrl: string = '';
  private renderer: Renderer2;
  validoCliente = false;
  linkRetorno = "/login"
  // Logout Modal //
  mensajeEnvioMAilRecupero = TextosApp.mensajeEnvioMAilRecupero;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private styleService: StyleService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private empresaService: EmpresaService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.backgroundImageUrl = this.styleService.getBackgroundImageUrl();
  }

  empresaModelo!: Empresa;
  imagenPortada : string = "ga-login-front.png";
  gestagroStatus = false;
  gestagroMensaje = ""

  ngOnInit(): void {
    this.loading = true;
    if (typeof document !== 'undefined') {
      // Código que usa el objeto   document
      this.enableDismissTrigger();
    }
    this.envioMailForm = this.fb.group({
      cuenta: ['', [Validators.required, Validators.pattern('.{7}')]]
    });








    this.loading = false;
    this.imagenFondo = 'url(/assets/multimedia/images/login/ga-bg.jpg)';


    this.route.queryParams.subscribe((params) => {
    this.hashId = this.globalService.getHashEmpresa();
    if (this.hashId == null) {
      this.hashId = '0';
      this.backgroundImageUrl = this.styleService.getBackgroundImageUrl();
      this.permisoLogueoPorEmpresa = false;
    } else {
       // Viene con hashId debo de traer la empresa
      this.permisoLogueoPorEmpresa  = true;
      this.empresaService.traerEmpresa(this.hashId).subscribe(
        response => {
          if (response && Object.keys(response).length > 0) {
            this.empresaModelo = response;

            this.imagenPortada = this.empresaModelo.id + "-login-front.png";
            this.imagenFondo  =   'assets/multimedia/images/login/'+this.empresaModelo.id+'-bg.jpg';
            this.globalService.setEmpresa(this.empresaModelo);
            const empresa = this.globalService.getEmpresa();
            this.cambiarImagen(this.imagenFondo)




          } else {

            // Maneja el caso cuando el objeto está vacío
            console.log('El objeto está vacío.');
            // Puedes asignar valores por defecto o realizar otras acciones aquí
            this.imagenPortada = 'ga-login-front.png';  // Ejemplo de valor por defecto
          }


      },
      error => {
        this.imagenPortada = 'ga-login-front.png';
        // Maneja el error en la solicitud HTTP
        console.error('Error al traer la empresa:', error);
      });
    }


  })

    }









    cambiarImagen(fondo: string) {
      this.imagenFondo = `url(${fondo})`;
    }


  ngAfterViewInit() {
    // Inicializar el modal después de que la vista se haya inicializado

  }




  envioDeMail(){
    let cli = this.envioMailForm.value.cuenta.substring(0,2);

    if (this.permisoLogueoPorEmpresa == true && this.globalService.getPermisoLogueoCLiente(cli) == false){
      this.mostrarRespuesta(this.template, "El nro de cuenta no es un número válido");

      //this.errorMessage = TextosApp.resultadoLoginInvalido;
    }else{

      this.loading = true;
    setTimeout(() => {
    }, 2000);
    try {
      this.usuarioService.pedirRestitucionDeClave(this.envioMailForm.value.cuenta).subscribe((response: any) => {
          //
          let resp = response.control.descripcion;
          let respLarga = response.control.descripcionLarga
          let codigo = response.control.codigo;
          //
          if (codigo == "OK"){
            this.mostrarRespuesta(this.template, "Se ha enviado un email a la casilla de correo "+resp+", con las instrucciones para recuperar su clave.");
            this.irAlLogin();
          }else{
            this.mostrarRespuesta(this.template, respLarga+" a "+resp);
          }
          this.loading = false;
        },
        (error: any) => {
          console.error('Ocurrió un error:', error.error.control.descripcionLarga+" : "+error.error.control.descripcion);
          this.mostrarRespuesta(this.template,error.error.control.descripcionLarga+" : "+error.error.control.descripcion);
          this.loading = false;
        }


    );


     } catch (error: any) {
      debugger
      this.loading = false;

      console.error('Login Error', error);

    }
    }




  }

  confirmarEnvio(content){
    /*if (this.miCuentaForm.valid) {
      const formValues = this.miCuentaForm.value;
      console.log('Formulario enviado:', formValues);
      const email = formValues.email;
      if (email == this.usuarioCuenta[0].email){
        this.mostrarRespuesta(this.template, "El correo que intenta enviar es el mismo que tiene actualmente su cuenta, no se procesará la información");
      }else{
        this.cambioDeCorreoConfirmado(email)
      }

      modal.close('Save click');
      // Lógica adicional aquí

    } else {
      console.log('Formulario no válido');

  }*/
  }

  getStyleTemplate(elemento:string, propiedad:string) {

    return this.styleService.getStyleTemplate(elemento, propiedad);

  }
  irAlLogin(){
    this.router.navigate(["/login"]);
  }

  mostrarRespuesta(template: TemplateRef<any>, msg:string) {
    this.msg = msg
    this.modalRef = this.modalService.open(template, { backdrop: 'static', keyboard: false });
  }

  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }


}
