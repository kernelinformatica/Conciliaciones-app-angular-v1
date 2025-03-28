import { Cuenta } from './cuenta';
import { MovimientoCtaCte } from './movimientoctacte';
import { Empresa } from './empresa';

/**
* Esta clase se creo para poder parsear el mensaje que se recibe del serivio web
* con el detalle de la cuenta
*/
export class DetalleCtaCte {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public cuenta : Cuenta = new Cuenta({});
  public empresa : Empresa = new Empresa({});
  public cantidadRegistros : number;
  public movimientos : MovimientoCtaCte[];
  //---------------------------------------------//

  // Parseo el mensaje
  constructor(detalle : any) {

    this.cuenta = new Cuenta(detalle.cuenta);
    this.empresa = new Empresa(detalle.empresa);
    this.cantidadRegistros = detalle.cantidadRegistros;

    // Inicio el arreglo
    this.movimientos = [];

    // Lo relleno
    detalle.movimiento.forEach((variable: MovimientoCtaCte) => {
        this.movimientos.push(variable);
    });

  }

}
