import { Clasificados } from './clasificados';

/**
* Esta clase se creo para representar la parte novedades (noticas de la coope)
* las noticias estan en la base de la pagina web en produccion 192.168.254.249 base coope
*/

export class ClasificadosDetalle {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public code : number;
  public status: string;
  public detail: string;
  public author: string;
  public data: Clasificados[];
  //---------------------------------------------//
  constructor(clasificadosDetalle : any){
  
    this.code = clasificadosDetalle.code ;
    this.status = clasificadosDetalle.status;
    this.author = clasificadosDetalle.Author;
    this.detail = clasificadosDetalle.detail;
    // Inicio el arreglo
    this.data = [];
    // Lo relleno
    clasificadosDetalle.data.forEach(variable => {
        this.data.push(variable);
    });   
  }
}