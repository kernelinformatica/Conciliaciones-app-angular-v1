export class Sucursal {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idSucursal: number;
    public nombre: string;
    public direccion: string;
    public localidadPcia: string;
    public visible: boolean;

    //---------------------------------------------//
  
    // Parseo el mensaje
    constructor( mov : any) {
      this.idSucursal = mov.idSucursal;
      this.nombre = mov.nombre;
      this.direccion = mov.direccion;
      this.localidadPcia = mov.localidadPcia;
      this.visible = mov.visible;
    }
  }