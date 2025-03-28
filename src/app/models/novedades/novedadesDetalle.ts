import { NovedadesFotos } from './novedadesFotos';
import { Novedades } from './novedades';

/**
* Esta clase se creo para representar la parte novedades (noticas de la coope)
* las noticias estan en la base de la pagina web en produccion 192.168.254.249 base coope
*/

export class NovedadesDetalle {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public code : number;
  public status: string;
  public detail: string;
  public author: string;
  public data: Novedades[];
  //---------------------------------------------//
  constructor(novedadesDetalle : any){
  
 this.code = novedadesDetalle.code ;
    this.status = novedadesDetalle.status;
    this.author = novedadesDetalle.Author;
    this.detail = novedadesDetalle.detail;
    // Inicio el arreglo
    this.data = [];
    // Lo relleno
    novedadesDetalle.data.forEach(variable => {
        this.data.push(variable);
    });   
  }
}