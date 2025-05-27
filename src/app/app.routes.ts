import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CuentaCorrienteComponent } from './pages/cuenta-corriente/cuenta-corriente.component';
import { AuthGuard } from './services/authguard';
import { LogoutComponent } from './pages/logout/logout.component';
import { CuentaCorrienteDolarComponent } from './pages/cuenta-corriente-dolar/cuenta-corriente-dolar.component';
import { CerealesComponent } from './pages/cereales/cereales.component';
import { FichaCerealComponent } from './pages/cereales/ficha-cereal/ficha-cereal.component';
import { FichaRomaneosPendComponent } from './pages/cereales/ficha-romaneos-pend/ficha-romaneos-pend.component';
import { MicuentaComponent } from './pages/usuarios/micuenta/micuenta.component';
import { CambiarClaveComponent } from './pages/usuarios/cambiar-clave/cambiar-clave.component';
import { RecuperarClaveComponent } from './pages/usuarios/recuperar-clave/recuperar-clave.component';
import { RecuperarClaveConfirmaComponent } from './pages/usuarios/recuperar-clave-confirma/recuperar-clave-confirma.component';
import { TesterComponent } from './pages/tester/tester.component';
import { ConciliaImportaComponent } from './pages/conciliacion/concilia-importa/concilia-importa.component';
import { ConciliaInformeComponent } from './pages/conciliacion/concilia-informe/concilia-informe.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'tester', component: TesterComponent },
  { path: 'recuperar-clave', component: RecuperarClaveComponent },
  { path: 'recuperar-clave-confirma', component: RecuperarClaveConfirmaComponent },
  { path: 'conciliacion', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'conciliacion-importar-datos', component: ConciliaImportaComponent, canActivate: [AuthGuard] },
  { path: 'cuenta-corriente', component: CuentaCorrienteComponent, canActivate: [AuthGuard]},
  { path: 'cuenta-corriente-dolar', component: CuentaCorrienteDolarComponent, canActivate: [AuthGuard]},
  { path: 'resumen-de-cereales', component: CerealesComponent, canActivate: [AuthGuard]},
  { path: 'ficha-de-cereales', component: FichaCerealComponent, canActivate: [AuthGuard]},
  { path: 'ficha-de-remitos-pendientes', component: FichaRomaneosPendComponent, canActivate: [AuthGuard]},
  { path: 'mi-cuenta', component: MicuentaComponent, canActivate: [AuthGuard]},
  { path: 'conciliacion-informe', component: ConciliaInformeComponent, canActivate: [AuthGuard]},
  { path: 'cambio-clave-de-acceso', component: CambiarClaveComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: '/login', pathMatch: 'full' },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
