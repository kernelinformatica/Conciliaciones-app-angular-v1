import { Cuenta } from './cuenta';
import { MovimientoCtaCteDolar } from './movimientoctactedolar';
import { Empresa } from './empresa';

/**
* Esta clase se creo para poder parsear el mensaje que se recibe del serivio web
* con el detalle de la cuenta
*/
export class DetalleCtaCteDolar {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public cuenta : Cuenta = new Cuenta({});
  public empresa : Empresa = new Empresa({});
  public cantidadRegistros : number;
  public movimientos : MovimientoCtaCteDolar[];
  //---------------------------------------------//

  // Parseo el mensaje
  constructor(detalle : any) {

    this.cuenta = new Cuenta(detalle.cuenta);
    this.empresa = new Empresa(detalle.empresa);
    this.cantidadRegistros = detalle.cantidadRegistros;

    // Inicio el arreglo
    this.movimientos = [];

    // Lo relleno
    detalle.movimiento.forEach((variable: MovimientoCtaCteDolar) => {
        this.movimientos.push(variable);
    });

  }

}
