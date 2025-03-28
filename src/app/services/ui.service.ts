import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  fechasFormatos(fecha: any, resta: number = 0, tipo: number= 0){
    // el valor resta es la cantidad de horas que se restan a la hora proque el apache del php que actualiza sobre
    // la base el saldo tiene una hora distinta a la actual por la zona horaria entonces con esto ajusto esa hora a la actual son  - 3 horas
    const date = new Date(fecha);
    let hours = date.getHours().toString().padStart(2, '0');
    if (resta > 0){
          const dateAjust = new Date();
          dateAjust.setHours(date.getHours());
          dateAjust.setHours(date.getHours() - resta);
          hours = dateAjust.getHours().toString().padStart(2, '0');


    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const day = date.getDate().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`
    const formattedTime = `${hours}:${minutes}`
    if (tipo == 0){
      return formattedDate +" : "+formattedTime
    }else if (tipo == 1) {
      return formattedDate +" a las "+formattedTime
    }else{
      return formattedDate +" : "+formattedTime
    }



  }



}
