import { TransaccionFondos } from "./transaccion-fondos";

export class TipoTransaccion {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idTipoTransaccion: number;
    public idTransaccion: TransaccionFondos;
    public nombre: string;
    public descripcion: string;
    public visible: boolean;

    //---------------------------------------------//
  
    // Parseo el mensaje
    constructor( mov : any) {
      this.idTipoTransaccion = mov.idTipoTransaccion;
      this.idTransaccion = mov.idTransaccion;
      this.nombre = mov.nombre;
      this.descripcion = mov.descripcion;
      this.visible = mov.visible;
    }
  }