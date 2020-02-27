import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

 // ejecutar las consultas de la api 
  private ejecutarQuery<T>( query: string) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;
    return this.http.get<T>(query);

  }
  constructor(private http: HttpClient) { }


  // Este metodo lo que hace es que traemos las peliculas más populares desde de la api
  getPopulares() {
    const query = '/discover/movie?sort_by=popularity.desc';
    return this.ejecutarQuery<RespuestaMDB>(query);
  }
  
  getFeature() {
    const  hoy  = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    if( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }
    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin =    `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    // tslint:disable-next-line: max-line-length
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }
}
