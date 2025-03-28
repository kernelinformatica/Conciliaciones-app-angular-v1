import { Banco } from "./banco";

export class CbuPadron {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idCbuPadron: number;
    public cbu: string;
    public visible: boolean;
    public banco: Banco;

    //---------------------------------------------//
  
    // Parseo el mensaje
    constructor( mov : any) {
      this.idCbuPadron = mov.idCbuPadron;
      this.cbu = mov.cbu;
      this.visible = mov.visible;
      this.banco = mov.banco;
    }
  }