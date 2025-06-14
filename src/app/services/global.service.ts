// src/app/global.service.ts
import { Injectable, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { Configuraciones } from '../../enviroments/configuraciones';
import { Template } from '../models/template';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private empresa: any = null;
  private usuarioLogueado: any = null;
  public servicioDisponible = false;
  public templateActivo: Template | undefined;


  constructor(private http: HttpClient) {

  }

  /*

  Empresa

  */
  setEmpresa(data: any): void {

    localStorage.setItem("empresa", JSON.stringify(data));
  }

  getEmpresa(): any {
    const empresa = localStorage.getItem('empresa');
    return  empresa ? JSON.parse(empresa) : null;
  }



  /*

  Status Servicio web

  */

  setStatusServicioRest(data: any): void {
    this.servicioDisponible = data;
  }

  getStatusServicioRest(): any {
    return this.servicioDisponible;
  }

  clearStatusServicioRest(): void {
    this.servicioDisponible = false;

  }

  // template activo ///
  settemplateActivo(data:any):void{
    localStorage.setItem("templateActivo", JSON.stringify(data));

  }
  getTemplateActivo(): any{
    const template = localStorage.getItem('templateActivo');
    return  template ? JSON.parse(template) : null;
  }




  /*

  Usuario Logueado

  */
  setUsuarioLogueado(data: any): void{
    localStorage.setItem("usuarioLogueado", JSON.stringify(data));

  }

  getUsuarioLogueado(): any  {
    const usuario = localStorage.getItem('usuarioLogueado');
    return usuario ? JSON.parse(usuario) : null;
  }

  /*

  permisos de menus y de descarga de archivos

  */
  setPermisos(data: any): any{
    localStorage.setItem("permisos", JSON.stringify(data));
  }
  getPermisos(): any  {
    const permisos = localStorage.getItem('permisos');
    return permisos ? JSON.parse(permisos) : null;
  }

  getPermisoCtaCte(): any {
    const permisos = localStorage.getItem('permisos');

    const permisosArray = permisos ? JSON.parse(permisos) : [];
    return permisosArray.find(permiso => permiso === "detalleCtaCte");
  }
  getPermisoCereales(): any {
    const permisos = localStorage.getItem('permisos');

    const permisosArray = permisos ? JSON.parse(permisos) : [];
    return permisosArray.find(permiso => permiso === "resumenCereal");
  }
  getPermisoFichaRemitos(): any {
    const permisos = localStorage.getItem('permisos');
    const permisosArray = permisos ? JSON.parse(permisos) : [];
    return permisosArray.find(permiso => permiso === "fichaRemitos");

  }
  getPermisoCtaCteUDolar(): any {
    const permisos = localStorage.getItem('permisos');

    const permisosArray = permisos ? JSON.parse(permisos) : [];
    return permisosArray.find(permiso => permiso === "detalleCtaCteDolar");
  }
  getPermisoDescargaComprobantes(): any {
    const permisos = localStorage.getItem('permisos');
    const permisosArray = permisos ? JSON.parse(permisos) : [];
    return permisosArray.find(permiso => permiso === "resuCtacteDescargaComp");

  }
  getPermisoDescargaComprobantesCereales(): any {
    const permisos = localStorage.getItem('permisos');
    const permisosArray = permisos ? JSON.parse(permisos) : [];
    return permisosArray.find(permiso => permiso === "fichaCerealDescargaComp");

  }
  getPermisoDescargaComprobantesDolar(): any {
    const permisos = localStorage.getItem('permisos');
    const permisosArray = permisos ? JSON.parse(permisos) : [];
    return permisosArray.find(permiso => permiso === "resuCtacteDescargaCompUss");

  }

  getPermisoPendienteFacturar():any{
    const permisos = localStorage.getItem('permisos');
    const permisosArray = permisos ? JSON.parse(permisos) : [];
    return permisosArray.find(permiso => permiso === "comprobantesPendientesFacturar");
  }
  getPermisoIvaPendiente(): any {
    const permisos = localStorage.getItem('permisos');
    const permisosArray = permisos ? JSON.parse(permisos) : [];
    return permisosArray.find(permiso => permiso === "resuCtaCteDolarIvaPendiente");

  }

  getPermisoLogueoCLiente(cliente) : any{
    let empresa = this.getEmpresa()

      if (cliente === empresa.id){
        return true;
      }else{
        return false;
      }

  }
esImportePositivo(importe: number): boolean {
    return importe > 0;
}

esImporteNegativo(importe: number): boolean {
    return importe < 0;
}

getPermisoTipoComprobantesPermitidosDolar(item):any{
  let importe = item.importeDebe+item.importeHaber

  if (item.detalle == "MOVIMIENTOS" && item.concepto == "DIFERIDOS"){
    // Son Pesifcaciones de dolares, que no llevan comprobantes para Descargar
    return false;
  }else{
    if (item.concepto == "TICKETS"){
      return false
    }else{
      if(item.numero == "."){
        return false
      }else{
        return true
      }

    }
    //return this.esImportePositivo(importe);

  }


  importe = 0

}
getPermisoTipoComprobantesPermitidosCereales(item){

if (item.numeroComprobante == 0 || item.numeroComprobante == null || item.numeroComprobante == "" ){
     return false;

  }else{
    const fechaComparar = new Date(Configuraciones.fechaTopeDescargaCompDeCereales);
 // Separar día, mes y año del string
    const partesFecha = item.fecha.split("/");
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1; // Los meses en JavaScript son 0-indexados
    const año = parseInt(partesFecha[2], 10);


    // Crear un objeto Date con los componentes
    const fechaItem = new Date(año, mes, dia);
    if (fechaItem >= fechaComparar) {

      if (item.tipoComprobante === "70"){
        return true
      }else if (item.tipoComprobante === "71"){
        return true;
      }else{
        return false

      }



    }else{
      return false

    }
  }


}
getPermisoTipoComprobantesPermitidos(item):any{
    let importe = item.importeDebe+item.importeHaber

    if (item.idTipoComprobante == 1){
      if (item.detalle == "Pago Total" && item.concepto == "AGROQUIMICOS" && item.concepto == "CONTABLES" && item.concepto == "DIFERIDOS") {
        // Son Pesifcaciones de dolares, que no llevan comprobantes para Descargar

        return false;

      }else{
        if (item.detalle == "Ticket Combustible" || item.detalle== "TICKET" || item.detalle == "Ticket"  || item.concepto == "CONTABLES" || item.concepto == "DIFERIDOS") {
          return false
        }else{
          return this.esImportePositivo(importe);
        }


      }

    }else if (item.idTipoComprobante == 6){
      return false;
    }else if (item.idTipoComprobante == 11){
      return true;
    }else if (item.idTipoComprobante == 2){
      return this.esImportePositivo(importe);
    }else if (item.idTipoComprobante == 7){
      return this.esImportePositivo(importe);
    }else if (item.idTipoComprobante == 12){
      return false;
    }else if (item.idTipoComprobante == 13){
      return false;
    }else if (item.idTipoComprobante == 3){
       return this.esImporteNegativo(importe);
    }else if (item.idTipoComprobante == 8){
      return this.esImporteNegativo(importe);
    }else if (item.idTipoComprobante == 70){
      return true;
    }else if (item.idTipoComprobante == 71){
      return true
    }else{
      return false;
    }
    importe = 0

}

  /*

  fin permisos

  */






  /*

  Token de acceso

  */
  setToken(data: any): void {
    localStorage.setItem("token", JSON.stringify(data));
 }
  getToken(): any {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }
  getTokenHashId(): string {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }


  setHasEmpresa(data:any):void {

    localStorage.setItem("hasEmpresa", JSON.stringify(data));

  }
  getHashEmpresa(): any {

    const hash = localStorage.getItem('hasEmpresa');
    return hash ? JSON.parse(hash) : null;
  }
  removeHashEmpresa(): void {

    localStorage.removeItem('hasEmpresa');
  }
  logout(): void {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('hashEmpresa');
    localStorage.removeItem('token');
    localStorage.removeItem('permisos');

    localStorage.clear()
    this.usuarioLogueado = null;
    this.empresa = null;

  }


  /*
  Verificacion si el servicio web esta disponible o no
  */

  validarServicioSiEstaDisponible(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.get(this.getURLDummy());

  }


/*
  Verificacion si el servicio de reportes pdf esta disponible o no
  */

  validarServicioReportePdf(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.http.get(this.getURLDummy());

  }


  /**
   * Esta funcion devuelve la URL del recurso Dummy
   */
  private getURLDummy() {
    return Configuraciones.dummyUrl;
  }



  public getCopyRigth(): string {
    return Configuraciones.dummyUrl
  }


}
