import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';


@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.css']
})

export class ArtistCreateComponent {
  nuevoArtista: any = {
    nombre: '',
    apellido: '',
    genero: '',
    fecha_nacimiento: '',
    nacionalidad: ''
  };

  constructor(private artistService: ArtistService, private router: Router) {}

  guardarNuevoArtista() {
    this.artistService.crearArtista(this.nuevoArtista).subscribe(
      (response: any) => {
        console.log('Artista creado:', response);
        this.router.navigate(['/artist-list']);
      },
      (error: any) => {
        console.error('Error al crear el artista', error);
      }
    );
  }
}
