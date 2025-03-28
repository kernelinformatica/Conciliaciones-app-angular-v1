/**
* Esta clase se creo para representar la parte del mensaje que contiene el
* el total de cada cereal
*/
export class TotalCereal {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  cereal: string;
  cerealId: string;
  claseId: string;
  cosecha: string;
  clase: string;
  kilosACertificar: number;
  kilosCertificados: number;
  kilosTotales: number;
  //---------------------------------------------//

  constructor(total : any) {
    this.cereal = total.cereal;
    this.cerealId = total.cerealId;
    this.claseId = total.claseId;
    this.cosecha = total.cosecha;
    this.kilosACertificar = total.kilosACertificar;
    this.clase = total.clase;
    this.kilosCertificados = total.kilosCertificados;
    this.kilosTotales = total.kilosTotales;
  }

}
