import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { ArtistService } from '../services/artist.service';

@Component({
  selector: 'app-album-list',
  template: `

<div class="container mt-4">
    <h2 class="text-center mb-4">Listado de Álbumes</h2>
  
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <input type="text" class="form-control" [(ngModel)]="idABuscar" (ngModelChange)="buscarPorId()" placeholder="Buscar por ID">
      </div>
      <div>
        <button class="btn btn-primary btn-sm" (click)="navegarACrearAlbum()"> Crear Nuevo Álbum</button>
        <button class="btn btn-success btn-sm ms-2" (click)="navegarAArtistas()">Artistas</button>
      </div>
    </div>
  
    <ng-container *ngIf="albums.length > 0; else noAlbums">
      <ul class="list-group mt-3 rounded">
        <li *ngFor="let album of albums" class="list-group-item mb-3 rounded">
          <div class="row">
            <div class="col-md-6">
              <h5>{{ album.nombre }}</h5>
              <p><strong>Artista:</strong> {{ obtenerNombreArtista(album.artista_id) }}</p>
            </div>
            <div class="col-md-6 d-flex align-items-center justify-content-center mt-md-0 mt-3">
              <button class="btn btn-info me-2" (click)="navegarAEditarAlbum(album.id)">
                <i class="bi bi-pencil" ></i> Editar
              </button>
              <button class="btn btn-danger" (click)="eliminarAlbum(album.id)">
                <i class="bi bi-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </li>
      </ul>
    </ng-container>
  
    <ng-template #noAlbums>
      <p>No existen álbumes.</p>
    </ng-template>
  </div>
  
`,
})
export class AlbumListComponent implements OnInit {
  albums: any[] = [];
  idABuscar: string = '';
  artistas: any[] = [];

  constructor(private albumService: AlbumService,
    private router: Router,
    private artistService: ArtistService) {}

  ngOnInit() {
    this.listarAlbumes();

    this.listarArtistas();
  }

  listarAlbumes() {
    this.albumService.obtenerAlbumes().subscribe(
      (response: any[]) => {
        this.albums = response;
      },
      (error: any) => {
        console.error('Error al obtener la lista de álbumes', error);
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

  navegarACrearAlbum() {
    this.router.navigate(['/album-create']);
  }

  navegarAEditarAlbum(id: string) {
    const albumEncontrado = this.albums.find(album => album.id === id);
    if (albumEncontrado) {
      this.router.navigate(['/album-edit', id]);
    } else {
      alert('No se encontró el álbum con el ID proporcionado.');
    }
  }

  eliminarAlbum(id: string) {
    if (confirm('¿Estás seguro de eliminar este álbum?')) {
      this.albumService.eliminarAlbum(id).subscribe(
        () => {
          this.listarAlbumes();
        },
        (error: any) => {
          console.error('Error al eliminar el álbum', error);
        }
      );
    }
  }

  buscarPorId() {
    if (this.idABuscar.trim() !== '') {
      this.albumService.obtenerAlbumPorId(this.idABuscar).subscribe(
        (album: any) => {
          this.albums = [album];
        },
        (error: any) => {
          if (error.status === 404) {
            this.mostrarMensajeNoAlbumConId();
          } else {
            console.error('Error al buscar el álbum por ID', error);
          }
        }
      );
    } else {
      this.limpiarBusqueda();
    }
  }

  limpiarBusqueda() {
    this.listarAlbumes();
  }

  mostrarMensajeNoAlbumConId() {
    this.albums = [];
  }

  obtenerNombreArtista(artistaId: string): string {
    const artista = this.artistas.find(artista => artista.id === artistaId);
    return artista ? `${artista.nombre} ${artista.apellido}` : 'Desconocido';
  }
  
  navegarAArtistas() {
    this.router.navigate(['/artist-list']);
  }
}
