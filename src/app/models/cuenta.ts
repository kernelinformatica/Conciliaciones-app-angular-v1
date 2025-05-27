/**
* Esta clase se creo para representar la par;te del mensaje que contiene los
* datos de la cuenta
*/
export class Cuenta {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public id : string | undefined;
  public nombre: string | undefined;
  public email: string | undefined;
  public tipoUsuario: number | 0;
  public tipoUsuarioNombre: string | undefined;
   public fecha: Date;
  public ultActualizacion: string | "";
  public claveMarcaCambio: number | 0;

  //---------------------------------------------//

  // parseo el mensaje
  constructor(cuenta : any){
      this.id = cuenta.id;
      this.email = cuenta.email;
      this.nombre = cuenta.nombre;
      this.tipoUsuario= cuenta.tipoUsuario;
      this.fecha = cuenta.fecha;
      this.tipoUsuarioNombre = cuenta.tipoUsuarioNombre;
      this.claveMarcaCambio = cuenta.cambioClaveMarca;
      this.ultActualizacion = cuenta.ultActualizacion

  }
}
