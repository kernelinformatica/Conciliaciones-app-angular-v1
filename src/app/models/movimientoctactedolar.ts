/**
* Esta clase se creo para reprensentar los movimientos de la cuenta corriente
*/
export class MovimientoCtaCteDolar {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public orden : Number;
  public vencimiento: string;
  public ingreso: string;
  public detalle: string;
  public concepto: string;
  public numero: String;
  public importeDebe: number;
  public importeHaber: number;
  public importeSaldo: number;
  public historico: string;
  public numeroInterno:String;
  public idTipoComprobante: String;
  public nombreTipoComprobante: String;
  public control: Date;
  //---------------------------------------------//

  // Parseo el mensaje
  constructor( mov : any) {
    this.orden = mov.orden;
    this.vencimiento = mov.vencimiento;
    this.ingreso = mov.ingreso;
    this.detalle = mov.detalle;
    this.concepto = mov.concepto;
    this.numero = mov.numero;
    this.importeDebe = mov.importeDebe;
    this.importeHaber = mov.importeHaber;
    this.importeSaldo = mov.importeSaldo;
    this.historico = mov.historico;
    this.numeroInterno = mov.numeroInterno;
    this.idTipoComprobante = mov.idTipoComprobante;
    this.nombreTipoComprobante = this.nombreTipoComprobante;
    this.control = mov.control
  }
}
