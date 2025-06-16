import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { GlobalService } from '../../services/global.service';
import { Usuario } from '../../models/usuario';
import { Configuraciones } from '../../../enviroments/configuraciones';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(private authService: LoginService, private router: Router,
    private globalService: GlobalService,) {
    let usuarioLogueado = globalService.getUsuarioLogueado();
    this.authService.logout();
    /*if (usuarioLogueado) {
      window.location.href = Configuraciones.dominio
    }else{
      this.router.navigate(['/login']);

    }
      */
    this.router.navigate(['/login']);

  }
}
