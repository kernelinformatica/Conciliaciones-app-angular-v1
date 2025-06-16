import { UiService } from './../../services/ui.service';
import { Injectable, TemplateRef} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Notificaciones } from '../../models/notificaciones';
import { StyleService } from '../../services/sytle.service';
import { Configuraciones } from '../../../enviroments/configuraciones';
import { TextosApp } from '../../../enviroments/textos-app';
import { GlobalService } from '../../services/global.service';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  imports: [CommonModule],
  templateUrl : "notificaciones.component.html",
 styleUrls: ['./notificaciones.component.css']


})
export class NotificacionesComponent implements OnInit  {

  icono: string = "icon-circle bg-primary";
  cambioClave:any;
  bgHeadersColor:any;
  notificaciones: Notificaciones[] = [];
  loading: Boolean = false;
  cantidadMensajes : number = 0;
  cantidadMensajesVistos : number = 0;
  cantidadMensajesNuevos: number = 0;

  selectedItem: any;
  timerSubscription: Subscription;
  modalRef: NgbModalRef;
  constructor(private notificacionesService: NotificacionesService, private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private globalService: GlobalService,
        private styleService: StyleService,
        private utilsService: UiService,
        private modalService: NgbModal,
  ) {}


  ngOnInit() {

    const usuarioLogueado = this.globalService.getUsuarioLogueado()
    this.cambioClave = usuarioLogueado["marca_cambio"]
    this.bgHeadersColor = this.styleService.getStyleTemplate('navbar-nav', 'background-color')
    this.notificacionesService.notificaciones$.subscribe(not => {
      this.notificaciones = not;
    });


    this.timerSubscription = interval(Configuraciones.intervaloDeAutoActualizacionNotificaciones)
    .pipe(switchMap(() => this.notificacionesService.getNotificaciones()))
    .subscribe(
      (data) => {
        //this.notificaciones = data;
        this.traerNotificaciones("ngONInit")
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );






  }


  ngAfterViewInit() {
   this.traerNotificaciones("ngAferInit");

  }

  getStyleTemplate(elemento:string, propiedad:string) {

    return this.styleService.getStyleTemplate(elemento, propiedad);

  }

mostrarMensaje(content: TemplateRef<any>, item) {
  this.selectedItem = item
  this.modalRef = this.modalService.open(content, { backdrop: 'static', keyboard: false, centered: true});
  ;
  }
marcarComoBorrado(notificacion: any, event: Event, content) {
    event.stopPropagation();

    notificacion.visible = false;
    notificacion.loading = true;

      try {
        this.loading = true;
        this.notificacionesService.borrarNotificacion(notificacion.idMensaje).subscribe((response: any) => {
          if (response.control.codigo =="OK"){
            this.traerNotificaciones("marcarComoBorrado");
          }else{
            alert(response.control.descripcion)
          }

          this.cantidadMensajes = response.datos.mensajes.length
          this.cantidadMensajesVistos = this.notificaciones.filter(notificacion => !notificacion.visto).length;
          this.cantidadMensajesNuevos = this.cantidadMensajes - this.cantidadMensajesVistos
          notificacion.loading = false;


        });




        // Handle successful login (e.g., navigate to another page)
      } catch (error: any) {

        this.loading = false;

        console.error('Login Error', error);
        //this.errorMessage = String(error);
      }

  }


marcarComoLeido(notificacion, visto) {

    notificacion.visto = visto;
    this.loading = true;

      try {

        if (notificacion.visto == true){

          this.notificacionesService.setClavarElVisto(notificacion.idMensaje).subscribe((response: any) => {
            this.cantidadMensajesVistos = this.notificaciones.filter(notificacion => !notificacion.visto).length;
            this.traerNotificaciones("marcarComoLeido");
         });
        }




        // Handle successful login (e.g., navigate to another page)
      } catch (error: any) {

        this.loading = false;

        console.error('Login Error', error);
        //this.errorMessage = String(error);
      }

  }

  async traerNotificaciones(origen): Promise<any> {

    this.loading = true;
      setTimeout(() => {
        //this.loading = false;
        //this.errorMessage = ""
      }, 5000);
      try {

       /* this.notificacionesService.getNotificaciones().subscribe((response: any) => {
          this.notificaciones = response.datos.mensajes
          this.cantidadMensajes = response.datos.mensajes.length
          this.cantidadMensajesVistos = this.notificaciones.filter(notificacion => !notificacion.visto).length;
          this.cantidadMensajesNuevos = this.cantidadMensajes - this.cantidadMensajesVistos

          this.loading = false

        });*/



        // Handle successful login (e.g., navigate to another page)
      } catch (error: any) {

        this.loading = false;

        console.error('Login Error', error);
        //this.errorMessage = String(error);
      }




  }





  removeNotification(id: number) {
    this.notificacionesService.eliminiarNotificacion(id);
  }
}
