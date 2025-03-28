export class TemplateEstilos {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idTemplate: number;
    public elemento : string;
    public propiedad : string;
    public valor: string;


    //---------------------------------------------//

    // Parseo el mensaje
    constructor( t : any) {
      this.idTemplate =t.idTemplate
      this.elemento = t.elemento;
      this.propiedad = t.propiedad;
      this.valor = t.valor;
    }
  }
