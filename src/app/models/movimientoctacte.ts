/**
* Esta clase se creo para reprensentar los movimientos de la cuenta corriente
*/
export class MovimientoCtaCte {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public orden : Number;
  public vencimiento: string;
  public ingreso: string;
  public detalle: string;
  public concepto: string;
  public numero: Number;
  public numeroInterno: Number;
  public importeDebe: number;
  public importeHaber: number;
  public importeSaldo: number;
  public historico: string;
  public control: string;
  //---------------------------------------------//

  // Parseo el mensaje
  constructor( mov : any) {
    this.orden = mov.orden;
    this.vencimiento = mov.vencimiento;
    this.ingreso = mov.ingreso;
    this.detalle = mov.detalle;
    this.concepto = mov.concepto;
    this.numero = mov.numero;
    this.numeroInterno = mov.numeroInterno;
    this.importeDebe = mov.importeDebe;
    this.importeHaber = mov.importeHaber;
    this.importeSaldo = mov.importeSaldo;
    this.historico = mov.historico;
    this.control = mov.control;
  }
}
