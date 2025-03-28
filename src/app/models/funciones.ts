/*
    Esta clase sirve como modelo de las funcionalidades
    que tiene habilitadas el usuario logueado.
*/
export class Funciones {

    private listaFunciones : [string];

    constructor(listaFunciones: [string]){
        this.listaFunciones = listaFunciones;
    }

    public tieneFuncion(funcion : string) : boolean{
        return this.listaFunciones.lastIndexOf(funcion) > -1;
    }
}
