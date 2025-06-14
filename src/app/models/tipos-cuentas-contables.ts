
export class TipoCuentasContables {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public id: number;
    public tipo_cuenta: number;
    public descripcion: string;
    public plan_cuentas : string;




    //---------------------------------------------//

    // Parseo el mensaje
    constructor( t : any) {
      this.id =t.id
      this.tipo_cuenta = t.tipo_cuenta;
      this.descripcion = t.descripcion;
      this.plan_cuentas = t.plan_cuentas;

    }
  }
