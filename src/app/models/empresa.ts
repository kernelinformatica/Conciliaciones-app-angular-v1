/**
* Esta clase se creo para representar la parte del mensaje que contiene los
* datos de la empresa
*/
export class Empresa{

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public id : string;
  public nombre : string;
  public clientePropio : string;
  public cuit : string;
  public descripcion: string;
  public domicilio: string;
  public prefijo: string;
  public dominio : string;
  public email : string;
  public cliHash : string;





  //---------------------------------------------//

  // parseo el mensaje
  constructor( empresa:any ){
    this.id = empresa.id;
    this.nombre = empresa.nombre;
    this.clientePropio = empresa.clientePropio;
    this.cuit = empresa.cuit;
    this.descripcion = empresa.descripcion;
    this.domicilio = empresa.domicilio;
    this.prefijo = empresa.prefijo;
    this.dominio = empresa.dominio;
    this.email = empresa.email;
    this.cliHash = empresa.cliHash;
    


  }
}
