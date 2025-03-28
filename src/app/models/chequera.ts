import { Banco } from "./banco";

export class Chequera {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idChequera!: number;
    public planCuenta!: number;
    public visible!: boolean;
    public idBanco!: Banco;

    //---------------------------------------------//

    // Parseo el mensaje
    constructor( mov : any) {
      if(mov) {
        this.idChequera = mov.idChequera;
        this.planCuenta = mov.planCuenta;
        this.visible = mov.visible;
        this.idBanco = mov.idBanco;

      }
    }
  }
