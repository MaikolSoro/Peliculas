import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  constructor(private http: HttpClient) { }

 // ejecutar las consultas de la api 
  private ejecutarQuery<T>( query: string) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;
    // console.log(query);

    return this.http.get<T>(query);

  }
 


  // Este metodo lo que hace es que traemos las peliculas más populares desde de la api
  getPopulares() {

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

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


  // Metodo que muestra el detalle de la pelicula
  getPeliculaDetalle(id: string) {

    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);

  }
  getActoresPelicula(id: string) {

    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);

  }
}
