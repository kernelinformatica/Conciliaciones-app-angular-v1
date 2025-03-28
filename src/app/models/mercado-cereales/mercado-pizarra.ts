import { ProductosDisponible } from './productos-disponible';

export class MercadoPizarra{

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public code : number;
  public status: string;
  public detail: string;
  public author: string;
  public data: ProductosDisponible[];
  //---------------------------------------------//
  constructor(mercadoPizarra : any){
    this.code = mercadoPizarra.code ;
    this.status = mercadoPizarra.status;
    this.author = mercadoPizarra.Author;
    this.detail = mercadoPizarra.detail;
    // Inicio el arreglo
    this.data = [];
    // Lo relleno
    mercadoPizarra.data.forEach((variable: ProductosDisponible) => {
        this.data.push(variable);
    });
  }
}
