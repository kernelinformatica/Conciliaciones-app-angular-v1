import { estadoReserva } from './estadoReserva';
import { ofertaReserva } from './ofertaReserva';
import { Cuenta } from '../cuenta';

export class Reserva {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idReserva: Number;
    public cantidad: Number;
    public fechaAlta: string;
    public fechaActualizado: string;
    public observaciones: string;
    public operadorCodigo: Number;
    public visible: boolean;
    public idEstado: estadoReserva;
    public idOferta: ofertaReserva;
    public usuario: Cuenta;
    //---------------------------------------------//
  
    // Parseo el mensaje
    constructor( mov : any) {
      let [ reserva ] = mov;
      this.idReserva = reserva.idReserva;
      this.cantidad = reserva.cantidad;
      this.fechaAlta = reserva.fechaAlta;
      this.fechaActualizado = reserva.fechaActualizado;
      this.observaciones = reserva.observaciones;
      this.operadorCodigo = reserva.operadorCodigo;
      this.visible = reserva.visible;
      this.idEstado = reserva.idEstado;
      this.idOferta = reserva.idOferta;
      this.usuario.email = reserva.usuario.email;
      this.usuario.nombre = reserva.usuario.nombre;
    }
  }