import { Routes, RouterModule }  from '@angular/router';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
     
    ]
   }

];

export class LoginRoutingModule {}
