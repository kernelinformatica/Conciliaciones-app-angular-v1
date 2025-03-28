export class ofertaReserva {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idOferta: Number;
    public titulo: string;
    public detalle: string;
    public coope: Number;
    public articuloCodigo: string;
    public verPrecio: boolean;
    public estado: boolean;
    public visible: boolean;
    //---------------------------------------------//
  
    // Parseo el mensaje
    constructor( mov : any) {
      this.idOferta = mov.idOferta;
      this.titulo = mov.titulo;
      this.detalle = mov.detalle;
      this.coope = mov.coope;
      this.articuloCodigo = mov.articuloCodigo;
      this.verPrecio = mov.verPrecio;
      this.estado = mov.estado;
      this.visible = mov.visible;
    }
  }