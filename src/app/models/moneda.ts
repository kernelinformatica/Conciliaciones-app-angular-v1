export class Moneda {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idMoneda: number;
    public coope: any;
    public descripcion: string;
    public abreviatura: string;
    public visible: boolean;

    //---------------------------------------------//

    // Parseo el mensaje
    constructor( mov : Moneda) {
        if(mov) {
            this.idMoneda = mov.idMoneda;
            this.abreviatura = mov.abreviatura;
            this.coope = mov.coope;
            this.descripcion = mov.descripcion;
            this.visible = mov.visible;
        } else {
            this.idMoneda = 0;
            this.coope = 0;
            this.descripcion = "";
            this.abreviatura = "";
            this.visible = false;
        }
    }
  }
