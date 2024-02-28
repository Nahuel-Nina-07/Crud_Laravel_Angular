import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
})
export class AlbumCreateComponent implements OnInit {
  nuevoAlbum: any = {
    nombre: '',
    artista_id: '',
  };
  artistas: any[] = []; 

  constructor(private artistService: ArtistService, private albumService: AlbumService, private router: Router) {}

  ngOnInit() {

    this.listarArtistas();
  }

  listarArtistas() {
    this.artistService.obtenerArtistas().subscribe(
      (response: any[]) => {
        this.artistas = response;
      },
      (error: any) => {
        console.error('Error al obtener la lista de artistas', error);
      }
    );
  }

  guardarNuevoAlbum() {

    console.log(this.nuevoAlbum);

    this.albumService.crearAlbum(this.nuevoAlbum).subscribe(
      (response) => {
        console.log('Álbum creado exitosamente', response);
        this.router.navigate(['/album-list']);
      },
      (error) => {
        console.error('Error al crear el álbum', error);
      }
    );
  }
}
