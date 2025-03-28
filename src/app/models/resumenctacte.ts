/**
* Esta clase se creo para representar la parte del mensaje que contiene el
* saldo de la cuenta
*/
export class ResumenCuenta {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public moneda: string;
  public saldo: number;
  public aFecha: string;
  //---------------------------------------------//

  // parseo el mensaje
  constructor(resumen : any) {
    this.moneda = resumen.moneda;
    this.saldo = resumen.saldo;
    this.aFecha = resumen.aFecha;
  }

}
