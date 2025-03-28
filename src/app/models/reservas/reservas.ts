import { Reserva } from './reserva';

export class Reservas {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public arrayReservas: Reserva[];
    //---------------------------------------------//
  
    constructor( reservas : any) {
      this.arrayReservas = [];
      reservas.forEach(element => {
          this.arrayReservas.push(element);
      });
    }
  }