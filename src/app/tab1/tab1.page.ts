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

  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  }
  constructor(private MoviesService: MoviesService) {}


ngOnInit() {
   this.MoviesService.getFeature().subscribe( resp  => {
   console.log(resp);
   this.peliculas = resp.results;
 });
}

}
