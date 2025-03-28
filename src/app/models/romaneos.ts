export class Romaneos {
    public fehca: String;
    public bruto: number;
    public tara: number;
    public humedad: number;
    public mermas: number;
    public neto: number;
    public saldo: String;
    public cp: String;

    constructor( mov : any) {
        this.fehca = mov.fecha;
        this.bruto = mov.bruto;
        this.tara = mov.tara;
        this.humedad = mov.humedad;
        this.mermas = mov.mermas;
        this.neto = mov.neto;
        this.saldo = mov.saldo;
        this.cp = mov.cp;
    }
}