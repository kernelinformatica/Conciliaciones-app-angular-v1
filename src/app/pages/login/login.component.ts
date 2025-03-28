import { UsuarioService } from './../../services/usuario.service';
import { StyleService } from './../../services/sytle.service';
import { EmpresaService } from '../../services/empresa.service';
import { GlobalService } from '../../services/global.service';
import { TextosApp } from '../../../enviroments/textos-app';
import { BehaviorSubject } from 'rxjs';

import {
  Component,
  Inject,
  NgModule,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinerComponent } from '../../components/spiner/spiner.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,

  Validators,
} from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';
import { isPlatformBrowser } from '@angular/common';
import { Empresa } from '../../models/empresa';
import { Router } from '@angular/router'
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { param } from 'jquery';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, CommonModule, SpinerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true

})
export class LoginComponent implements OnInit {

  //public usuario: AbstractControl;
  //public clave: AbstractControl;
  loginForm!: FormGroup;
  private hashId: string = '';
  private hashIdPass : string = ''
  private renderer: Renderer2;
  private tipoLogueoPorEmpresa : Boolean = false;
  private permisoLogueoPorEmpresa: Boolean = false;
  public versionSistema: String = environment.versionSistema;
  public backgroundImageUrl: string = '';
  public imgFront: string = 'ga-login-front.png';
  public imagenFondo :string =''

  bgColorBotones:string="#4E73DF";
  colorTextoBotones:string= 'white'
  colorLinks:string="#4E73DF";
  colorTextos:string="#4E73DF";
  errorMessage: string = '';
  red: any;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    rendererFactory: RendererFactory2,
    private styleService: StyleService,
    private empresaService: EmpresaService,
    private globalService: GlobalService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {



    this.renderer = rendererFactory.createRenderer(null, null);
    this.backgroundImageUrl = this.styleService.getBackgroundImageUrl();
  }
  getStyleTemplate(elemento:string, propiedad:string) {

    return this.styleService.getStyleTemplate(elemento, propiedad);

  }

  empresaModelo!: Empresa;
  imagenPortada : string = "ga-login-front.png";
  gestagroStatus = false;
  gestagroMensaje = ""
  loading = true;
  ngOnInit() {
    this.loading = true;
    if (typeof document !== 'undefined') {
      // Código que usa el objeto   document
      this.enableDismissTrigger();
    }

    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
    this.imagenFondo = 'url(assets/multimedia/images/login/ga-bg.jpg)';
    this.route.queryParams.subscribe((params) => {
    let hash = ""
    if (params['hashId']){
      hash = params['hashId']
    }else{
      hash = this.globalService.getHashEmpresa()
    }
    if (params['hashIdPass']){
       // VIENE CON CAMBIO DE CLAVE ASI QUE REDIRECINO 
      this.hashIdPass = params['hashIdPass'];
      this.irAconfirmacionCambioDeClave(this.hashIdPass, this.hashId)
    }else{
      this.hashIdPass = "";
    }

    if (hash == "0" || hash == ""){
      this.globalService.removeHashEmpresa()
    }





    this.globalService.validarServicioSiEstaDisponible().subscribe(
      response => {

        if (response && Object.keys(response).length > 0) {
          this.loading = false;
          this.gestagroStatus = true
          this.gestagroMensaje = ''
          this.globalService.setStatusGestagro(this.gestagroStatus)

          this.hashId = hash;

          if (this.hashId == null) {
            this.hashId = '0';
            this.backgroundImageUrl = this.styleService.getBackgroundImageUrl();




          } else {
             // Viene con hashId debo de traer la empresa

            this.empresaService.traerEmpresa(this.hashId).subscribe(
              response => {
                if (response && Object.keys(response).length > 0) {
                  this.empresaModelo = response;
                  this.tipoLogueoPorEmpresa  = true;
                  this.globalService.setHasEmpresa(this.hashId);
                  this.imagenPortada = this.empresaModelo.id + "-login-front.png";
                  this.imagenFondo  =   'assets/multimedia/images/login/'+this.empresaModelo.id+'-bg.jpg';
                  this.globalService.setEmpresa(this.empresaModelo);
                  const empresa = this.globalService.getEmpresa();


                  this.cambiarImagen(this.imagenFondo)




                } else {
                  this.tipoLogueoPorEmpresa = false
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

        } else {
          this.loading = false;
          // Maneja el caso cuando el objeto está vacío
          this.gestagroMensaje = 'Gestagro no está disponible temporalmente, intente nuevamente más tarde. Sepa disculpar las molestias ocasionadas.'
          this.gestagroStatus = false

        }
     },
     error => {
      this.gestagroStatus = false
      this.globalService.setStatusGestagro(this.gestagroStatus)
      this.gestagroMensaje =  'Gestagro no está disponible temporalmente, intente nuevamente más tarde. Sepa disculpar las molestias ocasionadas.'
      // Maneja el error en la solicitud HTTP
      console.error(this.gestagroMensaje);
    });








      // Aplicar el fondo solo en el navegador
      if (isPlatformBrowser(this.platformId)) {
       this.renderer.setStyle(
          document.documentElement,
          '--background-image-url',
          `url(${this.backgroundImageUrl})`
        );
      }
    });
  }

  irAPedirRecuperacion(){

   this.router.navigate(['recuperar-clave'])

  }


  
  irAconfirmacionCambioDeClave(hashIdPass: string, hashId: string){
  
    this.router.navigate(['recuperar-clave-confirma'], { queryParams: { hashIdPass, hashId } })
 
   }

  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }
  cambiarImagen(fondo: string) {
    this.imagenFondo = `url(${fondo})`;
  }


  itemsLocalStorage: any[] = [];
  loadFromLocalStorage() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      this.itemsLocalStorage.push({ key, value });
    });
  }





   async onSubmit(): Promise<void>{
    this.errorMessage = ""


    if (this.loginForm.invalid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        //this.errorMessage = ""
      }, 200);

      this.errorMessage = 'ERROR: El usuario o la clave no se ha ingresado.';

    }else{


      let formCli = this.loginForm.value.usuario;
      let cli = formCli.substring(0,2);

      if (this.tipoLogueoPorEmpresa == true && this.globalService.getPermisoLogueoCLiente(cli) == false){
        this.errorMessage = TextosApp.resultadoLoginInvalido;
      }else{
        this.login()
      }




    }


  }






  async login(){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        //this.errorMessage = ""
      }, 5000);
      try {
        const response : any = await this.loginService.loginUser(this.loginForm.value);

        if (response && response.codigo === "OK") {

          const usu = this.globalService.getUsuarioLogueado();
          this.errorMessage = "Bienvenido "+usu.cuenta.id+" : "+usu.cuenta.nombre
          if (usu.cuenta.claveMarcaCambio == 0){
            this.router.navigate(['cambio-clave-de-acceso'])
          }else{
            this.router.navigate(['gestagro'])
          }
        } else if (response && response.codigo === "ERROR") {

          this.errorMessage = String(response.codigo+": "+response.descripcion);
          alert(this.errorMessage)
        }
        this.loading = false;

        // Handle successful login (e.g., navigate to another page)
      } catch (error: any) {

        this.loading = false;

        //console.error('Login Error', error);
        this.errorMessage = String(error);
      }
}


}
