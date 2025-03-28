export class Banco {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idBanco: number;
    public nombre: string;
    public descripcion: string;
    public direccion: string;
    public telefono: string;
    public visible: boolean;
    public abreviatura: string;

    //---------------------------------------------//

    // Parseo el mensaje
    constructor( mov : Banco) {
      this.idBanco = mov.idBanco;
      this.nombre = mov.nombre;
      this.descripcion = mov.descripcion;
      this.direccion = mov.direccion;
      this.telefono = mov.telefono;
      this.visible = mov.visible;
      this.abreviatura = mov.abreviatura;
    }
  }
