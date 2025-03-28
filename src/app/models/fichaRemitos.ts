import { RubroCtacte } from "./rubroCtacte";

export class FichaRemitos {

    fecha: String;
    descripcion: String;
    descripcion2: String;
    r1KilosSinCer: Number;
    r1KilosCer: Number;
    r2Punto: Number;
    r2Cantidad: Number;
    idRubroCtacte: RubroCtacte;

    constructor(total : any) {
        this.fecha = total.fecha;
        this.descripcion = total.descripcion;
        this.descripcion2 = total.descripcion2;
        this.r1KilosSinCer = total.r1KilosSinCer;
        this.r1KilosCer = total.r1KilosCer;
        this.r2Punto = total.r2Punto;
        this.r2Cantidad = total.r2Cantidad;
        this.idRubroCtacte = total.idRubroCtacte;

    }
}