import { CbuPadron } from "../cbuPadron";
import { estadoReserva } from "../reservas/estadoReserva";
import { TransaccionFondos } from "./transaccion-fondos";
import { Chequera } from "../chequera";
import { Sucursal } from "../sucursal";
import { TipoTransaccion } from "./tipo-transaccion";

export class SolicitudFondos {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idFondos!: number;
    public fechaCobro!: Date;
    public fechaSolicitud!: Date;
    public importe!: number;
    public fechaActualizado!: Date;
    public visible!: boolean;
    public destinoCbuPadron!: CbuPadron;
    public idEstado!: estadoReserva;
    public tipoTransaccion!: TipoTransaccion;
    public idChequera: Chequera = new Chequera({});
    public sucursal!: Sucursal;
    public observacion!: string;


    //---------------------------------------------//

    // Parseo el mensaje
    constructor( mov : any) {
      if(mov) {
        this.idFondos = mov.idFondos;
        this.fechaCobro = mov.fechaCobro;
        this.fechaSolicitud = mov.fechaSolicitud;
        this.importe = mov.importe;
        this.fechaActualizado = mov.fechaActualizado;
        this.visible = mov.visible;
        this.destinoCbuPadron = mov.destinoCbuPadron;
        this.idEstado = mov.idEstado;
        this.tipoTransaccion = mov.tipoTransaccion;
        this.idChequera = mov.idChequera;
        this.sucursal = mov.sucursal;
        this.observacion = mov.observacion;

      }

    }
  }
