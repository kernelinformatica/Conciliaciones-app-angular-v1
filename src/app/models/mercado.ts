export class Mercado {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idMercado: number;
    public coope: any;
    public descripcion: string;
    public visible: boolean;

    //---------------------------------------------//

    // Parseo el mensaje
    constructor( mov : Mercado) {
        if(mov) {
            this.idMercado = mov.idMercado;
            this.coope = mov.coope;
            this.descripcion = mov.descripcion;
            this.visible = mov.visible;
        } else {
            this.idMercado = 0;
            this.coope = 0;
            this.descripcion ="";
            this.visible = false;
        }

    }
  }
