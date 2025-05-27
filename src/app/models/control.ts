
export class Control {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public codigo : string;
  public estado : string;
  public mensaje: string;
  public descripcionLarga: string;
  public version: string;
  public versionLib : string;
  //---------------------------------------------//

  // parseo el mensaje
  constructor(control : any){
      this.codigo = control.codigo;
      this.estado = control.estado;
      this.mensaje = control.mensaje;
      this.descripcionLarga = control.email;
      this.version = control.version;
      this.versionLib = control.versionLib;
  }
}
