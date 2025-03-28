import { Cereal } from './../cereal';

export class OrdenesPizarra {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idPizarra: Number;
    public fechaIngreso: string;
    public precioPizarra: number;
    public cerealCodigo: Cereal;
    public coope: string;
    public visible: boolean;
    //---------------------------------------------//
  
    // Parseo el mensaje
    constructor( mov : any) {
      this.idPizarra = mov.idPizarra;
      this.fechaIngreso = mov.fechaIngreso;
      this.precioPizarra = mov.precioPizarra;
      this.cerealCodigo = mov.cerealCodigo;
      this.coope = mov.coope.coope;
      this.visible = mov.visible;
    }
  }