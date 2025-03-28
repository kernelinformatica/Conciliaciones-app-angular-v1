/**
 * Clase de Textos para la aplicación.
 */

import { Configuraciones } from "./configuraciones"

export class TextosApp{
 // Etiquetas de los mensajes, ventanas botones etc
  //Login //////////////////
  public static resultadoLoginInvalido = "ERROR: El usuario o la clave suministrados no son válidos."
  public static resultadoLoginSatifactorio = "Bienvenido ..."
  // Generales ///////////////////////////////////
  public static modaldialogTituloSalir = "¿Esta seguro que desea abandonar la sesion ?"
  public static modaldialogMensajeSalir = "Si confirma se cerrara la sesion actual"
  public static mensajeSobreDisponiblidadPDFCtacte= "Importante: La disponibilidad de los comprobantes en formato PDF para descargar, está sujeta a la ejecución de las actualizaciones programados. (S.E.U.O). Cualquier inconveniente con la descarga de algún comprobante puntual, consulte con la administración de la Cooperativa."
  // Recupero de clave /////////////////////
  public static mensajeCambiarClave = "Acción requerida, por cuestiones de seguridad le aconsejamos cambiar su clave en este momento."
  public static mensajeCambiarClaveInicial = "Acción requerida: La clave proporcionada es temporal o se a reseteado, usted debe cambiarla para garantizar la seguridad de sus datos."
  public static mensajeCambiarClaveReseteo = "Ingrese la clave que desee."
  public static mensajeEnvioMAilRecupero = "Ingrese el mail de su cuenta registrada en el sistema."

  // Cuenta Corriente
  public static mensajeFechaActualizacion = "La fecha de última actualización difiere de la fecha de hoy. Las operaciones ingresadas con posterioridad no figuran en este informe (S.E.U.O)."


  // Ficha de Cereales
  public static mensajeFechaCereales = "Los PDF de Liquidaciones y Certificados anteriores al "+Configuraciones.fechaTopeDescargaCompDeCereales+", no se ecuentran publicados, si usted desea obtenerlos comuníquese con la Cooperativa (S.E.U.O)."
 
  



}
