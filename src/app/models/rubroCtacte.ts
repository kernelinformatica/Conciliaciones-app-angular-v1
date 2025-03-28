export class RubroCtacte {
    idRubroCtacte : Number;
    nombre : String;

    constructor(data: { idRubroCtacte?: any; nombre?: any; }) {
        this.idRubroCtacte = data.idRubroCtacte;
        this.nombre = data.nombre;
    }
}
