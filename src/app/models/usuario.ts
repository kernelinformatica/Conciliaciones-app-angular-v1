import {Control } from './control';
import {Empresa} from './empresa';
import {Cuenta} from './cuenta';
import {Token} from './token'
import {Funciones} from './funciones';

/**
* Esta clase se creo para representar el usuario y su token
*/
export class Usuario {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//

  //public control: Control;
  public control :Control;
  public empresa : Empresa;
  public cuenta : Cuenta;
  public token : Token;
  public funciones : Funciones;
  //---------------------------------------------//

  // parseo el mensaje
  constructor(usuario : any) {
    this.control = new Control (usuario.control);
    this.empresa = new Empresa(usuario.empresa);
    this.cuenta = new Cuenta(usuario.cuenta);
    this.token = new Token(usuario.token);
    this.funciones = new Funciones(usuario.funciones);

    /*cambioClaveMarca
:
1
email
:
"diegodorsch@gmail.com"
fecha
:
"2024-12-10"
id
:
"1100302"
nombre
:
"MULLER CARLOS ALFREDO"
saldoDolar
:
0
saldoPesos
:
46416396.02
tipoUsuario
:
3*/
  }
}
