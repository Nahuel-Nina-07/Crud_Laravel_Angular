import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
})
export class AlbumEditComponent implements OnInit {
  albumId: string = '';
  album: any = {};
  albumActual: any = {
    nombre: '',
    artista_id: '',
  };
  artistas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private router: Router
  ) {}

  ngOnInit() {
    this.albumId = this.route.snapshot.params['id'];

    this.obtenerAlbumActual();
    this.listarArtistas();
  }

  obtenerAlbumActual() {
    this.albumService.obtenerAlbumPorId(this.albumId).subscribe(
      (album: any) => {
        this.album = album;
      },
      (error: any) => {
        console.error('Error al obtener datos del artista', error);
      }
    );
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

  guardarCambios() {
    console.log(this.albumActual);

    this.albumService.actualizarAlbum(this.albumId, this.albumActual).subscribe(
      (response) => {
        console.log('Álbum actualizado exitosamente', response);
        this.router.navigate(['/album-list']);
      },
      (error) => {
        console.error('Error al actualizar el álbum', error);
      }
    );
  }
}
