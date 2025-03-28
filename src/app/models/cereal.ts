export class Cereal {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public codigoCereal: string;
    public nombre: string;

    //---------------------------------------------//

    // Parseo el mensaje
    constructor( mov : any) {
      this.codigoCereal = mov.codigoCereal;
      this.nombre = mov.nombre;
    }
  }
