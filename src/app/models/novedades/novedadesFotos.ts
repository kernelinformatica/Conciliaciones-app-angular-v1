/**
* Esta clase se creo para representar la fotos de las  novedades (noticas de la coope)
* las noticias estan en la base de la pagina web en produccion 192.168.254.249 base coope
*/
export class NovedadesFotos {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  
  //---------------------------------------------//
  
  public id : number;
  public ancho: string;
  public alto: number;
  public titulo: string;
  public archivo: string;
  public dominio: string;
  public principal: string;
  public tags: string;
  public kb: string;
  public fechaAlta: number;
 
  //---------------------------------------------//


  constructor(fotos : any){
    this.id = fotos.id ;
    this.ancho = fotos.ancho;
    this.alto = fotos.alto;
    this.titulo = fotos.titulo;
    this.archivo = fotos.archivo;
    this.dominio = fotos.dominio;
    this.principal = fotos.principal;
    this.tags = this.tags;
    this.kb = this.kb;
    this.fechaAlta = this.fechaAlta;
   
  }
}
