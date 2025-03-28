export class ClasificadosFotos {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    
    //---------------------------------------------//
    
    public id : number;
    public ancho: string;
    public alto: number;
    public titulo: string;
    public archivo: string;
    public size: string;
    public fecha: string;
    public tipo: number;
   
    //---------------------------------------------//
    
    constructor(fotos : any){
      this.id = fotos.id ;
      this.ancho = fotos.ancho;
      this.alto = fotos.alto;
      this.titulo = fotos.titulo;
      this.archivo = fotos.archivo;
      this.size = fotos.size;
      this.fecha = fotos.fecha;
      this.tipo = fotos.tipo;
    }
  }