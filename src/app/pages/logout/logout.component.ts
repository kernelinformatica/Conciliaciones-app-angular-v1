import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { GlobalService } from '../../services/global.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(private authService: LoginService, private router: Router,
    private globalService: GlobalService,) {
    let usuarioLogueado = globalService.getUsuarioLogueado();
    this.authService.logout();
    if (usuarioLogueado) { 
      window.location.href = "http://"+usuarioLogueado.empresa.dominio
    }else{
      this.router.navigate(['/login']);
    }
   
  }
}
