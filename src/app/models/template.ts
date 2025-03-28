import { TemplateEstilos } from "./template-estilos";
export class Template {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idTemplate: number;
    public descripcion: string;
    public nombre : string;
    public estilos: TemplateEstilos[];


    //---------------------------------------------//

    // Parseo el mensaje
    constructor( t : any) {
      this.idTemplate =t.idTemplate
      this.descripcion = t.descripcion;
      this.nombre = t.nombre;
      this.estilos = []
      t.estilos.forEach((variable: TemplateEstilos) => {
        this.estilos.push(variable);
    });

    }
  }
