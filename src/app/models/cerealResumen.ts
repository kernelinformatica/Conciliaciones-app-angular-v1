import { CerealResumenPK } from './cerealResumenPK';
import { Cereal } from './cereal';

export class CerealResumen {
    public cerealResumenPK: CerealResumenPK;
    public orden: number;
    public cerealDescri: string;
    public claseDescri: string;
    public kilos1: number;
    public kilos2: number;
    public marca: string;
    public cereal: Cereal;

    constructor(rnd: any) {
        this.cerealResumenPK = rnd.cerealResumenPK;
        this.orden = rnd.orden;
        this.cerealDescri = rnd.cerealDescri;
        this.claseDescri = rnd.claseDescri;
        this.kilos1 = rnd.kilos1;
        this.kilos2 = rnd.kilos2;
        this.marca = rnd.marca;
        this.cereal = rnd.cereal;
    }
}
