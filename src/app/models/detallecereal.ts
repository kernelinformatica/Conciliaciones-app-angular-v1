//import { Romaneos } from './romaneos';
import { Cuenta } from './cuenta';
import { MovimientoCereal } from './movimientocereal';
import { Empresa } from './empresa';

/**
* Esta clase se creo para poder parsear el mensaje que se recibe del serivio web
* con el detalle de los movimientos de cereales de la cuenta
*/
export class DetalleCereal {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public cuenta : Cuenta = new Cuenta({});
  public empresa : Empresa = new Empresa({});
  public cantidadRegistros : number;
  public movimientos : MovimientoCereal[];
  //public romaneos : Romaneos[];
  //---------------------------------------------//

  // Parseo el mensaje
  constructor(detalle : any) {

    this.cuenta = new Cuenta(detalle.cuenta);
    this.empresa = new Empresa(detalle.empresa)
    this.cantidadRegistros = detalle.cantidadRegistros;

    // Inicio el arreglo
    this.movimientos = [];
//    this.romaneos = [];

    // Lo relleno
    detalle.movimiento.forEach((variable: MovimientoCereal) => {
        this.movimientos.push(variable);
    });

  /*  detalle.romaneo.forEach((element: Romaneos) => {
      this.romaneos.push(element);
    });
*/
  }
}
