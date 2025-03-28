
export class CerealResumenPK {
    public coope: string;
    public cuenta: string;
    public cerealCodigo: string;
    public cosecha: string;
    public claseCodigo: string;
    
    constructor(rnd: any) {
        this.coope = rnd.coope;
        this.cuenta = rnd.cuenta;
        this.cerealCodigo = rnd.cerealCodigo;
        this.cosecha = rnd.cosecha;
        this.claseCodigo = rnd.claseCodigo;
    }
}