/**
 * Clase de configuraciones para la aplicación.
 */

import { TextosApp } from "./textos-app";

export class Configuraciones{
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    public static appNombre = "Conciliaciones"
    public static appVersion = "1.0.0";
    public static appDescripcion = "Aplicación para la conciliación de datos entre sistemas de gestión.";
    public static appAutor = "Kernel Informática";
    public static appCopyright = "Kernel Informática, Cooperativa de Trabajo Ltda.";
    // desarrollo ///
    //public static dominioBaseApp = "http://localhost:5050"
    // Produccion ///
    public static dominioBaseApp = "https://conciliaciones.kernelinformatica.com.ar/concilia-rest"
    public static urlBase : string = `${Configuraciones.dominioBaseApp}/api`;

    // Web service que calcula las conciliaciones
    //Desarrollo
    //public static dominioBaseConcilia = "http://localhost:6050"
    // Produccion
    public static dominioBaseConcilia = "https://conciliaciones.kernelinformatica.com.ar/concilia-calc-rest"
    //public static dominioBaseConcilia = "http://localhost:6050"
    public static urlBaseConcilia : string = `${Configuraciones.dominioBaseConcilia}/api`;

    /////

    // Dev: ojo que mi payara local apunta a produccion //
    //public static dominioBaseApp = "http://localhost:8080";
    //public static urlBase : string = `${Configuraciones.dominioBaseApp}/gestagroex-rest/ws`;
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    public static dominioBaseDescargaPdf = `${Configuraciones.dominioBaseApp}/archivos/pdf`
    public static dominioBaseReportes = `${Configuraciones.dominioBaseApp}/reportes`
    public static reporteCtactePdf: string = `${Configuraciones.dominioBaseReportes}/generarReportePdf`;
    public static dummyUrl : string = `${Configuraciones.urlBase}/auth/dummy`;
    public static authUrl : string = `${Configuraciones.urlBase}/auth/login`;
    public static miCuentaUrl : string = `${Configuraciones.urlBase}/usuarios/`;
    public static detalleCerUrl : string = `${Configuraciones.urlBase}/detallecer/`;
    public static detalleCtaCteUrl : string = `${Configuraciones.urlBase}/detallecc/`;
    public static resumenUrl : string = `${Configuraciones.urlBase}/resumen/`;
    public static notificacionesUrl: string = `${Configuraciones.urlBase}/notificaciones/`;
    public static bancosUrl = `${Configuraciones.urlBase}/bancos/`;
    public static cerealesUrl : string = `${Configuraciones.urlBase}/cereales/`;
    public static cbuPadronUrl: string = `${Configuraciones.urlBase}/cbu-padron/`;
    public static monedasUrl: string = `${Configuraciones.urlBase}/monedas/`;
    public static transaccionesUrl: string = `${Configuraciones.urlBase}/transacciones/`;
    public static sucursalesUrl: string = `${Configuraciones.urlBase}/sucursales/`;
    public static solicitudFondosUrl: string = `${Configuraciones.urlBase}/fondos/`;
    public static chequerasUrl: string = `${Configuraciones.urlBase}/chequeras/`;
    public static reservaUrl : string = `${Configuraciones.urlBase}/reservas/`;
    public static reservaAdminUrl : string = `${Configuraciones.urlBase}/reservas-admin/`;
    public static mercadosUrl: string = `${Configuraciones.urlBase}/mercados/`;
    public static cerealesResumenUrl : string = `${Configuraciones.urlBase}/cereal-resumen/`;
    public static ordenesVentaUrl: string = `${Configuraciones.urlBase}/ordenes/`;

    public static conciliacionesUrl: string = `${Configuraciones.urlBaseConcilia}/conciliar_datos`;

  public static rutaLogos : string = "assets/images/";
  public static linkPaginaKernel = "https://www.kernelinformatica.com.ar";
  public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/ws.php`;
  public static version : string = "1.0";
  public static pathImagenesNoticias = "/i/news/";
  public static intervaloDeAutoActualizacion =  20000 // 20 segundos;
  public static intervaloDeAutoActualizacionNotificaciones =  300000 // 5 minutos;
  public static fechaTopeDescargaCompDeCereales = "2024-12-31"


    // 10 segundos: 10000
    // 30 segundos: 30000
    // 5 minutos: 300000
    // 15 minutos : 9000000

  public static  year = new Date().getFullYear();
  public static kernelCopyRigth = " &copy; "+this.year+" <a href="+this.linkPaginaKernel+" target='_blank'>Kernel Informática</a>, Cooperativa de Trabajo Ltda. Todos los derechos reservados."
  public static kernelCopyRigthCorta = "2025 Kernel Informática"

}
