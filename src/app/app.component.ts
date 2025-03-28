import { UiService } from './services/ui.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from './services/sidebar.service';
import { NotificacionesService } from './services/notificaciones.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private sidebarService: SidebarService, private notificacionesService: NotificacionesService, private uiService : UiService) {}
  ngOnInit(): void {
    /*this.addTestNotification("Esto una info general", "hola esta es la descripcion", "info")
    this.addTestNotification("Error de algun tipo", "hola esta es la descripcio de saldo actualizado", "danger")
    this.addTestNotification("Esto es algo satifactorio", "hola esta es la descripcion", "success")
    this.addTestNotification("Ingreso a planta a descargar", "hola esta es la descripcio de saldo actualizado", "ingreso-planta")
    this.addTestNotification("Información actualizada", "Sus datos se encuentra actualizados hasta el dia xxxx a las 12.00", "update")*/

  }

  title = 'GestagroExtranet V2';

  addTestNotification(titulo, descri, tipo) {
   let hoy = this.uiService.fechasFormatos(Date.now(), 0,1)
    this.notificacionesService.agregarNotificacion({
      idMensaje: Date.now(),
      parametros1: 'param1',
      parametros2: 'param2',
      visible: true,
      parametros3: 'param3',
      idNotificacion: 1,
      tipo: tipo,
      visto: false,
      fechaEnvio:hoy,
      fechaVisto: null,
      titulo: titulo,
      mensaje: descri,
      loading : false

    });

}

}
