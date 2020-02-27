import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Sonik', 'El señor de los anillos', 'Superman'];
  buscando = false;

  // constructor inyecto el servicio 
  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) {}


  // metodo que muestro los resultados de la busqueda de las peliculas
  buscar(event) {
  const valor = event.detail.value;

  if (valor.length === 0) {
    this.buscando = false;
    this.peliculas = [];
    return;
  }
  this.buscando = true;
  this.moviesService.buscarPeliculas(valor).subscribe( resp => {
    console.log(resp);
    this.peliculas = resp['results'];
    this.buscando = false;
  });
  }

  // muestro el detalle de la pelicula
  async mostrarPelicula(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
      });
   modal.present();
  }
}
