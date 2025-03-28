import { NovedadesFotos } from './../novedades/novedadesFotos';
//                               ^ salimo y volvemo a entrar x las dudas

/**
* Esta clase se creo para representar la parte novedades (noticas de la coope)
* las noticias estan en la base de la pagina web en produccion 192.168.254.249 base coope
*/

export class Novedades {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public id : number;
  public titulo: string;
  public idSeccion: number;
  public resumen: string;
  public resumenExtendido: string;
  public descripcion: string;
  public tipo: string;
  public seccion: string;
  public categoria: number;
  public fechaInicio: string;
  public fechaFin:string;
  public horaNoticia: string;
  public fechaNoticia: string;
  public comentarios: string;
  public linkExterno: string;
  public fotos: NovedadesFotos[];


  //---------------------------------------------//
//code":1,"status":200,"detail":"Retorna las noticias activas de la cooperativa","Author":"Kernel Inform\u00e1tica: Cooperativa de Trabajo Ltda
  constructor(novedades : any){
    let [ novedad ] = novedades;
    this.id = novedad.id;
    this.titulo = novedad.titulo;
    this.idSeccion = novedad.idSeccion;
    this.resumen = novedad.resumen;
    this.resumenExtendido = novedad.resumenExtendido;
    this.descripcion =  novedad.descripcion;
    this.tipo = novedad.tipo;
    this.seccion = novedad.seccion;
    this.categoria = novedad.categoria;
    this.fechaInicio = novedad.fechaInicio;
    this.fechaFin = novedad.fechaFin;
    this.horaNoticia = novedad.horaNoticia;
    this.fechaNoticia = novedad.fechaNoticia;
    this.comentarios = novedad.comentarios;
    this.linkExterno = novedad.linkExterno;
    this.fotos = [];
    novedad.fotos.forEach(variable => {
      this.fotos.push(variable);
  });
    
   
    

   
  }
}
