import { estadoReserva } from './../reservas/estadoReserva';
import { Cereal } from "../cereal";
import { Moneda } from "../moneda";
import { Mercado } from "../mercado";

export class OrdenVenta {
    public idOrden: number;
    public cosechaRef: string;
    public precioBase: number;
    public toneladas: number;
    public fechaVenta: Date;
    public fechaCobro: Date;
    public fechaActualizado: Date;
    public observaciones: string;
    public visible: Boolean;
    public idEstado: estadoReserva;
    public cereal: Cereal;
    public moneda: Moneda;
    public mercado: any;

    constructor(rnd: any) {
        if(rnd) {
            this.idOrden = rnd.idOrden;
            this.cosechaRef = rnd.cosechaRef;
            this.precioBase = rnd.precioBase;
            this.toneladas = rnd.toneladas;
            this.fechaVenta = rnd.fechaVenta;
            this.fechaCobro = rnd.fechaCobro;
            this.fechaActualizado = rnd.fechaActualizado;
            this.observaciones = rnd.observaciones;
            this.visible = rnd.visible;
            this.idEstado = rnd.idEstado;
            this.cereal = rnd.cereal;
            this.moneda = rnd.moneda;
            this.mercado = rnd.mercado;
        } else {
            this.idOrden = 0;
            this.cosechaRef = "";
            this.precioBase = 0;
            this.toneladas = 0;
            this.fechaVenta = new Date();
            this.fechaCobro = new Date();
            this.fechaActualizado = new Date()
            this.observaciones = '';
            this.visible = false;
            this.idEstado = rnd.estadoReserva;
            this.cereal = new Cereal(0);
            this.moneda = rnd.moneda;
            this.mercado = rnd.mercado;
        }


    }
}
