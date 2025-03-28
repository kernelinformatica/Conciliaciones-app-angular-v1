import { ClasificadosFotos } from './clasificadosFotos';
/**
* Esta clase se creo para representar la parte novedades (noticas de la coope)
* las noticias estan en la base de la pagina web en produccion 192.168.254.249 base coope
*/

export class Clasificados {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public id : number;
  public idTipo: number;
  public tipoNombre: string;
  public idRubro: number;
  public nombreTipo: string;
  public rubro: string;
  public email: string;
  public telefono: string;
  public subRubroNombre: string;
  public idSubRubro: number;
  public tituloClasificado: string;
  public fechaClasificado: string;
  public resumenClasificado: string;
  public estado: number;
  public descripcionClasificado: string;
  public FotoPrincipal: ClasificadosFotos;
  public FotosAlternativas: ClasificadosFotos[];


  //---------------------------------------------//
//code":1,"status":200,"detail":"Retorna las noticias activas de la cooperativa","Author":"Kernel Inform\u00e1tica: Cooperativa de Trabajo Ltda
  constructor(clasificados : any){
    let [ clasificado ] = clasificados;
    this.id  = clasificado.id;
    this.idTipo = clasificado.idTipo;
    this.tipoNombre = clasificado.tipoNombre;
    this.idRubro = clasificado.idRubro;
    this.nombreTipo = clasificado.nombreTipo;
    this.rubro = clasificado.rubro;
    this.email = clasificado.email;
    this.telefono = clasificado.telefono;
    this.subRubroNombre = clasificado.subRubroNombre;
    this.idSubRubro = clasificado.idSubRubro;
    this.tituloClasificado = clasificado.tituloClasificado;
    this.fechaClasificado = clasificado.fechaClasificado;
    this.resumenClasificado = clasificado.resumenClasificado;
    this.estado = clasificado.estado;
    this.descripcionClasificado = clasificado.descripcionClasificado;
    this.FotoPrincipal = clasificado.FotoPrincipal;
    this.FotosAlternativas = [];
    if(clasificado.fotosAlternativas) {
        clasificado.fotosAlternativas.forEach(variable => {
            this.FotosAlternativas.push(variable);
        });
    }
  }
}