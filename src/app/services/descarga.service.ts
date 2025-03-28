import { GlobalService } from './global.service';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Configuraciones } from '../../enviroments/configuraciones';
import { Usuario } from '../models/usuario';
import { Cuenta } from '../models/cuenta';
import { ResumenCuenta } from '../models/resumenctacte';
import { Login } from '../models/login.interface';
import { Observable, timeout } from 'rxjs';
import { Template } from '../models/template';
import { formatDate } from '@angular/common';



@Injectable({
  providedIn: 'root',
})
export class DescargaService {
  public templateActivo: Template | any;
  public logueado: boolean = false;
  public static instancia: DescargaService;
  public servicioDisponible = false;
  public static conexion: any;
  public cuenta: Cuenta | any;
  public configuraciones = Configuraciones;
  public timeOut : any;
  constructor(private http: HttpClient, private globalService: GlobalService,) {}










  getURLDescargaComprobante(item: string, tipo) {
    let empresa = this.globalService.getEmpresa();
    let dominio = empresa.dominio;
    let nombreArchivo = ""

    if (tipo == "D"){
     nombreArchivo =  this.getArmoNombreArchivoDolar(item)
    }else{
      nombreArchivo = this.getArmoNombreArchivo(item, tipo)
    }
    let url = "https://"+dominio+"/comprobantes_web/"+empresa.id+"/comprobantes/"+this.getAnoMesComprobante(item, tipo)+"/"+nombreArchivo;

    return url
  }


  private getAnoMesComprobante(item: any, origen: string = "CC") {
    const formatoAnio = 'yyyy';
    const formatoMes = 'MM';
    let anio: number;
    let mes: number;
    let resp: string;
    let fe: string;

    // Convertir la cadena de fecha a un objeto Date
    if (origen == "CER"){
      fe = item.fecha
    }else {
      fe = item.ingreso

    }

   /* const [day, month, year] = fe.split('/');
    const fecha = new Date(`${year}-${month}-${day}`);
    anio = parseInt(formatDate(fecha, formatoAnio, 'en-US'));
    mes = parseInt(formatDate(fecha, formatoMes, 'en-US'));
    */
    const [day, month, year] = fe.split('/');
    const fecha = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    anio = parseInt(formatDate(fecha, formatoAnio, 'en-US'));
    mes = parseInt(formatDate(fecha, formatoMes, 'en-US'));
   // Crear una fecha con el año, mes (ya ajustado) y día correctos


    // Extraer año y mes correctamente formateados
    //const anio = fecha.getFullYear();
    //const mes = fecha.getMonth() + 1; // getMonth devuelve 0 para enero, así que sumar 1
        resp = `${anio}/${mes}`;

    return resp;
  }



  private getArmoNombreArchivo(cbte: any, origen: string = "CC") {

    let nroComprobanteOriginal: string;
    let nroComprobante: string;
    let tipoComp: string;
    let tc: number ;
    let url: string;
    let formatTipoComp: string;
    let cuentaSinCoope: string;
    let empresa = this.globalService.getEmpresa()
    let cuenta = this.globalService.getUsuarioLogueado().cuenta.id;

    // Veo de que origen viene el link a armar poque en la ficha de cereales el cbte tiene nombre distinto para evaluar el tipo de comprobante
    if (origen == "CC"){
      // viene de cuenta corriente o cuenta corriente dolar
      tc = cbte.idTipoComprobante
    }else if (origen == "CER"){
      // viene de cereales
      tc = cbte.tipoComprobante
    }else {
      // para cualquier otro
      tc = cbte.idTipoComprobante
    }
    // Certificados y Liquidaciones

    if (tc == 70) {
      if (origen == "CER"){
        nroComprobanteOriginal =cbte.numeroComprobante
      }else{
        nroComprobanteOriginal = empresa.id === '12' ? cbte.numeroInterno : cbte.numero;
      }

      if (nroComprobanteOriginal === '.') {
        nroComprobante = nroComprobanteOriginal;
      } else {

        nroComprobante = nroComprobanteOriginal
        //url = `${this.getTipoComprobanteCodigo(tc)}${nroComprobante}.pdf`;
      }
      if (empresa.formatoDescargaComprobantes === 1) {

        formatTipoComp = '000';
        tipoComp = formatTipoComp;
        const tempNroCuenta = cuenta;
        cuentaSinCoope = tempNroCuenta.substring(2);
        if (cbte.idTipoComprobante < 10) {
          tipoComp = '00' + cbte.idTipoComprobante.toString();
        } else if (cbte.idTipoComprobante > 10 && cbte.idTipoComprobante < 99) {
          tipoComp = '0' + cbte.idTipoComprobante.toString();
        } else if (cbte.idTipoComprobante > 99) {
          tipoComp = cbte.idTipoComprobante.toString();
        }
        const [dia, mes, anio] = cbte.ingreso.split('/');
        nroComprobante = this.completarNumero(nroComprobanteOriginal, 12);
        url = `${anio+mes+dia}-${tipoComp}-${nroComprobante}-${cuentaSinCoope}.PDF`;

      } else {

        if (empresa.id == "11"){
          nroComprobante = this.completarNumeroSinCero(nroComprobanteOriginal, 12);

          const parte1 = nroComprobante.slice(0, 4);
          const parte2 = nroComprobante.slice(4);
          const nroCompFinal = parte1+parte2
          url = `${this.getTipoComprobanteCodigo(tc)}${nroCompFinal}.pdf`;
        }else{

          nroComprobante = this.completarNumero(nroComprobanteOriginal, 12);

          const parte1 = nroComprobante.slice(0, 4);
          const parte2 = nroComprobante.slice(4);
          const nroCompFinal = parte1+"-"+parte2
          url = `${this.getTipoComprobanteCodigo(tc)}${nroCompFinal}.pdf`;
        }




      }



    } else if (tc == 71) {

      if (origen == "CER"){
        nroComprobanteOriginal =cbte.numeroComprobante
      }else{
        nroComprobanteOriginal = empresa.id === '12' ? cbte.numeroInterno : cbte.numero;

      }

      if (nroComprobanteOriginal === '.') {
        nroComprobante = nroComprobanteOriginal;
      } else {

          nroComprobante = nroComprobanteOriginal
      }
      if (empresa.formatoDescargaComprobantes === 1) {

          formatTipoComp = '000';
          tipoComp = formatTipoComp;
          const tempNroCuenta = cuenta;
          cuentaSinCoope = tempNroCuenta.substring(2);
          if (cbte.idTipoComprobante < 10) {
            tipoComp = '00' + cbte.idTipoComprobante.toString();
          } else if (cbte.idTipoComprobante > 10 && cbte.idTipoComprobante < 99) {
            tipoComp = '0' + cbte.idTipoComprobante.toString();
          } else if (cbte.idTipoComprobante > 99) {
            tipoComp = cbte.idTipoComprobante.toString();
          }
          const [dia, mes, anio] = cbte.ingreso.split('/');
          nroComprobante = this.completarNumero(nroComprobanteOriginal, 12);
          url = `${anio+mes+dia}-${tipoComp}-${nroComprobante}-${cuentaSinCoope}.PDF`;

        } else {
          if (empresa.id == "11"){

            nroComprobante = this.completarNumeroSinCero(nroComprobanteOriginal, 12);
            const parte1 = nroComprobante.slice(0, 4);
            const parte2 = nroComprobante.slice(4);
            const nroCompFinal = parte1+parte2
            url = `${this.getTipoComprobanteCodigo(tc)}${nroCompFinal}.pdf`;
          }else{

            nroComprobante = this.completarNumeroSinCero(nroComprobanteOriginal, 12);
            const parte1 = nroComprobante.slice(0, 4);
            const parte2 = nroComprobante.slice(4);
            const nroCompFinal = parte1+parte2
            url = `${this.getTipoComprobanteCodigo(tc)}${nroCompFinal}.pdf`;
          }

        }







      } else if (tc == 70) {



        if (origen == "CER"){
          nroComprobanteOriginal =cbte.numeroComprobante
        }else{
          nroComprobanteOriginal = empresa.id === '12' ? cbte.numeroInterno : cbte.numero;

        }

        if (nroComprobanteOriginal === '.') {
          nroComprobante = nroComprobanteOriginal;
        } else {

            nroComprobante = nroComprobanteOriginal
        }
        if (empresa.formatoDescargaComprobantes === 1) {

            formatTipoComp = '000';
            tipoComp = formatTipoComp;
            const tempNroCuenta = cuenta;
            cuentaSinCoope = tempNroCuenta.substring(2);
            if (cbte.idTipoComprobante < 10) {
              tipoComp = '00' + cbte.idTipoComprobante.toString();
            } else if (cbte.idTipoComprobante > 10 && cbte.idTipoComprobante < 99) {
              tipoComp = '0' + cbte.idTipoComprobante.toString();
            } else if (cbte.idTipoComprobante > 99) {
              tipoComp = cbte.idTipoComprobante.toString();
            }
            const [dia, mes, anio] = cbte.ingreso.split('/');
            nroComprobante = this.completarNumero(nroComprobanteOriginal, 12);
            url = `${anio+mes+dia}-${tipoComp}-${nroComprobante}-${cuentaSinCoope}.PDF`;

          } else {

            if (empresa.id == "11"){
              nroComprobante = this.completarNumero(nroComprobanteOriginal, 12);

              const parte1 = nroComprobante.slice(0, 4);
              const parte2 = nroComprobante.slice(4);
              const nroCompFinal = parte1+"-"+parte2
              url = `${this.getTipoComprobanteCodigo(tc)}${nroCompFinal}.pdf`;
            }else{

              nroComprobante = this.completarNumeroSinCero(nroComprobanteOriginal, 12);

              const parte1 = nroComprobante.slice(0, 4);
              const parte2 = nroComprobante.slice(4);
              const nroCompFinal = parte1+parte2
              url = `${this.getTipoComprobanteCodigo(tc)}${nroCompFinal}.pdf`;
            }

          }





      } else {
      // para todos los demas tipocomp

      nroComprobanteOriginal = cbte.numeroInterno;
      //nroComprobanteOriginal = cbte.numeroInterno.trim();

      if (empresa.formatoDescargaComprobantes === 1) {

        formatTipoComp = '000';
        tipoComp = formatTipoComp;
        const tempNroCuenta = cuenta;
        cuentaSinCoope = tempNroCuenta.substring(2);
        if (cbte.idTipoComprobante < 10) {
          tipoComp = '00' + cbte.idTipoComprobante.toString();
        } else if (cbte.idTipoComprobante > 10 && cbte.idTipoComprobante < 99) {
          tipoComp = '0' + cbte.idTipoComprobante.toString();
        } else if (cbte.idTipoComprobante > 99) {
          tipoComp = cbte.idTipoComprobante.toString();
        }
        const [dia, mes, anio] = cbte.ingreso.split('/');
        nroComprobante = this.completarNumero(nroComprobanteOriginal, 12);
        url = `${anio+mes+dia}-${tipoComp}-${nroComprobante}-${cuentaSinCoope}.PDF`;

      } else {
        nroComprobante = this.completarNumero(nroComprobanteOriginal, 12);
        const parte1 = nroComprobante.slice(0, 4);
        const parte2 = nroComprobante.slice(4);
        const nroCompFinal = parte1+"-"+parte2
        url = `${this.getTipoComprobanteCodigo(cbte.idTipoComprobante)}${nroCompFinal}.pdf`;

      }


    }
    return url;
  }





  private getArmoNombreArchivoDolar(cbte: any) {

    let nroComprobanteOriginal: string;
    let nroComprobante: string;
    let tipoComp: string;
    let url: string;
    let formatTipoComp: string;
    let cuentaSinCoope: string;
    let empresa = this.globalService.getEmpresa()
    let cuenta = this.globalService.getUsuarioLogueado().cuenta.id;
   // para todos los demas tipocomp

   nroComprobanteOriginal = cbte.numeroInterno;


   if (empresa.formatoDescargaComprobantes === 1) {
     formatTipoComp = '000';
     tipoComp = formatTipoComp;
     const tempNroCuenta = cuenta;
     cuentaSinCoope = tempNroCuenta.substring(2);
     if (cbte.idTipoComprobante < 10) {
       tipoComp = '00' + cbte.idTipoComprobante.toString();
     } else if (cbte.idTipoComprobante > 10 && cbte.idTipoComprobante < 99) {
       tipoComp = '0' + cbte.idTipoComprobante.toString();
     } else if (cbte.idTipoComprobante > 99) {
       tipoComp = cbte.idTipoComprobante.toString();
     }
     const [dia, mes, anio] = cbte.ingreso.split('/');
     nroComprobante = this.completarNumero(nroComprobanteOriginal, 12);
     url = `${anio+mes+dia}-${tipoComp}-${nroComprobante}-${cuentaSinCoope}.PDF`;
     debugger
   } else {
     nroComprobante = this.completarNumero(nroComprobanteOriginal, 12);
     const parte1 = nroComprobante.slice(0, 4);
     const parte2 = nroComprobante.slice(4);
     const nroCompFinal = parte1+"-"+parte2
     url = `${this.getTipoComprobanteCodigodolar(cbte)}${nroCompFinal}.pdf`;
     debugger
   }



    // Para todos los demas comprobantes

    return url;







  }




   private completarNumero(num: string, cant: number): string {
      let numStr = String(num);
      const len = numStr.length;
      if (len < cant) {
        for (let i = 0; i < cant - len; i++) {
          numStr = '0' + numStr;
        }
      }
      return numStr;
    }

   private completarNumeroSinCero(num: string, cant: number): string {
      let numStr = String(num);
      const len = numStr.length;
      if (len < cant) {
        for (let i = 0; i < cant - len; i++) {
          numStr = numStr;
        }
      }
      return numStr;
    }


    private getTipoComprobanteCodigodolar(item){

      if (item.detalle == "FACTURA") {
        return "FA";
    } else if (item.detalle == "NOTA CREDITO") {
        return "NC";
    } else if (item.detalle == "NOTA DEBITO") {
        return "ND";
    } else {
        return "FA";
    }
    }


  getTipoComprobanteCodigo(compTipo: any): string {
        // Devuelve codigo de tipo de comprobantes 70 Y 71 C O L X = NULL

        if (compTipo === 0) {
          return "";
        } else {
          /*
           Devuelvo la abreviatura del tipo de comprobante por ahora fijo en un switch luego
           implementar la abreviatura con compTipo.getAbreviatura desde la base.. esto va fijo ahora por
           la diversidad de comprobantes que hay coordinar con el armado de pdf para que arme los pdf con la
           abreviatura correspondiente por tipo de comprobante ejemplo factura A: FAC, factura B = FACB ... ahora en
           ambos casos esta como FAC tanto para A Y PARA B.
           Codigo: String abrv = compTipo.getAbreviatura();
           */
          debugger
          if(compTipo == 1 || compTipo == 6 || compTipo == 11){
            return "FA";
          }else if(compTipo == 2 || compTipo == 7 || compTipo == 12 || compTipo == 13){
            return "ND";
          }else if(compTipo == 3 || compTipo == 8){
            return "NC";
          }else if(compTipo == 70){
            return "C";
          }else if(compTipo == 71){
            return "L";
          }else{
            return ""
          }

        }

  }


}
