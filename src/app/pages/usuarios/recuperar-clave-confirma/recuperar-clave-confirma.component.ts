import { UsuarioService } from './../../../services/usuario.service';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, RendererFactory2, TemplateRef, ViewChild } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { StyleService } from '../../../services/sytle.service';
import { Empresa } from '../../../models/empresa';
import { Configuraciones } from '../../../../enviroments/configuraciones';
import { TextosApp } from '../../../../enviroments/textos-app';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { SpinerComponent } from '../../../components/spiner/spiner.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { EmpresaService } from '../../../services/empresa.service';
import { LoginService } from '../../../services/login.service';


declare var $: any;

@Component({
  selector: 'app-recuperar-clave-confirma',
  imports: [CommonModule,  SpinerComponent, ReactiveFormsModule, NgbModule ],
  templateUrl: './recuperar-clave-confirma.component.html',
  styleUrl: './recuperar-clave-confirma.component.css'
})
export class RecuperarClaveConfirmaComponent {
  @ViewChild('error') template: TemplateRef<any>;
  claveForm: FormGroup;
  modalRef: NgbModalRef;
  msg: any;
  private hashId: string = ''
  private hashIdPass: string = ''
  private cuenta :string = ""
  imagenFondo : string = "assets/multimedia/images/login/bg-login-image.png"

  public empresa: Empresa[] = []
  public AppNombre = Configuraciones.appNombre;
  public fechaHoy :Date;
  loading = true;
  emailEnviado = false
  bgColorSideBar = "";
  public backgroundImageUrl: string = '';
  private renderer: Renderer2;
  empresaModelo!: Empresa;
  logoEmpresa : string = "gestagro.png";
  apiStatus = false;
  apiMensaje = ""


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
    private loginService: LoginService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.backgroundImageUrl = this.styleService.getBackgroundImageUrl();
  }






  ngOnInit(): void {
    this.loading = true;
    if (typeof document !== 'undefined') {
      // Código que usa el objeto   document
      this.enableDismissTrigger();
    }
    this.claveForm = this.fb.group({
      clave: ['', [Validators.required, Validators.minLength(4)]],
      repiteClave: ['', [Validators.required]],

    }, { validator: this.passwordMatchValidator  });








    this.loading = false;
    this.imagenFondo = 'url(assets/multimedia/images/login/ga-bg.jpg)';




    this.route.queryParams.subscribe((params) => {
      let hash = ""
      let hashIdPass = ""
      if (params['hashId']){
        hash = params['hashId']

      }else{
        hash = this.globalService.getHashEmpresa()
      }
      this.hashId = hash;
      if (params['hashIdPass']){
        hashIdPass = params['hashIdPass']
      }
      this.hashIdPass = hashIdPass

      if (hash == "0" || hash == "" ){
        this.globalService.removeHashEmpresa()
      }

      if (hashIdPass != "" && hashIdPass != null){
          this.hashIdPass = hashIdPass



          this.loading = true;
          setTimeout(() => {

          }, 2000);
          try {
         this.loginService.consultarPedidoClave(this.hashIdPass).then((response: any) => {
          if (response == null){
              alert("CODIGO DE PEDIDO INVÁLIDO O VENCIDO, SOLICITE OTRO NUEVAMENTE.")
            this.irAlPedirNuevo()
          }else{

            if (this.checkTokenValidity(response.fechaPedido, response.fechaVencimiento)) {

              this.cuenta = response.cuenta

            } else {
             this.mostrarRespuesta(this.template, "El token es inválido, no esta activo o ha expirado. Debe solicitar uno nuevo para regenerar su clave.")
              this.irAlPedirNuevo()

            }

          }

          },
          (error: any) => {
            alert("ERROR "+error)
            console.error('Ocurrió un error:', error.error.control.descripcion);
            this.mostrarRespuesta(this.template, error.error.control.descripcion);
            this.loading = false;
          }


      );




            // Handle successful login (e.g., navigate to another page)
          } catch (error: any) {

            this.loading = false;

            console.error('Login Error', error);
            //this.errorMessage = String(error);
          }














      }else{
          alert("Error no se pudo identificar el codigo de recuperacion de clave, solicite uno nuevamente.")
          this.irAlPedirNuevo()
      }

      })



      this.globalService.validarServicioSiEstaDisponible().subscribe(
        response => {

          if (response && Object.keys(response).length > 0) {
            this.loading = false;
            this.apiStatus = true
            this.apiMensaje = ''
            this.globalService.setStatusServicioRest(this.apiStatus)



            if (this.hashId == null) {
              this.hashId = '0';
              this.backgroundImageUrl = this.styleService.getBackgroundImageUrl();




            } else {
               // Viene con hashId debo de traer la empresa

              this.empresaService.traerEmpresa(this.hashId).subscribe(
                response => {
                  if (response && Object.keys(response).length > 0) {
                    this.empresaModelo = response;
                    this.globalService.setHasEmpresa(this.hashId);
                    this.logoEmpresa = 'assets/multimedia/images/login/'+this.empresaModelo.id + '.png';
                    this.imagenFondo  =   'assets/multimedia/images/login/'+this.empresaModelo.id+'-bg.jpg';
                    this.globalService.setEmpresa(this.empresaModelo);

                    const empresa = this.globalService.getEmpresa();


                    this.cambiarImagen(this.imagenFondo)
                    this.cambiarLogo(this.logoEmpresa)



                  } else {

                    // Puedes asignar valores por defecto o realizar otras acciones aquí
                    this.logoEmpresa = 'gestagro.png';  // Ejemplo de valor por defecto
                  }


              },
              error => {
                this.logoEmpresa = 'gestagro.png';
                // Maneja el error en la solicitud HTTP
                console.error('Error al traer la empresa:', error);
              });
            }

          } else {
            this.loading = false;
            // Maneja el caso cuando el objeto está vacío
            this.apiMensaje = 'El Servicio no está disponible temporalmente, intente nuevamente más tarde. Sepa disculpar las molestias ocasionadas.'
            this.apiStatus = false

          }
       },
       error => {
        this.apiStatus = false
        this.globalService.setStatusServicioRest(this.apiStatus)
        this.apiMensaje =  'El Servicio no está disponible temporalmente, intente nuevamente más tarde. Sepa disculpar las molestias ocasionadas.'
        // Maneja el error en la solicitud HTTP
        console.error(this.apiMensaje);
      });

    }




    irAlPedirNuevo(){
      this.router.navigate(["/recuperar-clave"]);
    }

    irAlLogin(){

      if (this.hashId != null && this.hashId != "0" && this.hashId != ""){
        this.router.navigate(["/login?hashId="+this.hashId]);
      }else{
        this.globalService.removeHashEmpresa()
        this.router.navigate(["/login"]);
        }


    }

    passwordMatchValidator(formGroup: FormGroup) {
      const password = formGroup.get('clave');
      const confirmPassword = formGroup.get('repiteClave');
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ notMatching: true });
      } else {
        confirmPassword.setErrors(null);
      }
      return null;
    }


  cambiarImagen(fondo: string) {
    this.imagenFondo = `url(${fondo})`;
  }
  cambiarLogo(logo: string) {
    this.logoEmpresa = logo;

  }

  ngAfterViewInit() {
    // Inicializar el modal después de que la vista se haya inicializado

  }


  checkTokenValidity(fechaPedido: string, fechaVencimiento: string): boolean {
    const fechaPedidoDate = new Date(fechaPedido); // Convierte fechaPedido a Date
    const fechaVencimientoDate = new Date(fechaVencimiento); // Convierte fechaVencimiento a Date
    const hoy = new Date(); // Fecha actual

    // Verifica si hoy está dentro del rango
    return hoy >= fechaPedidoDate && hoy <= fechaVencimientoDate;
  }

  confirmarClave(){


  this.loading = true;

   setTimeout(() => {
    }, 2000);
    try {
      this.usuarioService.cambiarConfirmarNuevaClave(this.cuenta, this.claveForm.value.clave, this.hashIdPass).subscribe((response: any) => {

          if(response.control.codigo == "OK"){
            this.loading = false;
            this.mostrarRespuesta(this.template,"La clave ha sido cambiada con éxito, ingrese session con su nueva clave");
            this.irAlLogin()
          }else{
            this.loading = false;
            this.mostrarRespuesta(this.template,"Se produjo un error inesperado al cambiar la clave, inténte nuevamente más tarde.");
          }

        },
        (error: any) => {
          console.error('Ocurrió un error:', error.error.control.descripcionLarga+" : "+error.error.control.descripcion);
          this.mostrarRespuesta(this.template,error.error.control.descripcionLarga+" : "+error.error.control.descripcion+", inténte nuevamente más tarde.");
          this.loading = false;
        }


    );


     } catch (error: any) {

      this.loading = false;

      console.error('Login Error', error);

    }







}
  getStyleTemplate(elemento:string, propiedad:string) {

    return this.styleService.getStyleTemplate(elemento, propiedad);

  }


  mostrarRespuesta(template: TemplateRef<any>, msg:string) {
    this.msg = msg
    this.modalRef = this.modalService.open(template, { backdrop: 'static', keyboard: false });
  }

  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }

}
