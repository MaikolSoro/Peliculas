import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculas: Pelicula[] = [];
  populares: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  }
  constructor(private moviesService: MoviesService) {}


ngOnInit() {
   this.moviesService.getFeature().subscribe( resp  => {
  //  console.log(resp);
   this.peliculas = resp.results;
 });

   this.getPopulares();
   
}
cargarMas() {
this.getPopulares();
}


getPopulares() {
  this.moviesService.getPopulares().subscribe( resp => {
    // console.log('Populares', resp);

    const arrTemp = [...this.populares, ...resp.results];
    this.populares = arrTemp; // para no caerle encima a las anteriores
   });
}

}
