export class estadoReserva {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idEstado: Number;
    public nombre: string;
    public descripcion: string;
    public abreviatura: string;
    public hexColor: string;
    public icono: string;
    public coope: Number;
    public visible: boolean;
    public orden: number;
    //---------------------------------------------//
  
    // Parseo el mensaje
    constructor( mov : any) {
      this.idEstado = mov.idEstado;
      this.nombre = mov.nombre;
      this.descripcion = mov.descripcion;
      this.abreviatura = mov.abreviatura;
      this.hexColor = mov.hexColor;
      this.icono = mov.icono;
      this.visible = mov.visible;
      this.coope = mov.coope;
      this.orden = mov.orden;
    }
  }