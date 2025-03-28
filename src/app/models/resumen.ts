import { Empresa } from './empresa';
import { Cuenta } from './cuenta';
import { TotalCereal } from './totalcereal';
import { ResumenCuenta } from './resumenctacte';
import { FichaRemitos } from "./fichaRemitos";
import { RubroCtacte } from "./rubroCtacte";

/**
* Esta clase se creo para poder parsear el mensaje que se recibe del serivio web
* para el resumen de cuenta
*/
export class Resumen {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public empresa : Empresa = new Empresa({});
  public cuenta : Cuenta = new Cuenta({});
  public ultimaActualizacion : Date;
  public resumenesCtaCte : ResumenCuenta[];
  public resumenCereal : TotalCereal[];
  public fichaRemito : FichaRemitos[];
  public idRubroCtacte : RubroCtacte = new RubroCtacte({});

  //---------------------------------------------//

  // Parseo el mensaje
  constructor(data : any) {
    this.ultimaActualizacion = data.ultimaActualizacion;
    this.empresa = new Empresa(data.empresa);
    this.cuenta = new Cuenta(data.cuenta);
    this.ultimaActualizacion = new Date(data.ultimaActualizacion);
    // Inicio el arreglo
    this.resumenesCtaCte = [];

    // Lo relleno
    data.resumenCtaCte.forEach((variable: ResumenCuenta) => {
        this.resumenesCtaCte.push(variable);
    });

    // Inicio el arreglo
    this.resumenCereal = [];

    // Lo relleno
    data.resumenCereal.forEach((variable: TotalCereal) => {
        this.resumenCereal.push(variable);
    });

    this.fichaRemito = [];

    data.fichaRemito.forEach((variable: FichaRemitos) => {
      this.fichaRemito.push(variable)
    });

  }


  public get fechaActualizacion() : string {
    return this.ultimaActualizacion.toLocaleDateString() + " " + this.ultimaActualizacion.toLocaleTimeString();
  }
}
