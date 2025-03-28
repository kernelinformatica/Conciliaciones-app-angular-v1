export class TransaccionFondos {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idTransaccion: number;
    public nombre: string;
    public descripcion: string;
    public visible: boolean;

    //---------------------------------------------//
  
    // Parseo el mensaje
    constructor( mov : any) {
      this.idTransaccion = mov.idTransaccion;
      this.nombre = mov.nombre;
      this.descripcion = mov.descripcion;
      this.visible = mov.visible;
    }
  }