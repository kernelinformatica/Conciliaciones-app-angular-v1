
export class Control {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public codigo : number;
  public estado : string;
  public mensaje: string;

  //---------------------------------------------//

  // parseo el mensaje
  constructor(control : any){
      this.codigo = control.codigo;
      this.estado = control.estado;
      this.mensaje = control.mensaje;

  }
}
