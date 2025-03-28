/**
* Esta clase representa un movimiento en los cereales
*/
export class MovimientoCereal {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public orden: number;
  public cerealId: string;
  public cosecha: string;
  public claseId: string;
  public tipoComprobante: string;
  public numeroComprobante: number;
  public comprobTipo: string;
  public comprobDescri:string;
  public fecha: string;
  public kilosEntrada: number;
  public kilosSalida: number;
  public kilosSaldo: number;
  //---------------------------------------------//

  // Parseo el mensaje
  constructor( mov : any) {
    this.orden = mov.orden;
    this.cerealId = mov.cerealId;
    this.cosecha = mov.cosecha;
    this.claseId = mov.claseId;
    this.tipoComprobante = mov.tipoComprobante;
    this.numeroComprobante = mov.numeroComprobante;
    this.comprobTipo = mov.comprobTipo;
    this.comprobDescri = mov.comprobDescri
    this.fecha = mov.fecha;
    this.kilosEntrada = mov.kilosEntrada;
    this.kilosSalida = mov.kilosSalida;
    this.kilosSaldo = mov.kilosSaldo;
  }

}
