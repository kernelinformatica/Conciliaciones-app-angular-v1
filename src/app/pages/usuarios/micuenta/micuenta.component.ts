import { UsuarioService } from './../../../services/usuario.service';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, RendererFactory2, TemplateRef, ViewChild } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { StyleService } from '../../../services/sytle.service';
import { Usuario } from '../../../models/usuario';
import { Empresa } from '../../../models/empresa';
import { Cuenta } from '../../../models/cuenta';
import { Configuraciones } from '../../../../enviroments/configuraciones';
import { Funciones } from '../../../models/funciones';
import { ActivatedRoute, Router } from '@angular/router';
import { TopbarComponent } from "../../../components/topbar/topbar.component";
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import { SpinerComponent } from '../../../components/spiner/spiner.component';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { TextosApp } from '../../../../enviroments/textos-app';
declare var $: any;
@Component({
  selector: 'app-micuenta',
  imports: [CommonModule, TopbarComponent, SidebarComponent, SpinerComponent, ReactiveFormsModule, NgbModule ],
  templateUrl: './micuenta.component.html',
  styleUrl: './micuenta.component.css'
})
export class MicuentaComponent  implements OnInit, AfterViewInit{
  @ViewChild('error') template: TemplateRef<any>;
  claveForm: FormGroup;
  miCuentaForm: FormGroup;
  modalRef: NgbModalRef;
  msg: any;
  public usuarioLogueado!: Usuario;
  public copyRigth: string = Configuraciones.kernelCopyRigth;
  public empresa: Empresa[] = []
  public usuarioConectado: Usuario[] = [];
  public usuarioCuenta: Cuenta[] = [];
  public usuarioFunciones: Funciones[] =[]
  public AppNombre = Configuraciones.appNombre;
  public detalleCtaCte: any;  // Usado para almacenar respuesta del servicio
  public cantidadMovimientos: number = 0;
  public verModarDescargaPdf: boolean = false;
  permisos: string[] = []
  public fechaHoy :Date;
  fechasIguales: boolean;
  permisoDescargaComp:string | "N" | undefined;
  tieneCtacteDolar:string | "N" | undefined;
  fechaInfoActualizacion:string | "" | undefined;
  fechaSaldoActualizacion: string | "" | undefined;
  loading = true;
  claveCambiada = false
  bgColorSideBar = "";


  // Logout Modal //
  mensajeCambioDeClave = TextosApp.mensajeCambiarClave;

  //resumen: DetalleCtaCte | undefined;
  resumen: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private styleService: StyleService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {

  }
  ngAfterViewInit() {
    // Inicializar el modal después de que la vista se haya inicializado

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
  cambiarClave() {
    if (this.claveForm.valid) {
      console.log('Formulario enviado:', this.claveForm.value);
      this.cambioDeClaveoConfirmado(this.claveForm.value.clave, this.claveForm.value.claveActual)

    } else {
      console.log('Formulario no válido');
    }
  }
  ngOnInit(): void {

    this.miCuentaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.claveForm = this.fb.group({
      clave: ['', [Validators.required, Validators.minLength(4)]],
      repiteClave: ['', [Validators.required]],
      claveActual: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator  });


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
        if (this.usuarioLogueado.cuenta.claveMarcaCambio == 0 ){
          this.claveCambiada = false;
        }else{
          this.claveCambiada = true;

        }

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
        this.miCuentaForm.patchValue({
          email:this.usuarioCuenta[0].email,
         //nombre: this.usuarioCuenta[0].nombre,
        });
        this.fechaHoy = new Date();

        this.loading = false


      } else {
        this.globalService.logout();
         this.router.navigate(['/login']);
        // Handle the null case, e.g., redirect to login
      }
    }





  }



  async cambioDeClaveoConfirmado(clave: string, claveAnterior:string) : Promise<any> {

    this.loading = true;
    setTimeout(() => {

      //this.errorMessage = ""
    }, 2000);
    try {
      this.usuarioService.cambiarClave(this.usuarioLogueado.cuenta.id, clave, claveAnterior).subscribe((response: any) => {

          let resp = response.control.descripcion;
          let codigo = response.control.codigo;

          if (codigo == "OK"){
            alert(resp)
            this.logout()
          }else{
            alert(resp)
          }
          this.loading = false;
        },
        (error: any) => {
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


  }

  mostrarConfirmacion(content: TemplateRef<any>) {
    if (this.miCuentaForm.valid) {
      this.modalRef = this.modalService.open(content, { backdrop: 'static', keyboard: false });
    } else {
      console.log('Formulario no válido');
    }
  }

  mostrarRespuesta(template: TemplateRef<any>, msg:string) {
    this.msg = msg
    this.modalRef = this.modalService.open(template, { backdrop: 'static', keyboard: false });
  }


  confirmarCambio(modal: NgbModalRef) {

    if (this.miCuentaForm.valid) {
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

   }
  }

actualizarUsuarioLogueado(email: string) {
    let usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (usuarioLogueado) {
      usuarioLogueado.email = email;  // Actualizar el correo electrónico
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
      console.log('Usuario logueado actualizado:', usuarioLogueado);
    } else {
      console.log('No se encontró el usuario logueado en el local storage');
    }
  }


async cambioDeCorreoConfirmado(correo: string) : Promise<any> {
  this.loading = true;
  setTimeout(() => {

    //this.errorMessage = ""
  }, 2000);
  try {
    this.usuarioService.cambiarCorreo(this.usuarioLogueado.cuenta.id, correo).subscribe((response: any) => {
     let resp = response.control.descripcion;
     let codigo = response.control.codigo
     this.actualizarUsuarioLogueado(correo);
     this.mostrarRespuesta(this.template, resp);
     this.loading = false;

    });



    // Handle successful login (e.g., navigate to another page)
  } catch (error: any) {

    this.loading = false;

    console.error('Login Error', error);
    //this.errorMessage = String(error);
  }


}

  logout(){
    this.router.navigate(['/logout']);


  }

  getStyleTemplate(elemento:string, propiedad:string) {

    return this.styleService.getStyleTemplate(elemento, propiedad);

  }

  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }






}
